const conveyerbelt = document.querySelector('.conveyer-belt');
const boxVertical = document.querySelector('.boxVertical');
const pickUpBox = document.querySelector('.pickUpBox');

const conveyerbeltWidth = conveyerbelt.offsetWidth;
const conveyerbeltHeight = 500;

let count = 0;
let ps = [];
let trucks = [];
let boxVerticalArray = [];
let pickUpIsFull = true;

function main() {
	initTruckForm();	
    setInterval(createPackage, 5000);
    setInterval(conveyerRoll, 1000);
}

function conveyerRoll() {
    if(checkPickUpDoos()){
    if (ps.length > 0) {
        ps.forEach(p => {
		//hier gaat iets mis
            if(canMove(p.x, 20)){
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


//waarom?
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
function initTruckForm()
{
	let formButton = document.getElementById("truck_form_btn");
	let formCloseButton = document.getElementById("truck_form_close_btn");
	let formButtonSubmit = document.getElementById("truck_form_submit");
	let form = document.getElementById("truck_form");
	form.action="javascript:void(0);"
	formButtonSubmit.onclick = function () { 
		let form = document.getElementById("truck_form");
		let data = new FormData(form);
		let truck = new Truck(data.get('x-size'),
			data.get('y-size'),
			data.get('delay'),
			data.get('type'),
			data.get('radius'));
		form.reset();
		trucks.push(truck);
		formButtonToggle();
	}
	form.reset();
	formButtonToggle();
	formButton.onclick = function (){ formButtonToggle()} ;
	formCloseButton.onclick = function() { formButtonToggle()};
}

function formButtonToggle()
{
	let form = document.getElementById("truck_form");
	if(form.style.display == "none") { 
		form.style.display = "block";
	}	
	else {
		form.style.display = "none";
	}
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


class Truck 
{
	constructor(x, y, delay, type, radius)
		{
			this.width = x;
			this.height = y;
			this.delay = delay;
			this.type = type;
			this.radius = radius;
			this.createTruck();
		}

	tryLoadParcel(parcel, topX, topY)
		{ 
			return 0;			
		}
	draw()
	{
		
	}

	createTruck()
	{
		let parking = document.getElementById('trucks_parking');
		let truck = document.createElement('div');
		truck.className = 'truck';
		for(let y = 0; y < this.height; y++)
		{
			let row = document.createElement('div');
			row.className = 'row';
			
			for(let x = 0; x < this.width; x++)
			{
				let cell = document.createElement('div');
				cell.className = 'col';
				row.appendChild(cell);
			}
		truck.appendChild(row);
		}
		parking.appendChild(truck);
	}
}

window.onload = main;

