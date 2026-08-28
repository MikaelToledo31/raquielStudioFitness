# Raquiel Studio Fitness

Site institucional do **Raquiel Studio Fitness**, studio de treinamento personalizado em Itapeba, Maricá/RJ, com página irmã dedicada à **Raquiel Fitness & Acessórios** (moda fitness e semijoias).

**🔗 Site no ar:** [raquielstudiofitness.com.br](https://raquielstudiofitness.com.br/)

---

## Sobre o projeto

Site estático premium, feito sob medida, sem frameworks e sem etapa de build — cada página é um único arquivo HTML autocontido (HTML + CSS + JavaScript), pensado para publicação direta no GitHub Pages com domínio próprio.

O projeto reúne duas frentes de negócio da mesma marca:

| Página | URL | Conteúdo |
|---|---|---|
| **Studio Fitness** | `/` (`index.html`) | Apresentação do studio, serviços de treino, nutrição, reabilitação, galeria, localização e contato |
| **Fitness & Acessórios** | `/fitness-acessorios.html` | Vitrine de moda fitness e semijoias, com galeria de looks e contato via WhatsApp |

---

## Stack técnica

- **HTML5** semântico
- **CSS3** puro (custom properties, Grid, Flexbox, `clamp()`, animações via `@keyframes`)
- **JavaScript** vanilla (sem dependências, sem bundler)
- **Sem frameworks** (não usa React, Vue, Bootstrap, Tailwind etc.)
- Hospedagem: **GitHub Pages** com domínio personalizado (`CNAME`)

Não há processo de build: os arquivos `.html` na raiz do repositório são exatamente o que é publicado.

---

## Estrutura do projeto

```
raquielStudioFitness/
├── index.html                     # Página principal — Raquiel Studio Fitness
├── fitness-acessorios.html        # Página — Raquiel Fitness & Acessórios
├── CNAME                          # Domínio personalizado (GitHub Pages)
├── robots.txt                     # Diretivas para crawlers
├── sitemap.xml                    # Mapa do site para buscadores
├── llms.txt / llms-full.txt       # Contexto estruturado do negócio para IAs/LLMs
├── favicon.ico                    # Favicon raiz (Studio Fitness)
├── favicon/                       # Conjunto completo de ícones (Studio + Acessórios)
│   ├── studio-favicon-*.png
│   ├── acessorios-favicon-*.png
│   └── *.ico
├── images/
│   ├── logo/                      # Logo e marca-d'água do Studio
│   ├── gallery/                   # Galeria de fotos do Studio
│   ├── sobre/                     # Imagem da seção "Sobre"
│   ├── sororidade/                # Imagem da seção "Comunidade"
│   ├── nutricao/                  # Logo da parceria de Nutrição
│   └── acessorios/                # Logo, produtos, looks e semijoias da loja
│       ├── logo/
│       ├── roupas-produtos/
│       ├── roupas-vitrine/
│       └── semijoias/
└── videos/
    └── apresentacao-raquiel.mp4   # Vídeo de apresentação
```

---

## Seções do site

### Studio Fitness (`index.html`)

`Início` → `Sobre` → `Serviços` → `Nutrição` → `Reabilitação` → `Galeria` → `Localização` → `Contato`

- **Hero** sem fotografia — composição em gradiente preto/verde-escuro com anéis dourados sutis e animações de entrada
- **Sobre** — texto institucional com logo em marca-d'água discreta ao fundo
- **Serviços** — cards de Musculação, Funcional, Personal e Reabilitação
- **Nutrição & Bem-Estar** — parceria com a Dra. Raquiel S. Santos (nutricionista), com CTA direto para WhatsApp
- **Reabilitação** — seção de destaque para acompanhamento especializado
- **Galeria** — grid com lightbox (zoom, navegação por teclado)
- **Localização** — mapa incorporado + botão "Como chegar"
- **Contato** — WhatsApp e Instagram

### Fitness & Acessórios (`fitness-acessorios.html`)

`Início` → `Roupas Fitness` → `Semijoias` → `Sobre` → `Contato`

- Vitrine de produtos com preço/nome quando disponível
- Galeria de looks (lookbook) com lightbox
- Vitrine de semijoias
- Dois contatos de WhatsApp para atendimento

Ambas as páginas têm navegação cruzada entre si (botões "Fitness & Acessórios" e "Studio Fitness").

---

## Identidade visual

| Token | Valor | Uso |
|---|---|---|
| `--black` | `#0B0F0C` | Fundo base |
| `--green-deep` | `#0F1911` | Gradientes de fundo |
| `--green-dark` | `#1F3428` | Identidade Studio |
| `--gold` | `#C8A15A` | Cor de destaque da marca |
| `--gold-light` | `#E3C88A` | Hover / realces |
| `--white` | `#F7F5EF` | Texto principal |

**Tipografia:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (títulos, serifada, elegante) + [Manrope](https://fonts.google.com/specimen/Manrope) (corpo de texto, sans-serif)

---

## Funcionalidades

- Header dinâmico (transparente → sólido ao rolar) com menu mobile em tela cheia
- Scroll suave entre seções (`scroll-behavior: smooth`)
- Animações de entrada por scroll (`IntersectionObserver`)
- Lightbox de galeria com navegação por teclado (`←` `→` `Esc`)
- Botão flutuante de WhatsApp + botão "voltar ao topo"
- Totalmente responsivo (320px a desktop wide), sem overflow horizontal
- Links internos com URLs limpas (`/`, `/#sobre`), sem `.html` exposto na navegação da home
- Favicon completo (`.ico` + PNG em múltiplos tamanhos + `apple-touch-icon`) para os dois sub-domínios de marca

---

## SEO

- `<title>` e `meta description` únicos por página
- Open Graph (`og:title`, `og:description`, `og:image`)
- `sitemap.xml` e `robots.txt` na raiz
- `llms.txt` / `llms-full.txt` — contexto estruturado do negócio para mecanismos de busca baseados em IA
- HTML semântico com hierarquia de headings e `alt` text em todas as imagens

---

## Deploy

O projeto é publicado via **GitHub Pages**, com domínio próprio configurado através do arquivo `CNAME` (`raquielstudiofitness.com.br`).

Para publicar uma alteração:

1. Editar os arquivos necessários diretamente na raiz do repositório
2. Commit e push para a branch principal (`main`)
3. O GitHub Pages publica automaticamente em alguns minutos

Não há passo de instalação, build ou dependências para rodar localmente — basta abrir `index.html` num navegador ou servir a pasta com qualquer servidor estático (ex: `npx serve .`).

---

## Contato do negócio

- **WhatsApp (Studio):** [+55 21 96492-7008](https://wa.me/5521964927008)
- **WhatsApp (Acessórios):** +55 21 96492-7008 · +55 21 99694-8669
- **Instagram (Studio):** [@raquielstudiofitness](https://www.instagram.com/raquielstudiofitness/)
- **Instagram (Nutrição):** [@drraquielssantos_nutripersonal](https://www.instagram.com/drraquielssantos_nutripersonal/)
- **Instagram (Acessórios):** [@raquiel.fitnesseacessorios](https://www.instagram.com/raquiel.fitnesseacessorios/)

---

## Licença

Todo o conteúdo (textos, imagens, logo e identidade visual) é propriedade do **Raquiel Studio Fitness**. Código-fonte para uso exclusivo deste projeto.
