// ===== 1. DADOS DA CLIENTE (para trocar, mude só aqui) =====
const WHATSAPP = "5569984687088"; // 55 (Brasil) + 69 (DDD) + número

// Lista de tipos de bordado que aparece nos "chips" do card de Bordados
const bordados = ["Brasões", "Jalecos", "Uniformes", "Enxovais", "Velcros", "Camisas", "Bonés", "Capas para livros", "E muito mais!"];

// Portfólio: cada item tem tipo (foto ou video), arquivo, legenda e categoria
const trabalhos = [
  { tipo: "foto", src: "img/uniforme-impacto.jpg", legenda: "Uniformes com brasão", cat: "Camisas e jalecos" },
  { tipo: "foto", src: "img/jaleco-psicologia.jpg", legenda: "Jaleco de Psicologia", cat: "Camisas e jalecos" },
  { tipo: "foto", src: "img/camiseta-farmacia.jpg", legenda: "Camiseta de Farmácia", cat: "Camisas e jalecos" },
  { tipo: "foto", src: "img/camiseta-medicina.jpg", legenda: "Camiseta de Medicina", cat: "Camisas e jalecos" },
  { tipo: "foto", src: "img/bone-nasci-pronto.jpg", legenda: "Boné com patch personalizado", cat: "Bonés" },
  { tipo: "foto", src: "img/bone-princesa.jpg", legenda: "Boné com frase", cat: "Bonés" },
  { tipo: "foto", src: "img/bone-legendarios.jpg", legenda: "Boné com patch de velcro", cat: "Bonés" },
  { tipo: "foto", src: "img/bone-bonita-demais.jpg", legenda: "Boné com frase", cat: "Bonés" },
  { tipo: "foto", src: "img/bone-bobeou.jpg", legenda: "Boné com frase", cat: "Bonés" },
  { tipo: "foto", src: "img/patch-seguranca.jpg", legenda: "Patches de segurança", cat: "Patches e brasões" },
  { tipo: "foto", src: "img/patch-hyrox.jpg", legenda: "Patches redondos", cat: "Patches e brasões" },
  { tipo: "foto", src: "img/patch-paraquedista.jpg", legenda: "Patches de identificação", cat: "Patches e brasões" },
  { tipo: "foto", src: "img/patch-legendarios.jpg", legenda: "Lote de patches e bandeiras", cat: "Patches e brasões" },
  { tipo: "foto", src: "img/patch-intercessao.jpg", legenda: "Patches escudo", cat: "Patches e brasões" },
  { tipo: "foto", src: "img/mochila-patches.jpg", legenda: "Mochila com patches", cat: "Patches e brasões" },
  { tipo: "video", src: "videos/video1.mp4", legenda: "Bordado em ação", cat: "Vídeos" },
  { tipo: "video", src: "videos/video2.mp4", legenda: "Bordado em ação", cat: "Vídeos" },
  { tipo: "video", src: "videos/video3.mp4", legenda: "Bordado em ação", cat: "Vídeos" },
];

// ===== 2. WHATSAPP: todo link com data-msg abre o WhatsApp com a mensagem pronta =====
document.querySelectorAll("[data-msg]").forEach((link) => {
  const texto = encodeURIComponent(link.dataset.msg); // deixa o texto seguro para a URL
  link.href = `https://wa.me/${WHATSAPP}?text=${texto}`;
  link.target = "_blank";
  link.rel = "noopener";
});

// ===== 3. MENU DO CELULAR =====
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
function abrirMenu(aberto) {
  menu.classList.toggle("aberto", aberto);
  menuBtn.setAttribute("aria-expanded", aberto);
  menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  menuBtn.textContent = aberto ? "✕" : "☰";
}
menuBtn.addEventListener("click", () => abrirMenu(!menu.classList.contains("aberto")));
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") abrirMenu(false); // fecha ao clicar num link
});

// ===== 4. CHIPS DE BORDADOS =====
document.getElementById("listaBordados").innerHTML = bordados.map((b) => `<li>${b}</li>`).join("");

// ===== 5. PORTFÓLIO: filtros e galeria =====
const galeria = document.getElementById("galeria");
const filtros = document.getElementById("filtros");
const categorias = ["Todos", ...new Set(trabalhos.map((t) => t.cat))]; // Set remove repetidos

