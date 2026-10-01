-- ============================================================
-- Migração: adicionar a categoria "lookbook" ao sistema de
-- produtos já existente (Raquiel Fitness & Acessórios)
-- ============================================================
-- Como usar: copie TODO este arquivo e cole no SQL Editor do seu
-- projeto Supabase (o mesmo projeto onde já rodou o schema.sql
-- original) → SQL Editor → New query → Run.
--
-- Isso NÃO recria a tabela nem mexe nas categorias "roupas" e
-- "semijoias" que já estão funcionando — só libera um terceiro
-- valor válido para a coluna "categoria" e, opcionalmente, importa
-- as 30 fotos do Lookbook que já estavam fixas no site, para a
-- seção não ficar vazia assim que o painel passar a controlá-la.
-- ============================================================

-- 1) Libera 'lookbook' como valor válido de categoria
-- (mantém 'roupas' e 'semijoias' exatamente como já eram)
alter table produtos drop constraint if exists produtos_categoria_check;
alter table produtos add constraint produtos_categoria_check
  check (categoria in ('roupas', 'semijoias', 'lookbook'));

-- As políticas de RLS e do Storage já criadas no schema.sql original
-- funcionam por perfil (visitante lê / autenticado grava), não por
-- categoria — então elas já cobrem "lookbook" automaticamente, sem
-- precisar de nenhuma política nova.

-- 2) Importa as 30 fotos do Lookbook que já estavam no site,
-- para a seção não aparecer vazia até a cliente mexer nela pelo
-- painel. Rode este bloco SOMENTE UMA VEZ (rodar de novo duplicaria
-- as fotos). Se preferir começar do zero, pule este passo.
insert into produtos (categoria, nome, referencia, imagem_path, imagem_url, ordem) values
  ('lookbook', 'Look Raquiel Fitness & Acessórios 1', NULL, 'legacy-static/look-01.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-01.jpeg', 0),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 2', NULL, 'legacy-static/look-02.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-02.jpeg', 1),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 3', NULL, 'legacy-static/look-03.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-03.jpeg', 2),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 4', NULL, 'legacy-static/look-04.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-04.jpeg', 3),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 5', NULL, 'legacy-static/look-05.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-05.jpeg', 4),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 6', NULL, 'legacy-static/look-06.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-06.jpeg', 5),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 7', NULL, 'legacy-static/look-07.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-07.jpeg', 6),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 8', NULL, 'legacy-static/look-08.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-08.jpeg', 7),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 9', NULL, 'legacy-static/look-09.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-09.jpeg', 8),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 10', NULL, 'legacy-static/look-10.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-10.jpeg', 9),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 11', NULL, 'legacy-static/look-11.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-11.jpeg', 10),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 12', NULL, 'legacy-static/look-12.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-12.jpeg', 11),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 13', NULL, 'legacy-static/look-13.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-13.jpeg', 12),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 14', NULL, 'legacy-static/look-14.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-14.jpeg', 13),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 15', NULL, 'legacy-static/look-15.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-15.jpeg', 14),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 16', NULL, 'legacy-static/look-16.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-16.jpeg', 15),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 17', NULL, 'legacy-static/look-17.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-17.jpeg', 16),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 18', NULL, 'legacy-static/look-18.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-18.jpeg', 17),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 19', NULL, 'legacy-static/look-19.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-19.jpeg', 18),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 20', NULL, 'legacy-static/look-20.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-20.jpeg', 19),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 21', NULL, 'legacy-static/look-21.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-21.jpeg', 20),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 22', NULL, 'legacy-static/look-22.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-22.jpeg', 21),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 23', NULL, 'legacy-static/look-23.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-23.jpeg', 22),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 24', NULL, 'legacy-static/look-24.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-24.jpeg', 23),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 25', NULL, 'legacy-static/look-25.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-25.jpeg', 24),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 26', NULL, 'legacy-static/look-26.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-26.jpeg', 25),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 27', NULL, 'legacy-static/look-27.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-27.jpeg', 26),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 28', NULL, 'legacy-static/look-28.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-28.jpeg', 27),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 29', NULL, 'legacy-static/look-29.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-29.jpeg', 28),
  ('lookbook', 'Look Raquiel Fitness & Acessórios 30', NULL, 'legacy-static/look-30.jpeg', 'https://raquielstudiofitness.com.br/images/acessorios/roupas-vitrine/look-30.jpeg', 29);

-- Observação sobre "imagem_path" dessas 30 fotos importadas:
-- elas apontam para 'legacy-static/...', um caminho que NÃO existe
-- de verdade no Storage do Supabase (as fotos continuam sendo
-- servidas pelos arquivos estáticos do GitHub Pages). Isso é só
-- para o painel ter um valor para preencher; se a cliente clicar em
-- "Remover" numa dessas fotos antigas, a exclusão do banco funciona
-- normalmente — só não vai apagar nada do Storage (porque não tem
-- nada lá pra apagar). Qualquer foto NOVA adicionada por ela a partir
-- de agora já vai direto para o Storage de verdade, como as outras.

-- ============================================================
-- Fim da migração.
-- ============================================================
