
		

function createElement(tag, className) {
	const element = document.createElement(tag)
	if (className) element.classList.add(className)
	return element
}
function getElement(selector) {
	const element = document.querySelector(selector)
	return element
}

class Truck{
	constructor({id, x, y, delay, type, radius, boxes}){
		this.id= id;
		this.x= x;
		this.y= y;
		this.delay= delay;
		this.type= type;
		this.radius= radius;
		this.hallId= hallId;
		this.boxes= boxes;
		}
	//addPackage(package){}
	

	draw(){

	}
	
}

class Belt{ 
	constructor({id,x, y, boxes}){
		this.id= id;
		this.x= x;
		this.y= y;
		this.boxes= boxes;
	}
	tryPop(){}
	tryPush(){}
	tryMove(){}
}


class Hall{
	constructor({id, belts, trucks}){
		this.id = id;
		this.belts= belts;
		this.trucks= trucks;
	}

	draw(){

	}
}

class Engine{
    constructor() {
	    this.halls= [];
	    this.halls.push( new Hall('1', [], []));
	    this.halls.push( new Hall('2', [], []));
	    localStorage.setItem('halls', JSON.stringify(this.halls));
	    localStorage.setItem('current_hall', 1);
	    this.initGUI();
	    this.bindSwitchHallsBtn(this.switchHalls);
	    this.bindSwitchHallsBtn(this.redrawGUI);
	}

	initGUI(){
		this.packr = getElement('#root')
		this.title = createElement('h3')
		this.title.textContent = 'PACKRR'
		this.hallInfo = createElement('h4')
		this.hallInfo.id = "hallinfo";
		this.hallInfo.textContent = "Hall: " + localStorage.getItem('current_hall');
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
	}

	bindAddBeltBtn(handler) {
		this.addBeltBtn.addEventListener('click', event => {
			handler()
		})
	}

	bindRemoveBeltBtn(handler)  {
		this.removeBeltBtn.addEventListener('click', event => {
			handler()
		})
	}

	bindSwitchHallsBtn(handler)  {
		this.switchHallsBtn.addEventListener('click', event => {
			handler()
		})
	}

	switchHalls(){
		let currentHall = localStorage.getItem('current_hall') == 1 ? 2 : 1;
		localStorage.setItem('current_hall', currentHall);
		}

	redrawGUI(){
		let currentHall = localStorage.getItem('current_hall');
		getElement('#hallinfo').textContent = "Hall: " + currentHall;

	}


}




function main(){
	var packrEngine = new Engine();
	packrEngine.start();
}

window.onload = main();