function mostrar(categoria) {
  const lista = categoria === "Todos" ? trabalhos : trabalhos.filter((t) => t.cat === categoria);
  galeria.innerHTML = lista.map((t) => {
    const midia = t.tipo === "video"
      ? `<video src="${t.src}" poster="${t.src.replace(".mp4", ".jpg")}" controls muted preload="none" playsinline></video>`
      : `<img src="${t.src}" alt="${t.legenda}" loading="lazy">`;
    return `<figure class="item">${midia}<figcaption>${t.legenda}</figcaption></figure>`;
  }).join("");
  filtros.querySelectorAll("button").forEach((b) => {
    b.setAttribute("aria-pressed", b.textContent === categoria); // marca o botão ativo
  });
}

filtros.innerHTML = categorias.map((c) => `<button type="button">${c}</button>`).join("");
filtros.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") mostrar(e.target.textContent);
});
mostrar("Todos");

// Garante que os vídeos fiquem sempre no mudo, mesmo se alguém tentar ligar o som
// (ex.: tecla "M" ou navegadores que não escondem o botão de volume).
// O "true" no final faz o aviso chegar aqui, porque esse evento não "sobe" na página sozinho.
galeria.addEventListener("volumechange", (e) => {
  if (e.target.tagName === "VIDEO" && !e.target.muted) e.target.muted = true;
}, true);

// ===== 6. AMPLIAR FOTO =====
const janela = document.getElementById("janela");
const fotoGrande = document.getElementById("fotoGrande");
galeria.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    fotoGrande.src = e.target.src;
    fotoGrande.alt = e.target.alt;
    janela.showModal();
  }
});
document.getElementById("fechar").addEventListener("click", () => janela.close());
janela.addEventListener("click", (e) => { if (e.target === janela) janela.close(); }); // clique fora fecha

// ===== 7. ANO DO RODAPÉ =====
document.getElementById("ano").textContent = new Date().getFullYear();

// ===== 8. TEMA: Auto (segue o sistema) / Claro / Escuro =====
const raiz = document.documentElement;
const temaBtn = document.getElementById("temaBtn");
const temaTexto = document.getElementById("temaTexto");
const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)");
const corBarra = document.querySelector('meta[name="theme-color"]');
const nomesTema = { auto: "Auto", claro: "Claro", escuro: "Escuro" };

// Lê a escolha salva no navegador ("auto" se não tiver nada salvo)
function lerTema() {
  try {
    const salvo = localStorage.getItem("tema");
    return salvo in nomesTema ? salvo : "auto";
  } catch (e) {
    return "auto"; // navegador bloqueou o armazenamento: usa o sistema
  }
}

// Guarda a escolha. "auto" não precisa ser guardado: é só apagar
function salvarTema(modo) {
  try {
    if (modo === "auto") localStorage.removeItem("tema");
    else localStorage.setItem("tema", modo);
  } catch (e) {}
}

// Aplica o modo na página e atualiza o botão
function aplicarTema(modo) {
  if (modo === "auto") delete raiz.dataset.tema; // sem atributo = CSS segue o sistema
  else raiz.dataset.tema = modo;
  temaBtn.dataset.modo = modo;
  temaTexto.textContent = nomesTema[modo];
  temaBtn.title = modo === "auto"
    ? "Seguindo o tema do seu aparelho. Clique para trocar."
    : `Tema ${nomesTema[modo].toLowerCase()} escolhido. Clique para trocar.`;
  const escuro = modo === "escuro" || (modo === "auto" && sistemaEscuro.matches);
  corBarra.content = escuro ? "#c2410c" : "#e8501f"; // cor da barra do navegador no celular
}

// Cada clique passa para o próximo modo. O 1º clique sempre muda a cor visível
temaBtn.addEventListener("click", () => {
  const ordem = sistemaEscuro.matches ? ["auto", "claro", "escuro"] : ["auto", "escuro", "claro"];
  const proximo = ordem[(ordem.indexOf(temaBtn.dataset.modo) + 1) % ordem.length];
  salvarTema(proximo);
  aplicarTema(proximo);
});

// Se o sistema mudar (ex.: modo noturno automático), o modo Auto acompanha
sistemaEscuro.addEventListener("change", () => aplicarTema(temaBtn.dataset.modo));
aplicarTema(lerTema());
