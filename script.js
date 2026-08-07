const waves = document.getElementById("waves");
const soundButton = document.getElementById("soundButton");

let soundEnabled = false;



// Волны

soundButton.addEventListener("click", () => {

    if (!soundEnabled) {

        waves.volume = 0;
        waves.play();

        let volume = 0;

        const fade = setInterval(() => {

            volume += 0.02;

            if (volume >= 0.35) {

                volume = 0.35;
                clearInterval(fade);

            }

            waves.volume = volume;

        },100);


        soundButton.textContent = "waves on";

        soundEnabled = true;


    } else {


        waves.pause();

        soundButton.textContent = "waves";

        soundEnabled = false;


    }


});






// Переход в историю

const enterButton = document.querySelector(".enter-button");


enterButton.addEventListener("click",()=>{


document
.querySelector("#story")
.scrollIntoView({

behavior:"smooth"

});


});







// Бутылка

const bottleButton = document.querySelector(".open-bottle");

const bottle = document.querySelector(".bottle");

const letter = document.querySelector(".letter");



bottleButton.addEventListener("click",()=>{


bottle.style.transform =
"scale(1.1) rotate(-10deg)";


bottle.style.opacity="0";


setTimeout(()=>{


letter.classList.add("show");


bottleButton.style.display="none";


},1000);



});






// Плавное появление глав


const elements =
document.querySelectorAll(".chapter, .promise-inner");



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";


}


});


},
{
threshold:.15
});




elements.forEach(el=>{


el.style.opacity="0";

el.style.transform="translateY(40px)";

el.style.transition="1.2s ease";


observer.observe(el);


});
