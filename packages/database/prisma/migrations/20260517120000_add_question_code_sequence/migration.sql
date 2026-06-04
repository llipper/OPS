CREATE SEQUENCE questao_seq START 1;

UPDATE questoes
SET code = 'QT-MIG-' || id;

UPDATE questoes
SET code = 'QT-' || LPAD(nextval('questao_seq')::text, 4, '0');
