import re
import os

sql_file_path = r"c:\projetos\ops\Json QUestoes\constitucional.sql"

def parse_sql_row(row_str):
    # Strip leading/trailing spaces, parenthesis, commas, semicolons
    row_str = row_str.strip()
    if row_str.startswith('('):
        row_str = row_str[1:]
    if row_str.endswith(';'):
        row_str = row_str[:-1]
    if row_str.endswith(';'): # handle double semicolon
        row_str = row_str[:-1]
    if row_str.endswith(','):
        row_str = row_str[:-1]
    if row_str.endswith(')'):
        row_str = row_str[:-1]
        
    fields = []
    i = 0
    n = len(row_str)
    while i < n:
        # Skip spaces and commas
        while i < n and (row_str[i].isspace() or row_str[i] == ','):
            i += 1
        if i >= n:
            break
            
        if row_str[i] == "'":
            # Read string literal
            start = i
            i += 1
            while i < n:
                if row_str[i] == "'":
                    # Check if it's an escaped quote ''
                    if i + 1 < n and row_str[i+1] == "'":
                        i += 2
                    else:
                        # End of string literal
                        i += 1
                        break
                else:
                    i += 1
            fields.append(row_str[start:i])
        else:
            # Read unquoted literal (boolean or number or subquery)
            start = i
            paren_depth = 0
            while i < n:
                char = row_str[i]
                if char == '(':
                    paren_depth += 1
                elif char == ')':
                    paren_depth -= 1
                elif char == ',' and paren_depth == 0:
                    break
                i += 1
            fields.append(row_str[start:i].strip())
            
    return fields

def balance_sql_file():
    print("Reading SQL file...")
    with open(sql_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split the file by the question code comments.
    # We split by the exact comment block sequence
    blocks = re.split(r"(-- -----------------------------------------------------------------------------[\r\n]+-- QUESTÃO CODE: Q\d+.*?[\r\n]+-- -----------------------------------------------------------------------------)", content)
    
    header = blocks[0]
    question_blocks = blocks[1:]
    
    total_questions = len(question_blocks) // 2
    print(f"Total questions found: {total_questions}")
    
    letters = ['A', 'B', 'C', 'D']
    
    new_blocks = []
    
    for i in range(total_questions):
        q_header = question_blocks[2 * i]
        q_body = question_blocks[2 * i + 1]
        
        q_code_match = re.search(r"QUESTÃO CODE: (Q\d+)", q_header)
        q_code = q_code_match.group(1) if q_code_match else f"Q{i+1}"
        
        # New target correct letter
        new_correct_letter = letters[i % 4]
        
        # Locate the INSERT INTO alternativas statement
        alt_insert_match = re.search(r"INSERT INTO alternativas\s*\(.*?\)\s*VALUES\s*(.*?)(?=\n\n|\n--|\Z)", q_body, re.DOTALL | re.IGNORECASE)
        if not alt_insert_match:
            print(f"Error: Could not locate alternativas INSERT for {q_code}")
            new_blocks.extend([q_header, q_body])
            continue
            
        alt_values_str = alt_insert_match.group(1)
        
        # Extract lines from values block
        raw_lines = alt_values_str.split("\n")
        alt_lines = []
        for line in raw_lines:
            stripped = line.strip()
            if stripped.startswith("(") and (stripped.endswith("),") or stripped.endswith(");") or stripped.endswith(");;") or stripped.endswith(")")):
                alt_lines.append(line)
                
        if len(alt_lines) != 4:
            # Let's fallback to searching lines starting with '('
            alt_lines = [line for line in raw_lines if line.strip().startswith("(")]
            
        if len(alt_lines) != 4:
            print(f"Error: Found {len(alt_lines)} alternatives lines for {q_code} instead of 4.")
            print("Raw block:")
            print(alt_values_str)
            new_blocks.extend([q_header, q_body])
            continue
            
        # Parse each line using the SQL row parser
        parsed_alts = []
        for line in alt_lines:
            parsed = parse_sql_row(line)
            parsed_alts.append(parsed)
            
        valid = True
        for idx, alt in enumerate(parsed_alts):
            if len(alt) != 9:
                print(f"Error: Expected 9 fields for {q_code} alternative {idx}, got {len(alt)}: {alt}")
                valid = False
                break
        if not valid:
            new_blocks.extend([q_header, q_body])
            continue
            
        # Find current correct alternative
        old_correct_idx = -1
        for idx, alt in enumerate(parsed_alts):
            is_correta = alt[4].strip().lower()
            if is_correta == "true":
                old_correct_idx = idx
                break
                
        if old_correct_idx == -1:
            print(f"Error: No correct alternative found for {q_code}")
            new_blocks.extend([q_header, q_body])
            continue
            
        new_correct_idx = i % 4
        
        # Swap the properties if different
        if old_correct_idx != new_correct_idx:
            # Swap id (0), texto (3), isCorreta (4), explicacao (5), dica (6), referencia (7)
            fields_to_swap = [0, 3, 4, 5, 6, 7]
            for f_idx in fields_to_swap:
                parsed_alts[old_correct_idx][f_idx], parsed_alts[new_correct_idx][f_idx] = \
                    parsed_alts[new_correct_idx][f_idx], parsed_alts[old_correct_idx][f_idx]
                    
        # Rebuild the alternatives block
        new_alt_lines = []
        for idx, alt in enumerate(parsed_alts):
            suffix = ");" if idx == 3 else "),"
            # Rebuild original line spacing
            # Maintain leading spacing
            leading_space = "  "
            new_alt_lines.append(f"{leading_space}({', '.join(alt)}){suffix}")
            
        new_alt_values_str = "\n" + "\n".join(new_alt_lines)
        
        # Replace old alternatives values block in q_body
        updated_q_body = q_body.replace(alt_values_str, new_alt_values_str)
        
        # Update resolution letter
        def replacer(match):
            prefix = match.group(1)
            letter = match.group(2)
            suffix = match.group(3)
            return f"{prefix}{new_correct_letter}{suffix}"
            
        # Case-insensitive replacement for "Gabarito: Letra X" or "gabarito é a Letra X"
        updated_q_body = re.sub(
            r"([Gg]abarito\s*(?:é\s+a\s+Letra|:\s*Letra)\s*)([A-D])(\b)",
            replacer,
            updated_q_body
        )
        
        new_blocks.extend([q_header, updated_q_body])
        
    # Reassemble the file
    new_content = header + "".join(new_blocks)
    
    print("Writing balanced file back...")
    with open(sql_file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print("All balanced and rewritten successfully!")

if __name__ == "__main__":
    balance_sql_file()
