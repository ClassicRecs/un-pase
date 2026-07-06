const destino = new Date("2026-07-29T18:00:00-06:00");
const contador = document.getElementById("contador");
const musicaFondo = document.getElementById("musica-fondo");
const botonVerInvitacion = document.getElementById("ver-invitacion");
const portada = document.getElementById("portada");
const contenidoInvitacion = document.querySelectorAll(".invitation-content");

const unidades = [
    ["dias", "d&iacute;as"],
    ["horas", "horas"],
    ["minutos", "minutos"],
    ["segundos", "segundos"],
];

function calcularTiempoRestante() {
    const ahora = new Date();
    const diferencia = Math.max(destino.getTime() - ahora.getTime(), 0);

    return {
        dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((diferencia % (1000 * 60)) / 1000),
    };
}

function actualizarContador() {
    if (!contador) {
        return;
    }

    const tiempo = calcularTiempoRestante();

    contador.innerHTML = unidades.map(([clave, etiqueta]) => `
        <div class="countdown-item">
            <span class="countdown-number">${String(tiempo[clave]).padStart(2, "0")}</span>
            <span class="countdown-label">${etiqueta}</span>
        </div>
    `).join("");
}

actualizarContador();
setInterval(actualizarContador, 1000);

function reproducirMusica() {
    if (!musicaFondo) {
        return;
    }

    musicaFondo.loop = true;
    musicaFondo.play().catch(() => {});
}

function abrirInvitacion() {
    document.body.classList.add("intro-saliendo");
    reproducirMusica();

    window.setTimeout(() => {
        document.body.classList.remove("intro-activa", "intro-saliendo");
        document.body.classList.add("invitacion-abierta");

        contenidoInvitacion.forEach((seccion) => {
            seccion.setAttribute("aria-hidden", "false");
        });

        if (portada) {
            portada.setAttribute("aria-hidden", "true");
        }

        document.getElementById("info")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1100);
}

if (botonVerInvitacion) {
    botonVerInvitacion.addEventListener("click", abrirInvitacion);
}
