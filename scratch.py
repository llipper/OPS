import uuid

def u(): return str(uuid.uuid4())

disc = u()
assuntos = [
    (u(), 'Introdução ao Direito Administrativo'), 
    (u(), 'Administração Pública'), 
    (u(), 'Princípios Administrativos'), 
    (u(), 'Poderes Administrativos'), 
    (u(), 'Atos Administrativos'), 
    (u(), 'Licitações e Contratos'),
    (u(), 'Agentes Públicos'),
    (u(), 'Responsabilidade Civil do Estado'),
    (u(), 'Serviços Públicos'),
    (u(), 'Controle da Administração Pública')
]

topicos = []
subtopicos = []

# A1: Introdução ao Direito Administrativo
a_idx = 0
t1 = (u(), assuntos[a_idx][0], 'Regime Jurídico Administrativo')
topicos.append(t1)
subtopicos.extend([(u(), t1[0], 'Supremacia do Interesse Público'), (u(), t1[0], 'Indisponibilidade do Interesse Público')])

t2 = (u(), assuntos[a_idx][0], 'Fontes do Direito Administrativo')
topicos.append(t2)
subtopicos.extend([(u(), t2[0], 'Lei'), (u(), t2[0], 'Jurisprudência'), (u(), t2[0], 'Doutrina')])

# A2: Administração Pública
a_idx = 1
t1 = (u(), assuntos[a_idx][0], 'Organização Administrativa')
topicos.append(t1)
subtopicos.extend([(u(), t1[0], 'Administração Direta'), (u(), t1[0], 'Administração Indireta'), (u(), t1[0], 'Autarquias'), (u(), t1[0], 'Fundações Públicas'), (u(), t1[0], 'Empresas Públicas'), (u(), t1[0], 'Sociedades de Economia Mista')])

t2 = (u(), assuntos[a_idx][0], 'Entidades Paraestatais')
topicos.append(t2)
subtopicos.extend([(u(), t2[0], 'OS'), (u(), t2[0], 'OSCIP')])

# A3: Princípios Administrativos
a_idx = 2
t1 = (u(), assuntos[a_idx][0], 'Princípios Expressos')
topicos.append(t1)
subtopicos.extend([(u(), t1[0], 'Legalidade'), (u(), t1[0], 'Impessoalidade'), (u(), t1[0], 'Moralidade'), (u(), t1[0], 'Publicidade'), (u(), t1[0], 'Eficiência')])

t2 = (u(), assuntos[a_idx][0], 'Princípios Implícitos')
topicos.append(t2)
subtopicos.extend([(u(), t2[0], 'Supremacia do Interesse Público'), (u(), t2[0], 'Autotutela'), (u(), t2[0], 'Continuidade do Serviço Público')])

# A4: Poderes Administrativos
a_idx = 3
t1 = (u(), assuntos[a_idx][0], 'Poder Vinculado e Discricionário')
topicos.append(t1)
subtopicos.extend([(u(), t1[0], 'Mérito Administrativo'), (u(), t1[0], 'Limites da Discricionariedade')])

t2 = (u(), assuntos[a_idx][0], 'Poder Hierárquico')
topicos.append(t2)
subtopicos.extend([(u(), t2[0], 'Delegação'), (u(), t2[0], 'Avocação')])

t3 = (u(), assuntos[a_idx][0], 'Poder Disciplinar')
topicos.append(t3)
subtopicos.extend([(u(), t3[0], 'Sanções Administrativas')])

t4 = (u(), assuntos[a_idx][0], 'Poder de Polícia')
topicos.append(t4)
subtopicos.extend([(u(), t4[0], 'Atributos'), (u(), t4[0], 'Ciclos de Polícia'), (u(), t4[0], 'Polícia Administrativa x Polícia Judiciária')])

# A5: Atos Administrativos
a_idx = 4
t1 = (u(), assuntos[a_idx][0], 'Elementos do Ato Administrativo')
topicos.append(t1)
subtopicos.extend([(u(), t1[0], 'Competência'), (u(), t1[0], 'Finalidade'), (u(), t1[0], 'Forma'), (u(), t1[0], 'Motivo'), (u(), t1[0], 'Objeto')])

t2 = (u(), assuntos[a_idx][0], 'Atributos do Ato Administrativo')
topicos.append(t2)
subtopicos.extend([(u(), t2[0], 'Presunção de Legitimidade'), (u(), t2[0], 'Imperatividade'), (u(), t2[0], 'Autoexecutoriedade')])

t3 = (u(), assuntos[a_idx][0], 'Extinção dos Atos')
topicos.append(t3)
subtopicos.extend([(u(), t3[0], 'Anulação'), (u(), t3[0], 'Revogação'), (u(), t3[0], 'Cassação')])

t4 = (u(), assuntos[a_idx][0], 'Classificação dos Atos')
topicos.append(t4)
subtopicos.extend([(u(), t4[0], 'Vinculados'), (u(), t4[0], 'Discricionários')])

