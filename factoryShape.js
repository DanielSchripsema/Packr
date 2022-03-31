const ShapeL = document.getElementById('conveyerPlace');
class factoryShape{
    // ["box", "straightBox", "TBox", "LBox", "SkewBox"]; 



    getShape(randomShape){
        let shapeSRC;
        switch(randomShape) {
          case "box":
              return shapeSRC = this.createSquare();
          case "straightBox":
              return shapeSRC = this.createRectangle();
          case "TBox":
              return shapeSRC = this.createT();
          case "LBox":
              return shapeSRC = this.createL();
          case "SkewBox":
              return   shapeSRC = this.createZigZag();
          default:
            return shapeSRC = "images\\blue-rectangle.png";
        }
    }

    createL(){
        for(let i = 0; i < 3; i++){
            var divRow = document.createElement("div"); 
            divRow.classList.add('row');
            if(i == 2){
                this.makeColAmount(3, divRow);
                // ShapeL.appendChild(divRow)
            }else{
                this.makeColAmount(1, divRow);
                // ShapeL.appendChild(divRow)
    
            }
        }
        return divRow;
    }

    createSquare(){
        var divRow = document.createElement("div"); 
        divRow.classList.add('row');
        this.makeColAmount(1, divRow);
        return divRow;
    }

    createZigZag(){
        for(let i = 0; i < 2; i++){
            var divRow = document.createElement("div"); 
            divRow.classList.add('row');
            if(i == 0){
                var div = document.createElement("div");
                div.classList.add('col'); 
                div.style.marginLeft= "33px";    
                divRow.appendChild(div);
                this.makeColAmount(1, divRow);
            }else{
                this.makeColAmount(2, divRow);
            }

            return divRow;
        }
        
    }


    createRectangle(){
        var divRow = document.createElement("div"); 
		divRow.classList.add('row'); 
        this.makeColAmount(4, divRow);
        return divRow;
    }


    createT(){
	for(let i = 0; i < 2; i++){
		var divRow = document.createElement("div"); 
		divRow.classList.add('row'); 
            if(i == 1){
                var div = document.createElement("div");
                div.classList.add('col'); 
                div.style.marginLeft = "33px";        
                divRow.appendChild(div);
            }else{
                this.makeColAmount(3, divRow);
            }
            return divRow;
	}

    }

    makeColAmount(amount, row){
        for(let i = 0; i < amount; i++){
            var div = document.createElement("div"); 
            div.classList.add('col'); 
            row.appendChild(div)
        }
    }


}
export default factoryShape;