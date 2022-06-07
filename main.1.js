var REFRESHRATE = 1000;
var HALL_ONE = '1';
var HALL_TWO = '2';
var INITAL_HALL= '1';
var CURRENT_HALL = 'ch';

function
click()
{
	this.handlers = []
}

click.prototype = 
{
	subscribe: function (fn) {
		this.handlers.push(fn);
	},
	
	unsubscribe: function (fn) {
		this.handlers = this.handlers.filter(
			function (item) {
				if (item !== fn) {
					return item;
				}
			}
		);
	},

	fire: function (o, thisObj) {
		var scope = thisObj || window;
		this.handlers.forEach(function (item) {
			//item.call(scope, o);
			item.update(o);
		});
	}
}


function 
createElement(tag, className) 
{
	const element = document.createElement(tag);
	if (className) element.classList.add(className);
	return element;
}

function 
getElement(selector) 
{
	const element = document.querySelector(selector);
	return element;
}

function
bindElement(element, handler)
{
	element.addEventListener('click', event => {
		handler.add();
	})
}

function
pushBand(bandId, hallId)
{
	let hall = JSON.parse(localStorage.getItem(hallId));		
	if(hall.belts[bandId - 1].x.length > 0 
		&& hall.belts[bandId - 1].x[4] === null)
	{
		   let last = hall.belts[bandId - 1].x.pop();
		   hall.belts[bandId - 1].x.unshift(last);
	       	   localStorage.setItem(hallId, JSON.stringify(hall));
			
	}
}

function 
createHall()
{
	return {
		id: undefined,
		belts: [],
		trucks: []
	}
}

function 
addBelt()
{
	let hallId = localStorage.getItem(CURRENT_HALL);	
	let hall = JSON.parse(localStorage.getItem(hallId));		
	let id = hall.belts.length + 1;
	let jobid = setInterval(function () {pushBand(id, hallId)}, REFRESHRATE);	
	let belt = { id: id, x:Array(5), jobId: jobid };
	hall.belts.push(belt);
	localStorage.setItem(hallId, JSON.stringify(hall));
	drawBelts();
}

function
removeBelt()
{
	let hallId = localStorage.getItem(CURRENT_HALL);	
	let hall = JSON.parse(localStorage.getItem(hallId));		
	let belt = hall.belts.pop();
	localStorage.setItem(hallId, JSON.stringify(hall));
	clearInterval(belt.jobId);
	let vbelt= getElement("#b" + belt.id);
	vbelt.remove();
}


function 
addPackge()
{
	let hallId = localStorage.getItem(CURRENT_HALL);	
	let hall = JSON.parse(localStorage.getItem(hallId));		
	hall.belts[hall.belts.length - 1].x[0] = "package";
	localStorage.setItem(hallId, JSON.stringify(hall));
	drawBelt(hall.belts[hall.belts.length - 1]);
}


function 
drawBelts()
{
	let hallId = localStorage.getItem(CURRENT_HALL);	
	let hall = JSON.parse(localStorage.getItem(hallId));		
	hall.belts.forEach(belt => drawBelt(belt));
}

function 
drawBelt(belt)
{
	let _belt = new Object();
	let temp = getElement("#b" + belt.id)

	if(temp === null){
		_belt = document.createElement('div');
		_belt.className = 'belt';
		_belt.id = "b" + belt.id;
	}
	else {
		_belt = temp;
		_belt.innerHTML = '';
	}

	let belts = document.getElementById('belts');
	let row = document.createElement('div');
	row.className = 'row';
	for(let x = 0; x < belt.x.length; x++)
	{
		let cell = document.createElement('div');
		cell.className = 'col';
		cell.id = x;
		if (belt.x[x] === 'package') cell.style.backgroundColor = 'black';
		row.appendChild(cell);

	}
	_belt.appendChild(row);
	belts.appendChild(_belt);
}

function 
hall()
{
	this.belts = [];
	this.clk = new click();
}

hall.prototype = {
	add: function(a) {
		this.belts.push('aaaa');
		this.clk.fire(this);
	}
}

function gui()
{}


gui.prototype = 
{
	update: function(eventType, mesg)
	{
		console.log(eventType, mesg);				
	}
}

function
initHalls()
{
	
		
			


	let hallOne = createHall();
	let hallTwo = createHall();
	hallOne.id = HALL_ONE;
	hallTwo.id = HALL_TWO;
	localStorage.setItem(HALL_ONE, JSON.stringify(hallOne));		
	localStorage.setItem(HALL_TWO, JSON.stringify(hallTwo));		
	localStorage.setItem(CURRENT_HALL, INITAL_HALL);		
}

function
flipHalls()
{
	let currentHall = localStorage.getItem(CURRENT_HALL);	
	currentHall = currentHall === HALL_ONE ? HALL_TWO : HALL_ONE;
	localStorage.setItem(CURRENT_HALL, currentHall);
	getElement('#hallinfo').textContent = "Hall: " + currentHall;
}

function 
initInterface(el)
{
	this.packr = getElement('#root')
	this.title = createElement('h3')
	this.title.textContent = 'PACKRR'
	this.hallInfo = createElement('h4')
	this.hallInfo.id = "hallinfo";
	this.hallInfo.textContent = "Hall: " + localStorage.getItem(CURRENT_HALL);
	this.addTruckBtn = createElement('button')
	this.addTruckBtn.textContent = 'Add truck'
	this.removeBeltBtn = createElement('button')
	this.removeBeltBtn.textContent = 'Remove Belt'
	this.addBeltBtn= createElement('button')
	this.addBeltBtn.textContent = 'Add belt'
	this.switchHallsBtn = createElement('button')
	this.switchHallsBtn.textContent = 'Switch halls'
	this.trucksDiv = createElement('div')
	this.trucksDiv.id = 'parking'
	this.beltsDiv = createElement('div')
	this.beltsDiv.id = 'belts'

	this.packr.append(
		this.title, 
		this.hallInfo,
		this.addBeltBtn, 
		this.removeBeltBtn,
		this.addTruckBtn, 
		this.switchHallsBtn,
		this.trucksDiv,
		this.beltsDiv
	);

	this.bindElement(this.switchHallsBtn, this.flipHalls);
	this.bindElement(this.addBeltBtn, this.addBelt);
	this.bindElement(this.removeBeltBtn, this.removeBelt);
	this.bindElement(this.addTruckBtn, el);

}

function
main()
{
	var gu = new gui();
	var hal = new hall();

	hal.clk.subscribe(gu);

	initHalls();
	initInterface(hal);
}

window.onload = main(); 
