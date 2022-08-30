const items = document.querySelectorAll('img');
const nbSlide = items.length;
const suivant = document.querySelector('.carousel__button__nav--right');
const precedent = document.querySelector('.carousel__button__nav--left');
const pause = document.querySelector('.carousel__button__nav--pause');
const play = document.querySelector('.carousel__button__nav--play');

let count = 0;

/********SLIDER********/
function slideSuivante(){
    
    items[count].classList.remove('active');

    if(count <nbSlide - 1){
        count++;
    } else {
        count = 0;
    }

    items[count].classList.add('active');
}
suivant.addEventListener('click', slideSuivante)
suivant.addEventListener('click', slidePause)

function slidePrecedente(){
    items[count].classList.remove('active');
    if(count > 0) {
        count--;
    } else {
        count = nbSlide - 1;
    }

    items[count].classList.add('active');
    slidePause();
}
precedent.addEventListener('click', slidePrecedente,)




/*********SLIDER AUTO**********/
let auto = true;
function slidePlay() {
    auto = true;
    play.style.display = 'none';
    pause.style.display = 'block';
    slideInterval = setInterval(slideSuivante, 5000);
}
play.addEventListener('click', slidePlay)

function slidePause() {
    auto = false;
    pause.style.display = 'none';
    play.style.display = 'block';
    clearInterval(slideInterval);
}
pause.addEventListener('click', slidePause)

slidePlay();

function keyPress(e){

    console.log(e);
    if(e.keyCode === 37) {
        slidePrecedente();
    } else if(e.keyCode === 39) {
        slideSuivante();
        slidePause();
    } else if (e.keyCode === 32) {
        if(auto === false) {
            slidePlay();
        } else if (auto === true) {
            slidePause();
        }
    }
}
document.addEventListener('keydown', keyPress)