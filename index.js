const conveyerbelt = document.querySelector('.conveyer-belt');
const boxVertical = document.querySelector('.boxVertical');
const pickUpBox = document.querySelector('.pickUpBox');
const conveyerbeltWidth = conveyerbelt.offsetWidth;    
var conveyerbeltHeight = boxVertical.offsetHeight + 60;

let count = 0;
let ps = [];
let trucks = [];
let boxVerticalArray = [];
let pickUpIsFull = true;
let readyParcels =[];
let truckCount = 0;
let parcelCount = 0;

const shapes = ["box", "straightBox", "TBox", "LBox", "SkewBox"]; 
const transportTypes = ["Koudtransport", ".Breekbaartransport", "Algemeentransport", "Pallets", "Snelkoerier"]; 
//idee array lopende banden die elke keer als een lopende band wordt toegevoegd de array met een vergroot en verwijderd een weg haald 
//bij pakketjes aanmaken loopt hij over elke band in de array en voegt die er een toe 


function main() {
	initTruckForm();	
	initPackageForm();
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
                      addDoosToOphaalbak(p); 
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
          // \\ -> \
      //hieronder functie maken create package
      // const type = createElement('div');
      const img = createElement('img');
      // img.src="images\\green-zig-zag.png"
      img.src=getImageSRC(randomShape);
      img.classList.add( 'move', randomShape);
      ps.push(new Package(img, randomShape, RandomTransportType));
      }
  }
  
function getImageSRC(shape){
let shapeSRC;
switch(shape) {
  case "box":
      return shapeSRC = "images\\white-square.png"
  case "straightBox":
      return shapeSRC ="images\\blue-rectangle.png"
  case "TBox":
      return shapeSRC = "images\\red-t.png"
  case "LBox":
      return shapeSRC = "images\\orange-l.png"
  case "SkewBox":
      return   shapeSRC = "images\\green-zig-zag.png"
  default:
    return shapeSRC = "images\\blue-rectangle.png";
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
	 pickupBoxItem.classList.add('pickupBoxItem');
	 pickupBoxItem.innerHTML = doosNaam.shape + " " + doosNaam.transportType;
	 pickupBoxItem.draggable = true;
	 pickupBoxItem.addEventListener('dragstart', dragStart);
	 pickupBoxItem.id = "pickUpBox" + parcelCount++;
	 pickUpBox.append(pickupBoxItem);
}


function initPackageForm()
{
	let formButton = document.getElementById("package-form-btn");
	//let formCloseButton = document.getElementById("package-form-close-btn");
	let form = document.getElementById("package-form");
	form.action="javascript:void(0);"
	//formCloseButton.onclick = function () {formButtonToggle(form)};
	formButton.onclick = function (){ formButtonToggle(form)};
	formButtonToggle(form);
	form.reset();
	form.addEventListener('submit', function(event){
	event.preventDefault();
	//check dat er niet al te veel op de rolbank liggen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//twee arrays vertical en horizontal bij elkaar tellen en een bepaald aantal niet te laten bereieken ik denk dat de error daarvandaan komt
	let transport = document.getElementById('transportkind').value
	let shape = document.getElementById('Shape').value
	//functie create package hier gebruiken uiteindelijk hieronder
	const img = createElement('img');
	// img.src="images\\green-zig-zag.png"
	img.src=getImageSRC(shape);
	img.classList.add( 'move', shape);
	ps.push(new Package(img, shape, transport));
	formButtonToggle(form);
	form.reset();
	});
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
		truck.count++;
		formButtonToggle(form);
	}
	form.reset();
	formButtonToggle(form);
	formButton.onclick = function (){ formButtonToggle(form)};
	formCloseButton.onclick = function() { formButtonToggle(form)};
}

function formButtonToggle(form)
{
	if(form.style.display == "none") { 
		form.style.display = "inline-block";
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
          this.shape = element;
          this.el = document.querySelector(('.' + element));
          this.offset = 0;
          this.width = this.el.offsetWidth;
          this.height = this.el.offsetWidth;
          this.transportType = TransportType;
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


function dragStart(e) {
	e.dataTransfer.setData('text/plain', e.target.id);
	e.target.classList.add('hide');
	   setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
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
			this.cargo = [];
			this.createTruck();
		}

	tryLoadParcel(parcel)
	{ 
		return true;
	}
		

	createTruck()
	{
		let parking = document.getElementById('trucks_parking');
		let truck = document.createElement('div');
		truck.id = truckCount++;
		truck.className = 'truck';
		for(let y = 0; y < this.height; y++)
		{
			let row = document.createElement('div');
			row.className = 'row';
			row.id = y;
			for(let x = 0; x < this.width; x++)
			{
				let cell = document.createElement('div');
				cell.className = 'col';
				cell.id = x;
				row.appendChild(cell);
			}
		truck.appendChild(row);
		}
		parking.appendChild(truck);
		trucks[truckCount] = this;
		let boxes = document.querySelectorAll('.col');

		boxes.forEach(box => {
		    box.addEventListener('dragenter', dragEnter)
		    box.addEventListener('dragover', dragOver);
		    box.addEventListener('dragleave', dragLeave);
		    box.addEventListener('drop', drop);
		});
	}
}


function dragEnter(e) {
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');

}

function dragLeave(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

}

function drop(e) {
    e.preventDefault();
	e.stopPropagation
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    let truck = trucks[parseInt(e.target.parentElement.parentElement.id) + 1];
		
	//fix this it takes a random parcel
		let parcel = ps.pop();

    if(truck.tryLoadParcel(parcel))
	{
	draggable.classList.add('display-none');
	e.target.style.backgroundColor = "black";
	}

	else alert("The didn't fit");
}

window.onload = main;

