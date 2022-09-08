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

/********MAP********/
let map = L.map('map').setView([48.692054, 6.184417], 14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
    id: "mapbox/streets-v11",
    tilesize: 512,
}).addTo(map);

/*******API JCDECAUX*******/
fetch('https://api.jcdecaux.com/vls/v1/stations?contract=Nancy&apiKey=76925468bfb61509831395a181f54381959cba37')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (data) {
        for (let element of data) {
            let marker = L.marker([element.position.lat, element.position.lng]).addTo(map).on("click", markerOnClick);

            function markerOnClick(e) {
            document.querySelector('.location__reservation--titre').innerText = element.address;
            document.querySelector('.location__reservation--places').innerText = element.available_bike_stands;
            document.querySelector('.location__reservation--velos').innerText = element.available_bikes;
            }
        }
    })
    .catch(err => console.log(err));

/********CANVAS********/
let reserver = document.getElementById("reserver");
let canvas = document.getElementById("canvas");
let nom = document.getElementById("nom").value;
let prenom = document.getElementById("prenom").value;

function signature(e) {

    e.preventDefault();
    if (nom.length === 0) {
        alert("Veuillez indiquer un nom et un prénom valident");
    } else {
        canvas.style.display = "flex";
        reserver.style.display = "none";
    }
}
reserver.addEventListener("click", signature)