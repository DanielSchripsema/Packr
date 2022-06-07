const SKEW_MAP = [  
	[0, 1, 1, 0],
	[1, 1, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]	
];

const STRAIGHT_MAP= [  
	[1, 1, 1, 1],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]	
];

const SQUARE_MAP= [  
	[1, 1, 0, 0],
	[1, 1, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]	
];

const T_MAP= [  
	[1, 1, 1, 0],
	[0, 1, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]	
];

const L_MAP= [  
	[0, 0, 1, 0],
	[1, 1, 1, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]	
];

var time = 0;

function main(){
	 document.getElementById("get-package-btn").onclick = function() {createPackage()};
	setInterval(timerFunc, 1000);
	let timer = document.getElementById('timer');
	timer.innerHTML = time;

}

function timerFunc(){
	let timer = document.getElementById('timer');
	time++;
	timer.innerHTML = time;

}


function getReadable() {
	return SQUARE_MAP;
}

let block = getReadable();
//draw belt fixed size


function createPackage(){
	let parking = document.getElementById('parking');
		let truck  = document.createElement('div');
		truck.className = 'truck';
		for(let y = 0; y < 4; y++)
		{
			let row = document.createElement('div');
			row.className = 'row';
			row.id = y;
			for(let x = 0; x < 4; x++)
			{
				let cell = document.createElement('div');
				cell.className = 'col';
				cell.id = x;
				if(block[y][x] == 1)
				cell.classList.add('box');
				row.appendChild(cell);

			}
		truck.appendChild(row);
				}
		let truckInfo = document.createElement('div');
		truck.appendChild(truckInfo);
		parking.appendChild(truck);
}


window.onload = main;
