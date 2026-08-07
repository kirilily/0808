document.addEventListener("DOMContentLoaded", () => {

    const video = document.getElementById("seaVideo");
    const audio = document.getElementById("waves");

    const audioToggle = document.getElementById("audioToggle");
    const startButton = document.getElementById("startStory");

    const intro = document.getElementById("intro");
    const storyApp = document.getElementById("storyApp");

    const bottle = document.getElementById("bottleButton");
    const letter = document.getElementById("letter");

    const navButtons =
        document.querySelectorAll(".chapter-nav button");

    const chapters =
        document.querySelectorAll(".chapter");



    /* =====================================
       SEA VIDEO
    ===================================== */

    if (video) {

        const showVideo = () => {
            video.classList.add("ready");
        };

        if (video.readyState >= 3) {
            showVideo();
        }

        video.addEventListener("canplay", showVideo);

        video.addEventListener("loadeddata", showVideo);

        /*
         * Safari / iPhone иногда блокирует autoplay.
         * Видео всё равно остаётся muted, поэтому
         * пробуем зап
