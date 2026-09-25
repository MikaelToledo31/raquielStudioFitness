-- ============================================================
-- Raquiel Fitness & Acessórios — configuração do banco (Supabase)
-- ============================================================
-- Como usar: copie TODO este arquivo e cole no SQL Editor do seu
-- projeto Supabase (Supabase → SQL Editor → New query → Run).
-- Pode rodar de uma vez só, de cima a baixo.
-- ============================================================

-- 1) Tabela de produtos
-- Guarda os itens das duas vitrines: "roupas" (Moda Fitness) e
-- "semijoias" (Semijoias). Uma tabela só, com uma coluna
-- "categoria" para diferenciar — mais simples de administrar.
create table if not exists produtos (
  id uuid primary key default gen_random_uuid(),
  categoria text not null check (categoria in ('roupas', 'semijoias')),
  nome text not null,
  referencia text,              -- código do produto (ex: "3172"), opcional
  imagem_path text not null,    -- caminho do arquivo no Storage (para poder apagar depois)
  imagem_url text not null,     -- URL pública da imagem (usada no site)
  ordem integer not null default 0,
  criado_em timestamptz not null default now()
);

-- Índice para acelerar a busca por categoria + ordem (é assim que o site consulta)
create index if not exists produtos_categoria_ordem_idx
  on produtos (categoria, ordem);

-- 2) Ativa a segurança em nível de linha (RLS)
-- A partir daqui, TODO acesso à tabela passa pelas regras abaixo.
alter table produtos enable row level security;

-- 3) Qualquer visitante (mesmo sem login) pode LER os produtos —
-- é isso que faz a página pública funcionar.
drop policy if exists "Produtos são públicos para leitura" on produtos;
create policy "Produtos são públicos para leitura"
  on produtos for select
  to anon, authenticated
  using (true);

-- 4) Só um usuário autenticado (a cliente logada no /admin) pode
-- inserir, atualizar ou excluir produtos.
drop policy if exists "Somente autenticados podem inserir" on produtos;
create policy "Somente autenticados podem inserir"
  on produtos for insert
  to authenticated
  with check (true);

drop policy if exists "Somente autenticados podem atualizar" on produtos;
create policy "Somente autenticados podem atualizar"
  on produtos for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Somente autenticados podem excluir" on produtos;
create policy "Somente autenticados podem excluir"
  on produtos for delete
  to authenticated
  using (true);

-- ============================================================
-- 5) STORAGE (fotos dos produtos)
-- ============================================================
-- IMPORTANTE: antes de rodar a parte abaixo, crie o bucket pela
-- interface do Supabase (não dá para criar bucket via SQL):
--
--   Supabase → Storage → New bucket
--   Nome do bucket: produtos-fotos
--   Public bucket: SIM (marcar como público)
--
-- Depois de criar o bucket, rode o restante deste script.

-- Leitura pública das fotos (necessário para o site exibir as imagens)
drop policy if exists "Leitura pública das fotos de produtos" on storage.objects;
create policy "Leitura pública das fotos de produtos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'produtos-fotos');

-- Upload de fotos só para usuário autenticado
drop policy if exists "Upload autenticado de fotos" on storage.objects;
create policy "Upload autenticado de fotos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'produtos-fotos');

-- Exclusão de fotos só para usuário autenticado
drop policy if exists "Exclusão autenticada de fotos" on storage.objects;
create policy "Exclusão autenticada de fotos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'produtos-fotos');

-- ============================================================
-- Fim do script. Próximo passo: criar o usuário administrador em
-- Supabase → Authentication → Users → Add user (veja o guia de
-- instalação para o passo a passo completo).
-- ============================================================
