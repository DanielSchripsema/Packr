const boxVertical = document.querySelector('.boxVertical');
//const pickUpBox = document.querySelector('.pickUpBox');
const conveyerbelt = document.getElementById('conveyerBelt1');

const conveyerbeltWidth = conveyerbelt.offsetWidth;    
const nlCoardinates = { lat: 52, lon: 5};
const halls = ["primary-hall", "secondary-hall"];
let currentHall;
var conveyerbeltHeight = boxVertical.offsetHeight + 60;

let currentCords = nlCoardinates;
var conveyerbeltHeight = boxVertical.offsetHeight + 60;
let conveyerIDAmount = 1;
let ps = [];
let boxVerticalArray = [];
ps[0] = [];
ps[1] = [];
boxVerticalArray[0] = [];
boxVerticalArray[1] = [];
let readyBoxes = [];
let pickUpIsFull = true;
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
	currentHall = 0;
	initGUI();
	let trucks = [];
	localStorage.setItem("trucks", JSON.stringify(trucks));
	getWeatherData(nlCoardinates.lon, nlCoardinates.lat);
        setInterval(createPackage, 5000, halls[0]);
	setInterval(createPackage, 5000, halls[1]);
        setInterval(conveyerRoll, 1000, halls[0]);
        setInterval(conveyerRoll, 1000, halls[1]);
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

		if(currentHall == 0){
			primaryHall.style.display = 'none';	
			secondaryHall.style.display = 'block';	
			currentHall = 1;
		}
		else {
			primaryHall.style.display = 'block';	
			secondaryHall.style.display = 'none';	
			currentHall = 0;
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

function getConveyerbelt(hallId){
            if(loopBelt == conveyerIDAmount){
                loopBelt = 1;
            }
	    console.log(hallId);
	    let hall = document.getElementById(hallId);
	    let belt = hall.querySelector("#conveyerBelt" + 1);
            loopBelt++;
            return belt;
}

 class Package {
      constructor(type, element, TransportType, hallId) {
          this.type = type;
          this.x = 0;
          this.y = 0;
	  this.id = generateRandomId(); 
          this.count = 0;
          this.conveyerbelt = getConveyerbelt(hallId);
          this.draw();
	  this.hallId = hallId;
          this.shape = element;
          this.el = document.querySelector(('.' + element));
          this.offset = 0;
          this.width = this.el.offsetWidth;
          this.height = this.el.offsetWidth;
          this.transportType = TransportType;
	  while(ps.at(hallId).find(x => x.id === this.id) != undefined)
			{
				this.id = generateRandomId(); 	
			}

      }
    draw() {
        this.conveyerbelt.appendChild(this.type); 
    }


    removeHor(hall) {
            this.conveyerbelt.lastChild.remove;
            ps.at(this.hallId).shift();
             boxVerticalArray.at(this.hallId).push(this);
	    let boxV = hall.querySelector(".boxVertical");
            boxV.appendChild(this.type);
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
