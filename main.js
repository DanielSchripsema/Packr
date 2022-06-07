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
bindElement(element, obj)
{
	element.addEventListener('click', event => {
		obj.call(_this);
	})
}

function pushBand(bandId, hallId)
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
belt()
{
	this.x = new Array(5);
}



function 
hall()
{
	this.belts = [];
	this.clk = new click();
}

hall.prototype = {
	addBelt: function() {
		this.belts.push(new belt());
		this.clk.fire(this);
	},
	removeBelt: function() {
		this.belts.pop();
		this.clk.fire(this);
	},

	init: function(obj) {
		this.clk.subscribe(obj.gui.vhall);
	}
}

function 
vbelt(belt)
{
	this.draw(belt);
}

vbelt.prototype = {
	draw: function(belt) {

		let _belt = document.createElement('div');
		_belt.className = 'belt';
		_belt.id = "b" + belt.id;

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
}


function
vhall(hall)
{
	this.draw(hall);
}


vhall.prototype = {
	draw: function(hall){
		Array.from(document.getElementsByClassName('belt'))
			.forEach(belt => { belt.remove(); });
		hall.belts.forEach(belt => new vbelt(belt));
	},

	update: function(obj){
		console.log('updating hall');
		this.draw(obj);
	}
}

function gui(obj)
{
	this.init(obj);
	this.vhall = new vhall(obj.getCurrentHall());
}

gui.prototype = 
{
	draw: function(hall)
	{
		var elemDiv = document.createElement('div');
		elemDiv.innerHTML = hall;
		document.body.appendChild(elemDiv);
	},
	update: function(eventType, mesg)
	{
		console.log(eventType, mesg);				
	},

	init: function(obj)
	{
	this.hall = obj.hall;
	this.packr = getElement('#root')
	this.title = createElement('h3')
	this.title.textContent = 'PACKRR'
	this.hallInfo = createElement('h4')
	this.hallInfo.className = "hallinfo";
	this.hallInfo.textContent = "Hall: 1";
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


	bindElement(this.switchHallsBtn, obj.switchHalls);
	bindElement(this.addBeltBtn, obj.addBelt);
	bindElement(this.removeBeltBtn, obj.removeBelt);
	//this.bindElement(this.addTruckBtn, el);
	},
	
	update: function(obj){
		let hallinfo = getElement(".hallinfo");
		this.hallInfo.textContent = "Hall: " + (obj.currentHallIndex + 1);
	}
}

function
stackr()
{
	this.clk = new click();
	this.halls = new Array(new hall(), new hall());
	this.currentHallIndex = 0; 
	this.gui = new gui(this);
	this.clk.subscribe(this.gui);
	this.getCurrentHall().init(this);
}

stackr.prototype = 
{
	switchHalls: function()
	{	
		this.currentHall = this.currentHallIndex === 0 ? 
			this.currentHallIndex = 1:
			this.currentHallIndex = 0;
		this.clk.fire(this);
	},

	addBelt: function()
	{
		this.halls[this.currentHallIndex].addBelt();
	},

	removeBelt: function()
	{
		this.getCurrentHall().removeBelt();
	},

	getCurrentHall: function ()
	{
		return this.halls[this.currentHallIndex];
	}
}

let _this;
window.onload = _this = new stackr(); 

