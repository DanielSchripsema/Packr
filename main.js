//varable declarations
var main;

class Subject
{
	constructor()
	{
		this.observers =[];
	}

	subscribe(object)  
	{    
		console.log(object);
		this.observers.push(object)  
	}  

	unsubscribe(fnToRemove)  
	{    
		this.observers = this.observers.filter( fn => {      
			 if (fn != fnToRemove)        
			       return fn    
		})  
	}  

	notify()  
	{    
		console.log('nice!');
	this.observers.forEach( object => {
		 console.log(object);
		 object.call();
		})  
	}
}

class TruckModel extends Subject
{
	constructor(x, y, delay, type, radius)
		{
			super();
			this.width = x;
			this.height = y;
			this.delay = delay;
			this.type = type;
			this.radius = radius;
			this.parcels = [];
			console.log(this);
		}

	tryLoadParcel(parcel)
	{ 
		return true;
	}

	honk()
	{
		this.notify();
		console.log("honk honk");
	}

	notify()  
	{    
		console.log('nice!');
	this.observers.forEach( object => {
		 console.log(object);
		 object.call();
		})  
	}

}

class TruckView 
{
	constructor(truckModel) {
		this.draw(truckModel);
	}

	init(truckModel)
	{
		truckModel.subscribe(this);
		console.log('asdlfkjed');
		let parking = document.getElementById('trucks_parking');
		parking.addEventListener('click', truckModel.bind(truckModel), false);
		let boxes = document.querySelectorAll('.col');
		boxes.forEach(box => {
		    box.addEventListener('dragenter', this.dragEnter)
		    box.addEventListener('dragover', this.dragOver);
		    box.addEventListener('dragleave', this.dragLeave);
		    box.addEventListener('drop', this.drop);
		});

	}

	draw()
	{
		let parking = document.getElementById('trucks_parking');
		let truck = document.createElement('div');
		//truck.id = truckCount++;
		truck.className = 'truck';
		for(let y = 0; y < this.truck.height; y++)
		{
			let row = document.createElement('div');
			row.className = 'row';
			row.id = y;
			for(let x = 0; x < this.truck.width; x++)
			{
				let cell = document.createElement('div');
				cell.className = 'col';
				cell.id = x;
				row.appendChild(cell);
			}
		truck.appendChild(row);
		}
		parking.appendChild(truck);
//		trucks[truckCount] = this;
		
	}

	call() 
	{
		let parking = document.getElementById('trucks_parking');
		parking.style.height = "0px";
	}

	dragEnter(e) {
	    e.target.classList.add('drag-over');
	}

	dragOver(e) {
	    e.preventDefault();
	    e.target.classList.add('drag-over');

	}

	dragLeave(e) {
	    e.preventDefault();
	    e.target.classList.remove('drag-over');

	}

	drop(e) {
	    e.preventDefault();
		e.stopPropagation
	    e.target.classList.remove('drag-over');

	    // get the draggable element
	    const id = e.dataTransfer.getData('text/plain');
	    const draggable = document.getElementById(id);
	    //let truck = trucks[parseInt(e.target.parentElement.parentElement.id) + 1];
			
		//fix this it takes a random parcel
	//		let parcel = ps.pop();

	 //   if(truck.tryLoadParcel(parcel))
//		{
//		draggable.classList.add('display-none');
//		e.target.style.backgroundColor = "black";
//		}

//		else alert("The didn't fit");
		//

	}
}

class HallView 
{
	constructor(hallModel) {
		this.draw(hallModel);
		this.displayed = false;
	}

	init(hallModel)
	{
	}

	draw(hallModel)
	{
	}
}

class HallModel 
{
	constructor()
	{
		this.weather = undefined;
		this.trucks = [];
		this.conveyerBelts = [];
	}
}

class LocationView 
{
	constructor(locationModel) {
		this.primaryHall.displayed = true;
		this.draw(locationModel);

	}

	init(locationModel)
	{
	}

	draw(locationModel)
	{
	}

	switchHalls(){

	}
}

class LocationModel
{
	constructor()
	{
		this.weather = undefined;
		this.primaryHall = new HallModel();
		this.secondayHall = new HallModel();
	}
}

class ConveyerBeltModel
{
	constructor()
	{
		this.parcels = []; 
	}
}


class ConveyerBeltView
{
	constructor(mainController) {
		this.draw(mainController);
	}

	init(mainController)
	{
	}

	draw(mainController)
	{
	}
}


class MainController 
{
	constructor()
	{
		this.model = new LocationModel();
		this.view = new LocationView(this.model);
	}
}

window.onload = () => {
	main = new MainController();
}
