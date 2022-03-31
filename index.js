const conveyerbelt = document.getElementById('conveyerBelt1');
const boxVertical = document.querySelector('.boxVertical');
const pickUpBox = document.querySelector('.pickUpBox');
const conveyerbeltWidth = conveyerbelt.offsetWidth;    
const nlCoardinates = { lat: 52, lon: 5};
var conveyerbeltHeight = boxVertical.offsetHeight + 60;

let currentCords = nlCoardinates;
var conveyerbeltHeight = boxVertical.offsetHeight + 60;
let conveyerIDAmount = 2;
let ps = [];
let boxVerticalArray = [];
let readyBoxes = [];
let pickUpIsFull = true;
let truckCount = 0;
let parcelCount = 0;
let loopBelt = 1;


const shapes = ["box", "straightBox", "TBox", "LBox", "SkewBox"]; 
const transportTypes = ["cold", "volatile", "general", "pallets", "courier"]; 
//idee array lopende banden die elke keer als een lopende band wordt toegevoegd de array met een vergroot en verwijderd een weg haald 
//bij pakketjes aanmaken loopt hij over elke band in de array en voegt die er een toe 

import WeatherAPI, {getData as getWeatherData, getWeather} from './WeatherAPI.js'
const weatherAPI = new WeatherAPI();

function main() {
	initTruckForm();	
	initPackageForm();
	setInterval(createPackage, 50);
	setInterval(conveyerRoll, 10);
	initGUI();
	let trucks = [];
	localStorage.setItem("trucks", JSON.stringify(trucks));
	getWeatherData(nlCoardinates.lon, nlCoardinates.lat);
}

function initGUI(){

	let switchHallBtn = document.getElementById("hall-switch-btn");
	let addConveyerBeltBtn = document.getElementById("add-conveyerbelt-btn");
	let removeConveyerBeltBtn = document.getElementById("remove-conveyerbelt-btn");
	addConveyerBeltBtn.addEventListener("click", addConveyerBelt);
	removeConveyerBeltBtn.addEventListener("click", removeConveyerBelt);

	let primaryHall = document.getElementById("primary-hall");
	let secondaryHall = document.getElementById("secondary-hall");
	primaryHall.style.display = 'block';
	secondaryHall.style.display = 'none';
	switchHallBtn.addEventListener('click', function(){
		let primaryHall = document.getElementById("primary-hall");
	let secondaryHall = document.getElementById("secondary-hall");
		console.log(primaryHall);

		if(primaryHall.style.display == 'block'){
			primaryHall.style.display = 'none';	
			secondaryHall.style.display = 'block';	
		}
		else {
			primaryHall.style.display = 'block';	
			secondaryHall.style.display = 'none';	

		}
	});
	initWeatherForm();
}



function initWeatherForm(){
	let form = document.getElementById("Temp-form");
	form.action="javascript:void(0);"
	form.addEventListener('submit', function(event){
	event.preventDefault();
	currentCords.latitude = document.getElementById('latitude').value
	currentCords.longitude = document.getElementById('longitude').value
        getWeatherData(currentCords.lon , currentCords.lat);
	});
}


function addConveyerBelt() { 
conveyerbeltHeight = boxVertical.offsetHeight + 150; 
var ConveyerBelt = document.createElement("div"); 
ConveyerBelt.classList.add('conveyer-belt'); 
ConveyerBelt.setAttribute('id','conveyerBelt' + conveyerIDAmount)
conveyerIDAmount++;
conveyerPlace.appendChild(ConveyerBelt) 
}


function removeConveyerBelt() {
if(conveyerPlace.children.length > 1){
  conveyerbeltHeight = boxVertical.offsetHeight - 150;
  conveyerPlace.removeChild(conveyerPlace.lastChild);
  conveyerIDAmount--;
  loopBelt--;
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
      let RandomTransportType =  transportTypes[Math.floor(Math.random() * transportTypes.length)];
      let randomShape =  shapes[Math.floor(Math.random() * shapes.length)];
      const img = createElement('img');
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
	 pickupBoxItem.innerHTML = "Package = Type: " + doosNaam.transportType +
		" | Shape: " ;
	 var pickupBoxItemImg = document.createElement('img');
	 pickupBoxItemImg.className = "pickup-shape"
	 pickupBoxItemImg.src = getImageSRC(doosNaam.shape);
	 pickupBoxItem.appendChild(pickupBoxItemImg);


	 pickupBoxItem.draggable = true;
	 pickupBoxItem.addEventListener('dragstart', dragStart);
	 console.log(doosNaam);
	 readyBoxes.push(doosNaam);
	 pickupBoxItem.id = doosNaam.id; 
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
	let transport = document.getElementById('transportkind').value
	let shape = document.getElementById('Shape').value
	const img = createElement('img');
	img.src=getImageSRC(shape);
	img.classList.add( 'move', shape);
	ps.push(new Package(img, shape, transport));
	formButtonToggle(form);
	form.reset();
	});
}

