// Modo estrito
"use strict";

// Criando elementos de forma dinâmica
const songs = [
    {
        id: 1,
        name: "In da Club",
        autor: "50 Cent",
        src: "assets/audio/in-da-club.mp3"
    },
    {
        id: 2,
        name: "Medicated",
        autor: "Wiz Khalifa",
        src: "assets/audio/medicated.mp3"
    },
    {
        id: 3,
        name: "Without Me",
        autor: "Eminem",
        src: "assets/audio/without-me.mp3"
    },
    {
        id: 4,
        name: "The Next Episode",
        autor: "Dr Dre",
        src: "assets/audio/the-next-episode.mp3"
    }
];

// Elementos
const hero = document.getElementById("hero");
const icon = document.getElementById("icon");
const audio = document.getElementById("audio");
const title = document.getElementById("name");
const autor = document.getElementById("autor");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const play = document.getElementById("play");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

// Elemento atual
let currentElement = 0;

// Obtendo elementos criados
function getElements() {
    const element = songs[currentElement];
    title.textContent = element.name;
    autor.textContent = element.autor;
    audio.src = element.src;
}
getElements();

// Música anterior
function previousMusic() {
    currentElement --;
    if(currentElement < 0) {
        currentElement = songs.length - 1;
    }
    getElements();
    audio.play();
    play.classList.remove("bx-play");
    play.classList.add("bx-pause");
    hero.classList.add("animate");
    hero.style.animationPlayState = "running";
    icon.classList.add("animate");
    icon.style.animationPlayState = "running";
}

// Próxima música
function nextMusic() {
    currentElement ++;
    if(currentElement === songs.length) {
        currentElement = 0;
    }
    getElements();
    audio.play();
    play.classList.remove("bx-play");
    play.classList.add("bx-pause");
    hero.classList.add("animate");
    hero.style.animationPlayState = "running";
    icon.classList.add("animate");
    icon.style.animationPlayState = "running";
}   

// Pausar e iniciar música
function playPause() {
    if(play.classList.contains("bx-pause")) {
        audio.pause();
        hero.style.animationPlayState = "paused";
        icon.style.animationPlayState = "paused";
        play.classList.remove("bx-pause");
        play.classList.add("bx-play");
    }
    else {
        audio.play()
        hero.classList.add("animate");
        hero.style.animationPlayState = "running";
        icon.classList.add("animate");
        icon.style.animationPlayState = "running";
        play.classList.add("bx-pause");
        play.classList.remove("bx-play");
    }
}

// Adicionar valor
const value = ((value) => value < 10 ? "0" + value : value);

// Atualização automática do tempo de música
function timeUpdated() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + value(currentSeconds); 

    const durationFormated = isNaN(audio.duration) ? 0 : audio.duration;
    const durationMinutes = Math.floor(durationFormated / 60);
    const durationSeconds = Math.floor(durationFormated % 60);
    duration.textContent = durationMinutes + ":" + value(durationSeconds);

    progress.value = audio.currentTime;
    progress.max = durationFormated;

    if(progress.value === progress.max) {
        nextMusic();
    }
}

// Atualização automática do tempo de música ao clicar na barra de progresso
function newTime(event) {
    const time = (event.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = time; 
}

// Eventos
progress.addEventListener("click", newTime);
previous.addEventListener("click", previousMusic);
next.addEventListener("click", nextMusic);
play.addEventListener("click", playPause);
audio.addEventListener("timeupdate", timeUpdated, false);