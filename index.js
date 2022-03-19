const conveyerbelt = document.querySelector('.conveyer-belt');
const boxVertical = document.querySelector('.boxVertical');
const pickUpBox = document.querySelector('.pickUpBox');
const conveyerbeltWidth = conveyerbelt.offsetWidth;
const conveyerbeltHeight = 750;
let count = 0;
let ps = [];
let boxVerticalArray = [];
let pickUpIsFull = true;

loop();

function loop() {
    setInterval(createPackage, 5000);
    setInterval(conveyerRoll, 1000);
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
    const type = createElement('div');
    type.classList.add('box', 'move');
    ps.push(new Package(type));
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
    pickupBoxItem.classList.add('Drag-item', 'draggable="true"');
    pickupBoxItem.innerHTML = doosNaam;
    pickUpBox.append(pickupBoxItem);
}




class Package {
    constructor(type) {
        this.type = type;
        this.x = 0;
        this.y = 0;
        this.count = 0;
        this.draw();
        this.el = document.querySelector('.box');
        this.offset = 0;
        this.width = this.el.offsetWidth;
        this.height = this.el.offsetWidth;
    }

    draw() {
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
