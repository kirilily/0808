const screens =
document.querySelectorAll(".screen");


let current = 0;



function nextScreen(){


if(current < screens.length - 1){


screens[current]
.classList.remove("active");


current++;


screens[current]
.classList.add("active");


}


}



document.addEventListener(
"keydown",
(e)=>{


if(e.key==="Enter"){

nextScreen();

}


});




document.addEventListener(
"click",
()=>{


nextScreen();


});





const terminal =
document.getElementById("terminal");



if(terminal){


terminal.addEventListener(
"click",
(e)=>{


e.stopPropagation();


document
.querySelector(".final")
.classList.remove("active");


document
.querySelector(".terminal-screen")
.classList.add("active");


});


}
