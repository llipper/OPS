import re
import os

sql_file_path = r"c:\projetos\ops\Json QUestoes\constitucional.sql"

def balance_sql_file():
    print("Reading SQL file...")
    with open(sql_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # We will split the file by the question code comments.
    # Pattern to match the separator:
    # -- -----------------------------------------------------------------------------
    # -- QUESTÃO CODE: Q100001 (ID: e632d4b9-183e-46cb-b1b7-a36c1cfdf90)
    # -- -----------------------------------------------------------------------------
    
    question_blocks = re.split(r"(-- -----------------------------------------------------------------------------[\r\n]+-- QUESTÃO CODE: Q\d+.*?[\r\n]+-- -----------------------------------------------------------------------------)", content)
    
    header = question_blocks[0]
    blocks = question_blocks[1:]
    
    # blocks list will have alternating [header_comment, question_body]
    print(f"Found {len(blocks) // 2} questions.")
    
    new_blocks = []
    
    letters = ['A', 'B', 'C', 'D']
    
    for i in range(len(blocks) // 2):
        q_header = blocks[2 * i]
        q_body = blocks[2 * i + 1]
        
        q_code_match = re.search(r"QUESTÃO CODE: (Q\d+)", q_header)
        q_code = q_code_match.group(1) if q_code_match else f"Q{i+1}"
        
        # New target correct letter (perfect round-robin distribution: A, B, C, D, A, B, C, D...)
        new_correct_letter = letters[i % 4]
        
        # Parse the alternatives block
        # We look for the VALUES section inside the alternativas insert:
        # VALUES 
        #   ('a1bcde01-...', '...', 'A', '...', false, '...', '...', '...', 0),
        #   ...
        
        alternativas_pattern = r"(INSERT INTO alternativas .*?VALUES\s*\r?\n)(.*?)(?=;|\r?\n\r?\n|$)"
        alt_match = re.search(alternativas_pattern, q_body, re.DOTALL)
        
        if not alt_match:
            print(f"Warning: could not find alternatives for {q_code}")
            new_blocks.extend([q_header, q_body])
            continue
            
        alt_prefix = alt_match.group(1)
        alt_values_str = alt_match.group(2)
        
        # Parse individual alternatives. Each alternative is a line starting with space and '(' and ending with '),' or ');'
        alt_lines = re.findall(r"\s*\((.*?)\)[,;]?", alt_values_str)
        if len(alt_lines) != 4:
            print(f"Warning: found {len(alt_lines)} alternatives for {q_code} instead of 4.")
            new_blocks.extend([q_header, q_body])
            continue
            
        # Parse fields for each alternative
        # Fields: id, questaoId, letra, texto, isCorreta, explicacao, dica, referencia, ordem
        # We need a robust parser for CSV/SQL values on a line. Let's write a simple state machine or regex.
        parsed_alts = []
        for line in alt_lines:
            # Match fields inside single quotes or boolean/number
            # A simple regex for SQL values:
            fields = []
            # We can find all matches of either '...' (with potential escaped quotes '') or true/false/numbers
            # Let's use a regex to extract SQL string literals and raw terms:
            raw_fields = re.findall(r"'(?:''|[^'])*'|[^,\s]+", line)
            
            # Reconstruct if some fields were split incorrectly due to nested commas outside quotes (should not happen with the regex above)
            parsed_alts.append(raw_fields)
            
        # Verify we parsed exactly 9 fields per alternative
        valid = True
        for alt in parsed_alts:
            if len(alt) != 9:
                print(f"Warning: expected 9 fields in alternative for {q_code}, got {len(alt)}: {alt}")
                valid = False
                break
        if not valid:
            new_blocks.extend([q_header, q_body])
            continue
            
        # Find the old correct alternative index
        old_correct_idx = -1
        for idx, alt in enumerate(parsed_alts):
            is_correta = alt[4].strip().lower()
            if is_correta == "true":
                old_correct_idx = idx
                break
                
        if old_correct_idx == -1:
            print(f"Warning: no correct alternative found for {q_code}!")
            new_blocks.extend([q_header, q_body])
            continue
            
        # Target index is i % 4
        new_correct_idx = i % 4
        
        # Swap the properties if they are different
        if old_correct_idx != new_correct_idx:
            # We swap: id, texto, isCorreta, explicacao, dica, referencia
            # indices: 0 (id), 3 (texto), 4 (isCorreta), 5 (explicacao), 6 (dica), 7 (referencia)
            # Let's do the swap:
            fields_to_swap = [0, 3, 4, 5, 6, 7]
            for f_idx in fields_to_swap:
                temp = parsed_alts[old_correct_idx][f_idx]
                parsed_alts[old_correct_idx][f_idx] = parsed_alts[new_correct_idx][f_idx]
                parsed_alts[new_correct_idx][f_idx] = temp
                
        # Re-build the alternatives VALUES string
        new_alt_lines = []
        for idx, alt in enumerate(parsed_alts):
            suffix = ";" if idx == 3 else ","
            new_alt_lines.append(f"  ({', '.join(alt)}){suffix}")
            
        new_alt_values_str = "\n".join(new_alt_lines)
        
        # Update the resolucao field in the question
        # We need to replace references to the letter in the resolucao field.
        # The resolucao field is a single-quoted string inside VALUES(...) of the question.
        # Let's search for the Gabarito string and replace it.
        # E.g. "Gabarito: Letra C." -> "Gabarito: Letra A." or "O gabarito é a Letra C." -> "O gabarito é a Letra A."
        
        def replacer(match):
            prefix = match.group(1)
            letter = match.group(2)
            suffix = match.group(3)
            return f"{prefix}{new_correct_letter}{suffix}"
            
        # Match "Gabarito: Letra [A-D]" or "gabarito é a Letra [A-D]" or "Gabarito é a Letra [A-D]"
        # case-insensitive
        updated_q_body = re.sub(
            r"([Gg]abarito\s*(?:é\s+a\s+Letra|:\s*Letra)\s*)([A-D])(\b)",
            replacer,
            q_body
        )
        
        # Replace the alternatives block in the body
        updated_q_body = updated_q_body.replace(alt_values_str, new_alt_values_str)
        
        new_blocks.extend([q_header, updated_q_body])
        
    # Reassemble the file
    new_content = header + "".join(new_blocks)
    
    print("Writing updated SQL file...")
    with open(sql_file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print("Balancing completed successfully!")

if __name__ == "__main__":
    balance_sql_file()
