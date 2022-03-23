const conveyerbelt = document.querySelector('.conveyer-belt');
const boxVertical = document.querySelector('.boxVertical');
const pickUpBox = document.querySelector('.pickUpBox');
var conveyerPlace = document.getElementById("conveyerPlace");
const conveyerbeltWidth = conveyerbelt.offsetWidth;
var conveyerbeltHeight = boxVertical.offsetHeight + 60;
let count = 0;
let ps = [];
let boxVerticalArray = [];
let pickUpIsFull = true;
const form = document.getElementById('form');
const shapes = ["box", "straightBox", "TBox", "LBox", "SkewBox"];
const transportTypes = ["Koudtransport", ".Breekbaartransport", "Algemeentransport", "Pallets", "Snelkoerier"];
//idee array lopende banden die elke keer als een lopende band wordt toegevoegd de array met een vergroot en verwijderd een weg haald
//bij pakketjes aanmaken loopt hij over elke band in de array en voegt die er een toe

loop();



form.addEventListener('submit', function(event){
    event.preventDefault();
    //check dat er niet al te veel op de rolbank liggen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //twee arrays vertical en horizontal bij elkaar tellen en een bepaald aantal niet te laten bereieken ik denk dat de error daarvandaan komt
        let transport = document.getElementById('transportkind').value
        let shape = document.getElementById('Shape').value
        console.log(shape);
        //functie create package hier gebruiken uiteindelijk hieronder
        const type = createElement('div');
        type.classList.add(shape, 'move');
        ps.push(new Package(type, shape, transport));
});


function loop() {
    setInterval(createPackage, 5000);
    setInterval(conveyerRoll, 1000);
}

function addConveyerBelt() {
    //begrijp niet helemaal of die het doet of niet doet
     conveyerbeltHeight = boxVertical.offsetHeight + 150;
    var ConveyerBelt = document.createElement("div");
    ConveyerBelt.classList.add('conveyer-belt');
    // var text = document.createTextNode("Tutorix is the best e-learning platform");
    // ConveyerBelt.appendChild(text);
    conveyerPlace.appendChild(ConveyerBelt)
}

function RemoveConveyerBelt() {
    if(conveyerPlace.children.length > 4){
        conveyerbeltHeight = boxVertical.offsetHeight - 150;
        conveyerPlace.removeChild(conveyerPlace.lastChild);
    }
}

function conveyerRoll() {
    if(checkPickUpDoos()){
    if (ps.length > 0) {
        ps.forEach(p => {
            if(canMove(p.x, conveyerbeltWidth)){
                p.moveHor();
            }else{
                p.removeHor();
            }
        }); 
    }
    if (boxVerticalArray.length > 0) {
        boxVerticalArray.forEach(p => {
                if(canMove(p.y, conveyerbeltHeight)){
                    p.moveVer();
                }else {
                    addDoosToOphaalbak(p.el);
                    boxVerticalArray.shift();
                    boxVertical.removeChild(p.type);
                }
        }); 
    }
}
}

function checkPickUpDoos(){
    if(pickUpBox.children.length >= 8){
        return pickUpIsFull = false;
    }else{
        return pickUpIsFull = true;
    }
}


function createPackage() {
    if(checkPickUpDoos()){
        //twee regels hieronder functie maken random shape en type
    let RandomTransportType =  transportTypes[Math.floor(Math.random() * transportTypes.length)];
    let randomShape =  shapes[Math.floor(Math.random() * shapes.length)];

    //hieronder functie maken create package
    const type = createElement('div');
    type.classList.add(randomShape, 'move');
    ps.push(new Package(type, randomShape, RandomTransportType));
    }
}

function createElement(tag) {
    return document.createElement(tag);
}

function canMove(PackageX, conveyerbeltSize) {

    if (PackageX < conveyerbeltSize) {
        return true;
    }
    return false;
};

function addDoosToOphaalbak(doosNaam) {
    var pickupBoxItem = document.createElement('li');
    pickupBoxItem.innerHTML = doosNaam;
    pickUpBox.append(pickupBoxItem);
}




class Package {
    constructor(type, element, TransportType) {
        this.type = type;
        this.x = 0;
        this.y = 0;
        this.count = 0;
        this.draw();
        this.el = document.querySelector(('.' + element));
        this.offset = 0;
        this.width = this.el.offsetWidth;
        this.height = this.el.offsetWidth;
        this.transportType = TransportType;
    }

    draw() {
        //random conveyerbelt
        conveyerbelt.appendChild(this.type);
    }


    removeHor() {
            conveyerbelt.removeChild(this.type);
            ps.shift();
            boxVerticalArray.push(this);
            boxVertical.appendChild(this.type);
    }

    moveHor() {
        this.type.style.left = this.x + 'px';
        this.x += 60;
        this.count++
    }

    moveVer() {
        this.type.style.top = this.y + 'px';
        this.y += 60;
        this.count++
    }

    
}
