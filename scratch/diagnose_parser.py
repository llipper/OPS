import re

sql_file_path = r"c:\projetos\ops\Json QUestoes\constitucional.sql"

with open(sql_file_path, "r", encoding="utf-8") as f:
    content = f.read()

question_blocks = re.split(r"(-- -----------------------------------------------------------------------------[\r\n]+-- QUESTÃO CODE: Q\d+.*?[\r\n]+-- -----------------------------------------------------------------------------)", content)
header = question_blocks[0]
blocks = question_blocks[1:]

for i in range(len(blocks) // 2):
    q_header = blocks[2 * i]
    q_body = blocks[2 * i + 1]
    
    q_code_match = re.search(r"QUESTÃO CODE: (Q\d+)", q_header)
    q_code = q_code_match.group(1) if q_code_match else f"Q{i+1}"
    
    if q_code in ["Q100020", "Q100023", "Q100024"]:
        print(f"--- DIAGNOSIS FOR {q_code} ---")
        print("Header:")
        print(q_header)
        print("Body preview (first 200 chars):")
        print(q_body[:200])
        print("Body ending (last 200 chars):")
        print(q_body[-200:])
        
        # Test alternatives pattern search
        alternativas_pattern = r"(INSERT INTO alternativas .*?VALUES\s*\r?\n)(.*?)(?=;|\r?\n\r?\n|$)"
        alt_match = re.search(alternativas_pattern, q_body, re.DOTALL)
        if alt_match:
            print("Match found!")
            print("Group 1:")
            print(repr(alt_match.group(1)))
            print("Group 2:")
            print(repr(alt_match.group(2)[:200]))
        else:
            print("NO MATCH FOUND!")
