# Raquiel Studio Fitness

Site institucional do **Raquiel Studio Fitness**, studio de treinamento personalizado em Itapeba, Maricá/RJ, acompanhado de uma página dedicada à loja **Raquiel Fitness & Acessórios** (moda fitness e semijoias) e de um painel administrativo para gerenciar as fotos dessa loja.

Site publicado: [raquielstudiofitness.com.br](https://raquielstudiofitness.com.br/)

---

## Sobre o projeto

O projeto é composto por duas páginas públicas e uma área restrita:

| Página | Arquivo | Finalidade |
|---|---|---|
| Studio Fitness | `index.html` | Apresentação do studio, serviços, nutrição, reabilitação, galeria, localização e contato |
| Fitness & Acessórios | `fitness-acessorios.html` | Vitrine de roupas fitness, lookbook e semijoias, com contato direto por WhatsApp |
| Painel administrativo | `admin/index.html` | Área com login para adicionar, substituir, remover e reordenar fotos da loja |

As páginas públicas são arquivos HTML autocontidos (HTML, CSS e JavaScript no mesmo arquivo), sem etapa de build. Somente o conteúdo da loja (roupas, lookbook e semijoias) é carregado dinamicamente a partir do Supabase.

---

## Funcionalidades

### Studio Fitness (`index.html`)

- Seções: Início, Sobre, Serviços, Nutrição, Reabilitação, Galeria, Localização e Contato, além de vídeo de apresentação e seção de comunidade.
- Hero sem fotografia, com gradientes e elementos decorativos animados em CSS/SVG.
- Cabeçalho fixo que muda de aparência ao rolar a página, com menu em tela cheia no mobile.
- Galeria com lightbox, com navegação por teclado (setas e `Esc`).
- Vídeo de apresentação (`videos/apresentacao-raquiel.mp4`) com carregamento apenas dos metadados.
- Botões de WhatsApp (com mensagem pré-preenchida) e links para o Instagram do studio e da área de nutrição.
- Mapa incorporado e link "Como chegar".
- Animações de entrada por rolagem (`IntersectionObserver`) e respeito à preferência `prefers-reduced-motion`.
- Botão flutuante de WhatsApp e botão "voltar ao topo".
- Navegação cruzada com a página Fitness & Acessórios.

### Fitness & Acessórios (`fitness-acessorios.html`)

- Seções: Início, Roupas Fitness, Lookbook, Semijoias, Contato e Sobre.
- Roupas, lookbook e semijoias são carregados do Supabase, ordenados pela ordem definida no painel.
- Cards de roupas e semijoias com botão "Tenho interesse", que abre o WhatsApp com mensagem contendo o nome do produto.
- Roupas exibem as primeiras 8 peças e um botão "Ver mais peças" para o restante.
- Lightbox para o lookbook e para as semijoias.
- Dois números de WhatsApp de atendimento e link para o Instagram da loja.
- Mensagens de contingência exibidas caso o Supabase não esteja configurado ou não responda.

### Painel administrativo (`admin/index.html`)

- Login por e-mail e senha via Supabase Auth (não há cadastro público).
- Gerenciamento de três categorias: Roupas Fitness, Lookbook e Semijoias.
- Adicionar produto/foto, alterar foto e nome, remover (com confirmação) e reordenar (botões de mover e arrastar e soltar).
- Validação de formato (JPG, PNG e WEBP) e tamanho; a imagem é redimensionada (até 1400 px no maior lado) e recomprimida no navegador antes do envio.
- Ao substituir ou remover um produto, a imagem anterior é removida do Storage.
- Marcada com `noindex` e listada como `Disallow` no `robots.txt`.

---

## Tecnologias utilizadas

- **HTML5, CSS3 e JavaScript** puros, sem framework e sem gerenciador de pacotes (não há `package.json`).
- **Supabase** (via `@supabase/supabase-js@2`, carregado por CDN):
  - Postgres (tabela `produtos`) com Row Level Security;
  - Auth (login do administrador);
  - Storage (bucket `produtos-fotos`).
- **Google Fonts**: Cormorant Garamond e Manrope.
- **Dados estruturados** (JSON-LD, schema.org) nas duas páginas públicas.

---

## Estrutura de pastas

```text
raquielStudioFitness/
├── index.html                  # Página do Studio Fitness
├── fitness-acessorios.html     # Página Fitness & Acessórios
├── admin/
│   └── index.html              # Painel administrativo (login + gerenciamento)
├── supabase/
│   ├── schema.sql              # Tabela, políticas RLS e políticas do Storage
│   └── migration-lookbook.sql  # Adiciona a categoria "lookbook" e importa as fotos antigas
├── images/
│   ├── logo/                   # Logo do Studio e marca-d'água
│   ├── gallery/                # Fotos da galeria do Studio
│   ├── sobre/ sororidade/ nutricao/
│   └── acessorios/             # Logo e imagens da loja (produtos, vitrine, semijoias)
├── videos/
│   └── apresentacao-raquiel.mp4
├── favicon/                    # Ícones (Studio e Acessórios) em vários tamanhos
├── favicon.ico
├── CNAME                       # Domínio personalizado
├── robots.txt
├── sitemap.xml
├── llms.txt
├── llms-full.txt
└── README.md
```

---

## Pré-requisitos

- Um navegador atual para abrir o site.
- Opcionalmente, um servidor HTTP estático local. Os arquivos usam caminhos absolutos a partir da raiz (por exemplo, `/favicon/...`), então devem ser servidos a partir da raiz do projeto.
- Para o conteúdo dinâmico da loja e para o painel: um projeto Supabase próprio.

Não há versão mínima de Node.js, pois o projeto não utiliza Node.

---

## Instalação e execução local

Não há dependências a instalar nem scripts de build.

1. Clone o repositório:

   ```bash
   git clone https://github.com/MikaelToledo31/raquielStudioFitness.git
   cd raquielStudioFitness
   ```

2. Sirva a pasta com qualquer servidor estático. Exemplo com Python:

   ```bash
   python3 -m http.server 8000
   ```

3. Acesse `http://localhost:8000/` no navegador.

Abrir o `index.html` diretamente também permite ver a página do Studio, mas os caminhos absolutos (favicons, por exemplo) só resolvem corretamente quando servidos da raiz.

---

## Configuração do Supabase

Necessária apenas para a loja dinâmica e para o painel `/admin/`.

1. Crie um projeto no [Supabase](https://supabase.com/).
2. No SQL Editor, execute `supabase/schema.sql`.
3. Crie o bucket **público** `produtos-fotos` em Storage (antes de executar a parte de Storage do script).
4. Execute `supabase/migration-lookbook.sql` para habilitar a categoria `lookbook`. A inserção das 30 fotos antigas do lookbook nesse arquivo deve ser executada uma única vez.
5. Em Authentication → Users, crie o usuário administrador (marque a confirmação automática do e-mail).
6. Em `admin/index.html` e `fitness-acessorios.html`, configure `window.SUPABASE_URL` e `window.SUPABASE_ANON_KEY` com a URL do projeto e a chave **anon public**.

Segurança: use apenas a chave `anon public` no frontend. Nunca inclua a chave `service_role`. A escrita é protegida por RLS: visitantes só leem; apenas usuários autenticados inserem, atualizam e removem.

---

## Build de produção

Não há processo de build. Os arquivos da raiz do repositório são os arquivos publicados.

---

## Identidade visual e experiência do usuário

- Paleta definida por variáveis CSS: preto (`#0B0F0C`), verde escuro (`#1F3428`), dourado (`#C8A15A`) e off-white (`#F7F5EF`). A página Fitness & Acessórios e o painel usam uma variação em preto e dourado.
- Tipografia: Cormorant Garamond (títulos) e Manrope (texto).
- Layout responsivo, com menu em tela cheia no mobile, grades que se reorganizam por largura e proteção contra rolagem horizontal.
- Animações suaves de entrada, efeitos de hover e lightbox nas galerias.

---

## Contato e redes sociais

Canais configurados no site:

- WhatsApp do Studio e da loja: [+55 21 96492-7008](https://wa.me/5521964927008)
- WhatsApp adicional da loja: +55 21 99694-8669 ([link](https://wa.me/5521996948669))
- Instagram do Studio: [@raquielstudiofitness](https://www.instagram.com/raquielstudiofitness/)
- Instagram da loja: [@raquiel.fitnesseacessorios](https://www.instagram.com/raquiel.fitnesseacessorios/)
- Instagram da nutrição: [@drraquielssantos_nutripersonal](https://www.instagram.com/drraquielssantos_nutripersonal/)
- Endereço: Rua Carmem Miranda, nº 3, Itapeba, Maricá/RJ (mapa via link do Google Maps no site)
- Horário: segunda a sexta, 06:30 às 22:00; sábado e feriado, 08:00 às 11:00

---

## Implantação

O repositório contém um arquivo `CNAME` com o domínio `raquielstudiofitness.com.br`, no padrão usado pelo GitHub Pages, e não há workflow de CI/CD no projeto. Como o site é estático, a publicação consiste em enviar os arquivos para a branch configurada para hospedagem.

Também estão incluídos `robots.txt` (com `Disallow: /admin/`), `sitemap.xml` e `llms.txt`/`llms-full.txt` para descoberta por buscadores e ferramentas de IA.

Observação: o `sitemap.xml` ainda referencia `fitness-acessorios.html`; a página não utiliza URL "limpa" (sem `.html`) neste projeto.

---

## Licença

Nenhum arquivo de licença foi identificado no repositório. A licença poderá ser definida posteriormente pelo responsável. Textos, imagens, logos e identidade visual pertencem ao Raquiel Studio Fitness.
