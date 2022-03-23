const conveyerbelt = document.querySelector('.conveyer-belt');
const boxVertical = document.querySelector('.boxVertical');
const pickUpBox = document.querySelector('.pickUpBox');

var conveyerPlace = document.getElementById("conveyerPlace");
const conveyerbeltWidth = conveyerbelt.offsetWidth;
var conveyerbeltHeight = boxVertical.offsetHeight + 60;

let count = 0;
let ps = [];
let trucks = [];
let boxVerticalArray = [];
let pickUpIsFull = true;
const form = document.getElementById('form');
const shapes = ["box", "straightBox", "TBox", "LBox", "SkewBox"];
const transportTypes = ["Koudtransport", ".Breekbaartransport", "Algemeentransport", "Pallets", "Snelkoerier"];
//idee array lopende banden die elke keer als een lopende band wordt toegevoegd de array met een vergroot en verwijderd een weg haald
//bij pakketjes aanmaken loopt hij over elke band in de array en voegt die er een toe



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


function main() {
	initTruckForm();	
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

