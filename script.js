const soundButton = document.getElementById("soundButton");
const waves = document.getElementById("waves");

let soundOn = false;


soundButton.addEventListener("click", () => {

    if (!soundOn) {

        waves.volume = 0;
        waves.play();

        let volume = 0;

        const fadeIn = setInterval(() => {

            if (volume < 0.35) {
                volume += 0.02;
                waves.volume = volume;
            } else {
                clearInterval(fadeIn);
            }

        }, 100);


        soundButton.textContent = "waves on";
        soundOn = true;


    } else {

        waves.pause();
        soundButton.textContent = "waves";
        soundOn = false;

    }

});





function startStory(){

    document
    .getElementById("story")
    .scrollIntoView({
        behavior:"smooth"
    });

}





const observer = new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

    if(entry.isIntersecting){

        entry.target.style.opacity="1";
        entry.target.style.transform="translateY(0)";

    }

});

},
{
    threshold:0.15
});



document.querySelectorAll(".chapter, .promise-card, .paper")
.forEach(el=>{

    el.style.opacity="0";
    el.style.transform="translateY(40px)";
    el.style.transition="1.2s ease";

    observer.observe(el);

});





const bottleButton = document.querySelector(".open-bottle");
const paper = document.querySelector(".paper");


if(bottleButton){

paper.style.opacity="0";
paper.style.transform="scale(.95)";


bottleButton.addEventListener("click",()=>{


    paper.style.opacity="1";
    paper.style.transform="scale(1)";


    bottleButton.style.opacity="0";
    bottleButton.style.pointerEvents="none";


});

}