function generateRandomId(){
	return Math.floor(Math.random() * 100000);
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

function getConveyerbelt(){
    if(conveyerIDAmount == 2){
        return conveyerbelt;
    }else{
            if(loopBelt == conveyerIDAmount){
                loopBelt = 1;
            }
            let conveyerbelt = document.getElementById(('conveyerBelt' + loopBelt));
            loopBelt++;
            return conveyerbelt;
    }   
}

 class Package {
      constructor(type, element, TransportType) {
          this.type = type;
          this.x = 0;
          this.y = 0;
	  this.id = generateRandomId(); 
          this.count = 0;
          this.OwnConveyerbelt = getConveyerbelt();
          this.draw();
          this.shape = element;
          this.el = document.querySelector(('.' + element));
          this.offset = 0;
          this.width = this.el.offsetWidth;
          this.height = this.el.offsetWidth;
          this.transportType = TransportType;
	  while(ps.find(x => x.id === this.id) != undefined)
			{
				this.id = generateRandomId(); 	
			}

      }
    draw() {
        this.OwnConveyerbelt.appendChild(this.type); 
    }


    removeHor() {
            this.OwnConveyerbelt.removeChild(this.type);
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
			setTimeout(this.init.bind(this), this.delay * 1000);
		}



	init()
	{
		this.id = generateRandomId();
		let trucks = JSON.parse(localStorage.trucks);
				while(trucks.find(x => x.id === this.id) != undefined)
				{
					this.id = generateRandomId(); 	
				}
			trucks.push(this);
			localStorage.setItem("trucks", JSON.stringify(trucks));
		this.draw();
		let boxes = document.querySelectorAll('.col');
		boxes.forEach(box => {
		    box.addEventListener('dragover', dragOver);
		    box.addEventListener('dragleave', dragLeave);
		    box.addEventListener('drop', drop);
		});
		let truck = document.getElementById(this.id);
		truck.addEventListener('click', this.depart.bind(this));
		truck.classList.add("truck-arriving");
		truck.addEventListener('animationend', () => {
			truck.classList.remove('truck-arriving');
		});
	}

	draw()
	{
		let parking = document.getElementById('trucks_parking');
		let truck = document.createElement('div');
		truck.className = 'truck';
		truck.id = parseInt(this.id);
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
		let truckInfo = document.createElement('div');
		truckInfo.className = "truck-info";
		truckInfo.innerHTML = "Transport: " + this.type;
		truck.appendChild(truckInfo);
		parking.appendChild(truck);
	}
	
	async depart()
	{
		if(await getWeather(currentCords.lon, currentCords.lat) != "Rain"){
			let truck = document.getElementById(this.id);
			truck.classList.add("truck-departing");
			truck.addEventListener('animationend', () => {
				truck.remove();
				//remve truck from local storage
			});
		}
		else{
			alert("Truck: " + this.id + " can't depart it's raining");

		}
	}

}

function tryLoadParcel(truck, parcel, x, y)
{ 
		console.log(truck.type);

	if (truck.type === parcel.transportType && truck.cargo[x, y] == undefined) {
		truck.cargo[x, y] = parcel;
		console.table(truck.cargo);
		return truck;
	}
		return -1;
}


function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');

}

function dragLeave(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

}

function removeCellEvents(cell){
	cell.removeEventListener('dragover', dragOver);
	cell.removeEventListener('dragleave', dragLeave);
	cell.removeEventListener('drop', drop);

}

function drop(e) {
    e.preventDefault();
	e.stopPropagation
    e.target.classList.remove('drag-over');

    // get the draggable element
	console.log(e.target);
    let draggable = document.getElementById(e.target);
    let trucks = JSON.parse(localStorage.trucks);
	let x = e.target.id;
	let y = e.target.parentElement.id;
 	

    let truck = trucks.find(
	   i => i.id === parseInt(e.target.parentElement.parentElement.id));



	let id = parseInt(e.dataTransfer.getData('text/plain'));
	let parcel = readyBoxes.find(i => i.id === id);


	console.log(parcel);
	console.log(truck);

    if(tryLoadParcel(truck, parcel, x, y) != -1)
	{

		removeCellEvents(e.target);
	let pkg = document.createElement("img");
	pkg.className = "truck-load";
	pkg.src = getImageSRC(parcel.shape);

	let node = document.getElementById(id);
	  pickUpBox.removeChild(node);

	e.target.appendChild(pkg);
	}

	else alert("Something happened");
}

window.onload = main;
