const WHATSAPP = "5569984687088";

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


document.querySelectorAll("[data-msg]").forEach((link) => {
  const texto = encodeURIComponent(link.dataset.msg); // deixa o texto seguro para a URL
  link.href = `https://wa.me/${WHATSAPP}?text=${texto}`;
  link.target = "_blank";
  link.rel = "noopener";
});

// Menu do celular 
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


document.getElementById("listaBordados").innerHTML = bordados.map((b) => `<li>${b}</li>`).join("");

// Portfólio: filtros e galeria 
const galeria = document.getElementById("galeria");
const filtros = document.getElementById("filtros");
const categorias = ["Todos", ...new Set(trabalhos.map((t) => t.cat))]; // Set remove repetidos

function mostrar(categoria) {
  const lista = categoria === "Todos" ? trabalhos : trabalhos.filter((t) => t.cat === categoria);
  galeria.innerHTML = lista.map((t) => {
    // Vídeo: fica dentro de uma caixa junto com o botão grande de play/pause por cima
    const midia = t.tipo === "video"
      ? `<div class="video-box">
           <video src="${t.src}" poster="${t.src.replace(".mp4", ".jpg")}" muted preload="none" playsinline></video>
           <button class="play-btn" type="button" aria-label="Reproduzir vídeo">
             <span class="icone" aria-hidden="true">
               <svg class="i-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               <svg class="i-pause" viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
             </span>
           </button>
           <div class="video-barra">
             <input class="progresso" type="range" min="0" max="100" step="0.1" value="0" aria-label="Posição do vídeo">
             <button class="tela-cheia" type="button" aria-label="Ver em tela cheia">
               <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>
             </button>
           </div>
         </div>`
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

/* Garante que os vídeos fiquem sempre no mudo, mesmo se alguém tentar ligar o som.
O "true" no final faz o aviso chegar aqui, porque esse evento não "sobe" na página sozinho.*/
galeria.addEventListener("volumechange", (e) => {
  if (e.target.tagName === "VIDEO" && !e.target.muted) e.target.muted = true;
}, true);

// Botão grande do vídeo: clicou na imagem, toca; clicou de novo, pausa
galeria.addEventListener("click", (e) => {
  const botao = e.target.closest(".play-btn"); // closest: acha o botão mesmo clicando no ícone dentro dele
  if (!botao) return;
  const video = botao.parentElement.querySelector("video");
  if (video.paused) video.play();
  else video.pause();
});

/* Troca o ícone (play = pause) sempre que o vídeo começa ou para,
seja pelo botão grande ou pelos controles de baixo*/ 
function atualizarBotao(e) {
  if (e.target.tagName !== "VIDEO") return;
  const caixa = e.target.parentElement;
  const tocando = !e.target.paused;
  caixa.classList.toggle("tocando", tocando);
  caixa.querySelector(".play-btn").setAttribute("aria-label", tocando ? "Pausar vídeo" : "Reproduzir vídeo");
}
["play", "pause", "ended"].forEach((evento) => galeria.addEventListener(evento, atualizarBotao, true));

// Barra de tempo: anda sozinha enquanto o vídeo toca
galeria.addEventListener("timeupdate", (e) => {
  const video = e.target;
  if (video.tagName !== "VIDEO" || !video.duration) return;
  video.parentElement.querySelector(".progresso").value = (video.currentTime / video.duration) * 100;
}, true);

// Barra de tempo: arrastar a bolinha pula para aquele ponto do vídeo
galeria.addEventListener("input", (e) => {
  if (!e.target.matches(".progresso")) return;
  const video = e.target.closest(".video-box").querySelector("video");
  if (video.duration) video.currentTime = (e.target.value / 100) * video.duration;
});

// Botão de tela cheia
galeria.addEventListener("click", (e) => {
  const botao = e.target.closest(".tela-cheia");
  if (!botao) return;
  const video = botao.closest(".video-box").querySelector("video");
  if (video.requestFullscreen) video.requestFullscreen();          // Chrome, Edge, Firefox, Android
  else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen(); // iPhone (Safari)
});

// Amplia a foto
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

document.getElementById("ano").textContent = new Date().getFullYear();

// Tema: Auto (segue o sistema)
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
  } catch (e) { }
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