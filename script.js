document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       ELEMENTS
    ================================================== */

    const video = document.getElementById("seaVideo");
    const audio = document.getElementById("waves");

    const audioToggle = document.getElementById("audioToggle");
    const startButton = document.getElementById("startStory");

    const intro = document.getElementById("intro");
    const storyApp = document.getElementById("storyApp");

    const bottle = document.getElementById("bottleButton");
    const letter = document.getElementById("letter");

    const chapterButtons =
        document.querySelectorAll(".chapter-nav button");

    const sections =
        document.querySelectorAll(
            "#chapter01, #chapter02, #chapter03, #chapter04, #chapter05, #promise, #bottleSection, #terminal"
        );

    const revealElements =
        document.querySelectorAll(".reveal");


    /* ==================================================
       SEA VIDEO
    ================================================== */

    if (video) {

        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        /*
         * Пытаемся запустить море сразу.
         * На iPad/Safari autoplay может быть ограничен,
         * поэтому делаем несколько попыток.
         */

        const startVideo = () => {

            video.muted = true;

            const playPromise = video.play();

            if (playPromise !== undefined) {

                playPromise
                    .then(() => {

                        video.classList.add("is-playing");

                    })
                    .catch(() => {

                        /*
                         * Если Safari пока не разрешил autoplay,
                         * poster.jpg остаётся видимым.
                         *
                         * При первом взаимодействии пользователя
                         * попробуем снова.
                         */

                    });

            }

        };


        video.addEventListener(
            "loadeddata",
            startVideo,
            { once: true }
        );


        video.addEventListener(
            "canplay",
            () => {

                if (!video.classList.contains("is-playing")) {
                    startVideo();
                }

            },
            { once: true }
        );


        /*
         * Попытка сразу после загрузки DOM
         */

        startVideo();


        /*
         * И ещё раз после полной загрузки страницы
         */

        window.addEventListener(
            "load",
            startVideo,
            { once: true }
        );


        /*
         * iPad/Safari часто разрешает video.play()
         * после первого касания экрана.
         */

        const unlockVideo = () => {

            if (
                video.paused ||
                !video.classList.contains("is-playing")
            ) {

                startVideo();

            }

        };


        document.addEventListener(
            "touchstart",
            unlockVideo,
            {
                once: true,
                passive: true
            }
        );


        document.addEventListener(
            "pointerdown",
            unlockVideo,
            {
                once: true,
                passive: true
            }
        );

    }



    /* ==================================================
       ENTER / START STORY
    ================================================== */

    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                if (intro) {

                    intro.classList.add("intro-complete");

                }


                if (storyApp) {

                    setTimeout(() => {

                        storyApp.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 150);

                }


                /*
                 * Пользователь уже взаимодействовал
                 * со страницей — хорошее время
                 * дополнительно запустить видео.
                 */

                if (video) {

                    video.muted = true;

                    const playPromise = video.play();

                    if (
                        playPromise !== undefined
                    ) {

                        playPromise
                            .then(() => {

                                video.classList.add(
                                    "is-playing"
                                );

                            })
                            .catch(() => {});

                    }

                }

            }
        );

    }



    /* ==================================================
       AUDIO
    ================================================== */

    let audioEnabled = false;


    if (audio) {

        audio.volume = 0.38;

    }


    const updateAudioButton = () => {

        if (!audioToggle) {
            return;
        }


        if (audioEnabled) {

            audioToggle.textContent =
                "sound / on";

            audioToggle.classList.add(
                "active"
            );

        } else {

            audioToggle.textContent =
                "sound / off";

            audioToggle.classList.remove(
                "active"
            );

        }

    };


    const enableAudio = () => {

        if (!audio) {
            return;
        }


        audio.volume = 0.38;


        const playPromise =
            audio.play();


        if (
            playPromise !== undefined
        ) {

            playPromise
                .then(() => {

                    audioEnabled = true;

                    updateAudioButton();

                })
                .catch(() => {

                    audioEnabled = false;

                    updateAudioButton();

                });

        } else {

            audioEnabled = true;

            updateAudioButton();

        }

    };


    const disableAudio = () => {

        if (!audio) {
            return;
        }


        audio.pause();

        audioEnabled = false;

        updateAudioButton();

    };


    if (audioToggle) {

        audioToggle.addEventListener(
            "click",
            () => {

                if (audioEnabled) {

                    disableAudio();

                } else {

                    enableAudio();

                }

            }
        );

    }



    /* ==================================================
       CHAPTER NAVIGATION
    ================================================== */

    const scrollToChapter = (id) => {

        const target =
            document.getElementById(id);


        if (!target) {
            return;
        }


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    };


    chapterButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.chapter;


                    if (!id) {
                        return;
                    }


                    scrollToChapter(id);

                }
            );

        }
    );



    /* ==================================================
       ACTIVE CHAPTER
    ================================================== */

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const id =
                            entry.target.id;


                        chapterButtons.forEach(
                            (button) => {

                                button.classList.toggle(
                                    "active",
                                    button.dataset.chapter === id
                                );

                            }
                        );

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(
        (section) => {

            sectionObserver.observe(section);

        }
    );



    /* ==================================================
       REVEAL ANIMATIONS
    ================================================== */

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            /*
                             * После появления элементу
                             * больше не нужно наблюдение.
                             */

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(element);

        }
    );



    /* ==================================================
       BOTTLE
    ================================================== */

    let bottleOpened = false;


    if (bottle && letter) {

        bottle.addEventListener(
            "click",
            () => {

                /*
                 * Не даём повторно запускать
                 * всю последовательность.
                 */

                if (bottleOpened) {
                    return;
                }


                bottleOpened = true;


                /*
                 * Перестраиваем бутылку
                 * из состояния "лежит/плывёт"
                 * в состояние открытия.
                 */

                bottle.classList.add(
                    "opening"
                );


                /*
                 * Через небольшую паузу
                 * появляется письмо.
                 */

                setTimeout(
                    () => {

                        letter.classList.add(
                            "open"
                        );

                    },
                    900
                );

            }
        );



        /*
         * Закрытие письма по клику
         * за пределами бумаги.
         */

        letter.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === letter
                ) {

                    letter.classList.remove(
                        "open"
                    );

                }

            }
        );

    }



    /* ==================================================
       ESC CLOSE LETTER
    ================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                letter &&
                letter.classList.contains("open")
            ) {

                letter.classList.remove(
                    "open"
                );

            }

        }
    );



    /* ==================================================
       KEYBOARD CHAPTER CONTROL
    ================================================== */

    const chapterIds = [
        "chapter01",
        "chapter02",
        "chapter03",
        "chapter04",
        "chapter05",
        "promise",
        "bottleSection",
        "terminal"
    ];


    let currentChapter = 0;


    const getCurrentChapter = () => {

        let closestIndex = 0;

        let closestDistance =
            Infinity;


        chapterIds.forEach(
            (id, index) => {

                const section =
                    document.getElementById(id);


                if (!section) {
                    return;
                }


                const rect =
                    section.getBoundingClientRect();


                const distance =
                    Math.abs(
                        rect.top
                    );


                if (
                    distance <
                    closestDistance
                ) {

                    closestDistance =
                        distance;

                    closestIndex =
                        index;

                }

            }
        );


        return closestIndex;

    };


    window.addEventListener(
        "scroll",
        () => {

            currentChapter =
                getCurrentChapter();

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            /*
             * Не вмешиваемся,
             * если пользователь печатает
             * в каком-либо input.
             */

            if (
                event.target.tagName ===
                "INPUT" ||
                event.target.tagName ===
                "TEXTAREA"
            ) {

                return;

            }


            if (
                event.key ===
                "ArrowDown"
            ) {

                event.preventDefault();


                const next =
                    Math.min(
                        currentChapter + 1,
                        chapterIds.length - 1
                    );


                currentChapter =
                    next;


                scrollToChapter(
                    chapterIds[next]
                );

            }


            if (
                event.key ===
                "ArrowUp"
            ) {

                event.preventDefault();


                const previous =
                    Math.max(
                        currentChapter - 1,
                        0
                    );


                currentChapter =
                    previous;


                scrollToChapter(
                    chapterIds[previous]
                );

            }

        }
    );



    /* ==================================================
       INITIAL STATE
    ================================================== */

    updateAudioButton();


    /*
     * На всякий случай сразу показываем poster.
     * Видео само плавно появится поверх него,
     * когда реально начнёт проигрываться.
     */

    if (video) {

        video.classList.remove(
            "is-playing"
        );

    }



    /* ==================================================
       MOBILE VIDEO RETRY
    ================================================== */

    const retryVideoOnInteraction = () => {

        if (!video) {
            return;
        }


        if (
            video.paused ||
            !video.classList.contains(
                "is-playing"
            )
        ) {

            video.muted = true;


            const promise =
                video.play();


            if (
                promise !== undefined
            ) {

                promise
                    .then(() => {

                        video.classList.add(
                            "is-playing"
                        );

                    })
                    .catch(() => {});

            }

        }

    };


    document.addEventListener(
        "click",
        retryVideoOnInteraction,
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        retryVideoOnInteraction,
        {
            passive: true
        }
    );

});
