/* ============================================================
   BLACK FRIDAY — pop-up promocional (Raquiel Studio Fitness e
   Raquiel Fitness & Acessórios)
   ------------------------------------------------------------
   Arquivo único e reutilizável: injeta o próprio CSS e HTML.
   Uso (antes do </body> de cada página):

     <script src="black-friday/black-friday.js" data-theme="studio" defer></script>
     <script src="black-friday/black-friday.js" data-theme="acessorios" defer></script>

   Para ENCERRAR a campanha: remova a linha <script> das páginas
   (ou defina CONFIG.enabled = false logo abaixo).
============================================================ */
(function () {
  "use strict";

  /* ---------------- CONFIGURAÇÃO (edite aqui) ---------------- */
  var CONFIG = {
    enabled: true,

    // Atraso (ms) antes de abrir, para não competir com o carregamento.
    showDelayMs: 1400,

    // Período opcional da campanha (formato ISO). Deixe null para não limitar.
    // Ex.: startDate: "2025-11-24T00:00:00-03:00", endDate: "2025-12-01T23:59:59-03:00"
    startDate: null,
    endDate: null,

    // Botão de chamada para ação (CTA)
    ctaLabel: "CONFERIR OFERTAS",
    whatsappNumber: "5521964927008",
    whatsappMessage: {
      studio: "Olá! Vi a Black Friday no site do Raquiel Studio Fitness e gostaria de conferir as ofertas.",
      acessorios: "Olá! Vi a Black Friday no site da Raquiel Fitness e Acessórios e gostaria de conferir as ofertas."
    },

    // Textos da campanha (fornecidos pela cliente)
    title: "BLACK FRIDAY",
    eyebrow: "OFERTAS ESPECIAIS PARA VOCÊ!",
    intro: "Aproveite nossa Black Friday e encontre produtos selecionados com preços imperdíveis!",
    bullets: [
      { icon: "💪", text: "Mais qualidade para seus treinos." },
      { icon: "🔥", text: "Mais economia para o seu bolso." }
    ],
    closing: "Não deixe para depois!",

    // Ofertas — exatamente como no PDF da campanha (sem valores inventados)
    offers: [
      { name: "Conjuntos de short + top",  from: "129,90", price: "99,90",  img: "bf-short-top.jpg",
        alt: "Conjunto de short e top vermelho exposto em manequim" },
      { name: "Conjuntos de calça + top",  from: "159,90", price: "119,90", img: "bf-calca-top.jpg",
        alt: "Conjunto de calça legging e top marrom e bege exposto em manequim" },
      { name: "Macacão",                   from: "169,90", price: "129,90", img: "bf-macacao.jpg",
        alt: "Macacão fitness azul claro exposto em manequim" },
      { name: "Macaquinho",                from: "129,90", price: "99,90",  img: "bf-macaquinho.jpg",
        alt: "Macaquinho fitness vinho com detalhe azul exposto em manequim" }
    ]
  };
  /* ------------------------------------------------------------ */

  if (!CONFIG.enabled) return;

  var script = document.currentScript || (function () {
    var s = document.querySelectorAll('script[src*="black-friday.js"]');
    return s[s.length - 1];
  })();
  var THEME = (script && script.getAttribute("data-theme")) === "acessorios" ? "acessorios" : "studio";
  var BASE = script && script.src ? new URL("../images/blackfriday/", script.src).href : "images/blackfriday/";
  /* ---------------- utilidades ---------------- */
  function inPeriod() {
    var now = Date.now();
    if (CONFIG.startDate && now < new Date(CONFIG.startDate).getTime()) return false;
    if (CONFIG.endDate && now > new Date(CONFIG.endDate).getTime()) return false;
    return true;
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  // Cada carregamento de página inicia uma nova instância do pop-up. Não há
  // persistência entre visitas, recargas ou navegação entre páginas.
  if (!inPeriod()) return;

  /* ---------------- CSS ---------------- */
  var css = [
    ".bf-overlay{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;padding:16px;",
    "background:rgba(3,3,3,.84);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:0;visibility:hidden;",
    "transition:opacity .45s ease,visibility .45s;overscroll-behavior:contain}",
    ".bf-overlay.bf-open{opacity:1;visibility:visible}",

    ".bf-dialog{--bf-tint:rgba(200,161,90,.16);position:relative;width:100%;max-width:940px;",
    "max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);display:flex;flex-direction:column;border-radius:26px;",
    "background:radial-gradient(ellipse 80% 55% at 50% 0%,var(--bf-tint),transparent 70%),linear-gradient(180deg,#0d0d0d 0%,#050505 100%);",
    "border:1px solid rgba(200,161,90,.45);box-shadow:0 40px 120px -30px rgba(0,0,0,.95),0 0 0 6px rgba(200,161,90,.05),inset 0 0 60px rgba(200,161,90,.05);",
    "color:#F8F6F1;font-family:'Manrope',system-ui,sans-serif;transform:translateY(24px) scale(.97);transition:transform .55s cubic-bezier(.16,.84,.44,1);overflow:hidden}",
    ".bf-open .bf-dialog{transform:none}",
    ".bf-theme-studio::after{content:'';position:absolute;inset:auto 0 0 0;height:38%;pointer-events:none;",
    "background:linear-gradient(180deg,transparent,rgba(31,52,40,.55))}",

    ".bf-close{position:absolute;top:12px;right:12px;z-index:5;width:44px;height:44px;border-radius:50%;border:1px solid rgba(200,161,90,.55);",
    "background:rgba(8,8,8,.85);color:#EBD08F;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .3s,transform .3s,color .3s}",
    ".bf-close:hover{background:#C8A15A;color:#0a0a0a;transform:rotate(90deg)}",
    ".bf-close:focus-visible,.bf-cta:focus-visible{outline:2px solid #EBD08F;outline-offset:3px}",
    ".bf-close svg{width:18px;height:18px}",

    ".bf-scroll{position:relative;z-index:2;flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:rgba(200,161,90,.4) transparent}",
    ".bf-inner{position:relative;padding:44px 36px 0;text-align:center}",
    ".bf-foot{position:sticky;bottom:0;z-index:3;margin:0 -36px;padding:40px 36px 22px;background:linear-gradient(180deg,rgba(5,5,5,0),rgba(5,5,5,.97) 30%)}",
    ".bf-watermark{position:absolute;left:50%;top:50%;width:min(92%,700px);height:auto;transform:translate(-50%,-42%);opacity:.1;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:0}",
    ".bf-content{position:relative;z-index:1}",

    ".bf-eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:12px;font-weight:700;letter-spacing:.26em;color:#C8A15A}",
    ".bf-eyebrow::before,.bf-eyebrow::after{content:'';width:34px;height:1px;background:linear-gradient(90deg,transparent,#C8A15A)}",
    ".bf-eyebrow::after{transform:scaleX(-1)}",
    ".bf-title{margin:10px 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:clamp(2.7rem,8.4vw,4.8rem);line-height:.95;letter-spacing:.07em;",
    "background:linear-gradient(100deg,#9a7632 0%,#EBD08F 28%,#C8A15A 50%,#F7E4B0 70%,#9a7632 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;",
    "filter:drop-shadow(0 4px 18px rgba(200,161,90,.28));animation:bf-shine 6s linear infinite}",
    "@keyframes bf-shine{0%{background-position:120% 0}100%{background-position:-120% 0}}",
    ".bf-orn{display:flex;align-items:center;justify-content:center;gap:12px;margin:16px auto 18px;color:#C8A15A;font-size:12px}",
    ".bf-orn::before,.bf-orn::after{content:'';height:1px;width:min(22%,120px);background:linear-gradient(90deg,transparent,rgba(200,161,90,.7))}",
    ".bf-orn::after{transform:scaleX(-1)}",
    ".bf-intro{margin:0 auto;max-width:560px;font-size:clamp(.95rem,2.4vw,1.08rem);line-height:1.6;color:rgba(248,246,241,.86)}",
    ".bf-bullets{list-style:none;margin:16px auto 0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:10px 26px;font-size:.95rem;font-weight:600;color:#F8F6F1}",
    ".bf-bullets li{display:flex;align-items:center;gap:8px}",

    ".bf-offers{list-style:none;margin:24px 0 0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}",
    ".bf-card{position:relative;display:flex;flex-direction:column;border-radius:16px;overflow:hidden;background:rgba(14,14,14,.8);",
    "border:1px solid rgba(200,161,90,.28);transition:transform .45s cubic-bezier(.16,.84,.44,1),border-color .3s;text-align:left}",
    ".bf-card:hover{transform:translateY(-5px);border-color:rgba(200,161,90,.7)}",
    ".bf-card-media{aspect-ratio:4/5;background:#111;overflow:hidden}",
    ".bf-card-media img{width:100%;height:100%;object-fit:cover;object-position:50% 20%;display:block;transition:transform .8s cubic-bezier(.16,.84,.44,1)}",
    ".bf-card:hover .bf-card-media img{transform:scale(1.06)}",
    ".bf-card-body{padding:12px 12px 14px;display:flex;flex-direction:column;gap:3px;flex:1}",
    ".bf-name{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-size:1.12rem;font-weight:700;line-height:1.15;color:#F8F6F1;margin-bottom:auto}",
    ".bf-from{font-size:.78rem;color:rgba(248,246,241,.55);margin-top:4px}",
    ".bf-from s{text-decoration-color:#C8A15A;text-decoration-thickness:1.5px}",
    ".bf-price{display:flex;align-items:baseline;gap:6px;color:#EBD08F}",
    ".bf-price small{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(248,246,241,.6);font-weight:600}",
    ".bf-price strong{font-family:'Manrope',sans-serif;font-size:1.5rem;font-weight:800;letter-spacing:-.01em;background:linear-gradient(135deg,#F7E4B0,#C8A15A);-webkit-background-clip:text;background-clip:text;color:transparent}",
    ".bf-price strong span{font-size:.8rem;font-weight:700;margin-right:2px}",

    ".bf-closing{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:700;font-size:clamp(1.35rem,4vw,1.8rem);color:#F8F6F1}",
    ".bf-cta{display:inline-flex;align-items:center;justify-content:center;gap:10px;margin-top:12px;padding:16px 44px;border-radius:100px;text-decoration:none;",
    "font-weight:800;font-size:.95rem;letter-spacing:.16em;color:#1a1305;background:linear-gradient(135deg,#F7E4B0,#C8A15A 60%,#B08A42);",
    "box-shadow:0 16px 40px -12px rgba(200,161,90,.75),inset 0 1px 0 rgba(255,255,255,.4);transition:transform .35s cubic-bezier(.16,.84,.44,1),box-shadow .35s}",
    ".bf-cta:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 22px 50px -12px rgba(200,161,90,.95),inset 0 1px 0 rgba(255,255,255,.5)}",
    ".bf-cta svg{width:18px;height:18px}",
    ".bf-pulse{animation:bf-pulse 2.8s ease-in-out infinite}",
    "@keyframes bf-pulse{0%,100%{box-shadow:0 16px 40px -12px rgba(200,161,90,.75),inset 0 1px 0 rgba(255,255,255,.4)}50%{box-shadow:0 16px 46px -8px rgba(235,208,143,.95),0 0 0 8px rgba(200,161,90,.1),inset 0 1px 0 rgba(255,255,255,.4)}}",

    "@media (max-width:820px){.bf-offers{grid-template-columns:repeat(2,1fr);gap:12px}.bf-inner{padding:48px 22px 0}.bf-foot{margin:0 -22px;padding:38px 22px 18px}.bf-card-media{aspect-ratio:3/4}}",
    "@media (max-width:420px){.bf-overlay{padding:10px}.bf-dialog{border-radius:20px;max-height:calc(100vh - 20px);max-height:calc(100dvh - 20px)}",
    ".bf-inner{padding:50px 14px 0}.bf-foot{margin:0 -14px;padding:36px 14px 14px}.bf-closing{font-size:1.25rem}.bf-name{font-size:1rem}.bf-price strong{font-size:1.3rem}.bf-card-body{padding:10px 10px 12px}",
    ".bf-cta{width:100%;padding:16px 20px;letter-spacing:.12em}.bf-eyebrow{font-size:10.5px;letter-spacing:.18em;gap:8px}.bf-eyebrow::before,.bf-eyebrow::after{width:18px}}",
    "@media (max-height:560px) and (orientation:landscape){.bf-foot{position:static;background:none}.bf-inner{padding-top:40px}.bf-offers{grid-template-columns:repeat(4,1fr)}}",
    "@media (prefers-reduced-motion:reduce){.bf-overlay,.bf-dialog,.bf-card,.bf-cta{transition:none}.bf-title,.bf-pulse{animation:none}}"
  ].join("");

  var styleEl = document.createElement("style");
  styleEl.setAttribute("data-bf", "");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ---------------- HTML ---------------- */
  var waHref = "https://wa.me/" + CONFIG.whatsappNumber + "?text=" +
    encodeURIComponent(CONFIG.whatsappMessage[THEME]);

  var offersHtml = CONFIG.offers.map(function (o) {
    return '<li class="bf-card">' +
      '<div class="bf-card-media"><img src="' + BASE + o.img + '" alt="' + esc(o.alt) + '" width="600" height="800" loading="lazy" decoding="async"></div>' +
      '<div class="bf-card-body">' +
        '<h3 class="bf-name">' + esc(o.name) + '</h3>' +
        '<div class="bf-from">De <s>R$ ' + esc(o.from) + '</s></div>' +
        '<div class="bf-price"><small>por</small><strong><span>R$</span>' + esc(o.price) + '</strong></div>' +
      '</div></li>';
  }).join("");

  var bulletsHtml = CONFIG.bullets.map(function (b) {
    return '<li><span aria-hidden="true">' + b.icon + '</span><span>' + esc(b.text) + '</span></li>';
  }).join("");

  var overlay = document.createElement("div");
  overlay.className = "bf-overlay";
  overlay.setAttribute("data-bf", "");
  overlay.innerHTML =
    '<div class="bf-dialog bf-theme-' + THEME + '" role="dialog" aria-modal="true" aria-labelledby="bf-title" aria-describedby="bf-intro">' +
      '<button type="button" class="bf-close" aria-label="Fechar promoção">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
      '</button>' +
      '<div class="bf-scroll"><div class="bf-inner">' +
        '<img class="bf-watermark" src="' + BASE + 'bf-logo-watermark.png" alt="" aria-hidden="true" width="900" height="479" decoding="async">' +
        '<div class="bf-content">' +
          '<div class="bf-eyebrow">' + esc(CONFIG.eyebrow) + '</div>' +
          '<h2 class="bf-title" id="bf-title">' + esc(CONFIG.title) + '</h2>' +
          '<div class="bf-orn" aria-hidden="true">◆</div>' +
          '<p class="bf-intro" id="bf-intro">' + esc(CONFIG.intro) + '</p>' +
          '<ul class="bf-bullets">' + bulletsHtml + '</ul>' +
          '<ul class="bf-offers">' + offersHtml + '</ul>' +
        '</div>' +
        '<div class="bf-foot">' +
          '<p class="bf-closing">' + esc(CONFIG.closing) + '</p>' +
          '<a class="bf-cta bf-pulse" href="' + waHref + '" target="_blank" rel="noopener">' + esc(CONFIG.ctaLabel) +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>' +
        '</div>' +
      '</div></div>' +
    '</div>';

  /* ---------------- comportamento ---------------- */
  var closeBtn, lastFocus, prevOverflow, isOpen = false;

  function focusables() { return overlay.querySelectorAll("button, a[href]"); }

  function open() {
    if (isOpen) return;
    isOpen = true;
    document.body.appendChild(overlay);
    closeBtn = overlay.querySelector(".bf-close");
    lastFocus = document.activeElement;
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    void overlay.offsetWidth; // reflow para a transição de entrada
    overlay.classList.add("bf-open");
    window.setTimeout(function () { closeBtn.focus({ preventScroll: true }); }, 60);
    document.addEventListener("keydown", onKey, true);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove("bf-open");
    document.removeEventListener("keydown", onKey, true);
    document.body.style.overflow = prevOverflow || "";
    window.setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 500);
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  }

  function onKey(e) {
    if (e.key === "Escape") { e.stopPropagation(); close(); return; }
    if (e.key !== "Tab") return;
    var f = focusables();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) { close(); return; }
    if (e.target.closest(".bf-close")) { close(); return; }
    if (e.target.closest(".bf-cta")) window.setTimeout(close, 150);
  });

  function start() { window.setTimeout(open, CONFIG.showDelayMs); }
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
})();