# A6: Licitações e Contratos
a_idx = 5
t1 = (u(), assuntos[a_idx][0], 'Lei 14.133/2021')
topicos.append(t1)
subtopicos.extend([(u(), t1[0], 'Princípios da Licitação'), (u(), t1[0], 'Modalidades'), (u(), t1[0], 'Dispensa'), (u(), t1[0], 'Inexigibilidade'), (u(), t1[0], 'Fases da Licitação')])

t2 = (u(), assuntos[a_idx][0], 'Contratos Administrativos')
topicos.append(t2)
subtopicos.extend([(u(), t2[0], 'Cláusulas Exorbitantes'), (u(), t2[0], 'Alteração Contratual'), (u(), t2[0], 'Extinção Contratual')])

# A7: Agentes Públicos
a_idx = 6
t1 = (u(), assuntos[a_idx][0], 'Servidores Públicos')
topicos.append(t1)
subtopicos.extend([(u(), t1[0], 'Cargo Público'), (u(), t1[0], 'Provimento'), (u(), t1[0], 'Vacância'), (u(), t1[0], 'Estabilidade')])

t2 = (u(), assuntos[a_idx][0], 'Concurso Público')
topicos.append(t2)
subtopicos.extend([(u(), t2[0], 'Investidura'), (u(), t2[0], 'Direito à Nomeação')])

t3 = (u(), assuntos[a_idx][0], 'Responsabilidade do Servidor')
topicos.append(t3)
subtopicos.extend([(u(), t3[0], 'Civil'), (u(), t3[0], 'Penal'), (u(), t3[0], 'Administrativa')])

# A8: Responsabilidade Civil do Estado
a_idx = 7
t1 = (u(), assuntos[a_idx][0], 'Responsabilidade Objetiva')
topicos.append(t1)
subtopicos.extend([(u(), t1[0], 'Teoria do Risco Administrativo'), (u(), t1[0], 'Art. 37 §6º da CF')])

t2 = (u(), assuntos[a_idx][0], 'Excludentes de Responsabilidade')
topicos.append(t2)
subtopicos.extend([(u(), t2[0], 'Culpa Exclusiva da Vítima'), (u(), t2[0], 'Caso Fortuito e Força Maior')])

# A9: Serviços Públicos
a_idx = 8
t1 = (u(), assuntos[a_idx][0], 'Conceito e Princípios')
topicos.append(t1)
subtopicos.extend([(u(), t1[0], 'Continuidade'), (u(), t1[0], 'Modicidade Tarifária'), (u(), t1[0], 'Universalidade')])

t2 = (u(), assuntos[a_idx][0], 'Delegação de Serviços Públicos')
topicos.append(t2)
subtopicos.extend([(u(), t2[0], 'Concessão'), (u(), t2[0], 'Permissão'), (u(), t2[0], 'Autorização')])

# A10: Controle da Administração Pública
a_idx = 9
t1 = (u(), assuntos[a_idx][0], 'Controle Administrativo')
topicos.append(t1)
subtopicos.extend([(u(), t1[0], 'Autotutela'), (u(), t1[0], 'Súmulas 346 e 473 do STF')])

t2 = (u(), assuntos[a_idx][0], 'Controle Legislativo')
topicos.append(t2)
subtopicos.extend([(u(), t2[0], 'Tribunais de Contas'), (u(), t2[0], 'Fiscalização Contábil')])

t3 = (u(), assuntos[a_idx][0], 'Controle Judicial')
topicos.append(t3)
subtopicos.extend([(u(), t3[0], 'Legalidade'), (u(), t3[0], 'Abuso de Poder')])

sql = []
sql.append(f"INSERT INTO public.disciplinas (id, nome, sigla, ativo, ordem) VALUES ('{disc}', 'Direito Administrativo', 'DADM', true, 0);")
sql.append("")

sql.append('INSERT INTO public.assuntos (id, "disciplinaId", nome, ativo, ordem) VALUES')
assuntos_vals = []
for i, a in enumerate(assuntos):
    assuntos_vals.append(f"('{a[0]}', '{disc}', '{a[1]}', true, {i})")
sql.append(",\n".join(assuntos_vals) + ";\n")

sql.append('INSERT INTO public.topicos (id, "assuntoId", nome, ativo, ordem) VALUES')
topicos_vals = []
for i, t in enumerate(topicos):
    topicos_vals.append(f"('{t[0]}', '{t[1]}', '{t[2]}', true, {i})")
sql.append(",\n".join(topicos_vals) + ";\n")

sql.append('INSERT INTO public.subtopicos (id, "topicoId", nome, ativo, ordem) VALUES')
subtopicos_vals = []
for i, s in enumerate(subtopicos):
    subtopicos_vals.append(f"('{s[0]}', '{s[1]}', '{s[2]}', true, {i})")
sql.append(",\n".join(subtopicos_vals) + ";\n")

with open('seed_adm.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql))

print('\n'.join(sql))
