void setup() {
    size(400, 400);
    
}

var click = false;

var gameboard = function(xPos, yPos,xTiles, yTiles){
    this.xTiles = xTiles;
    this.yTiles = yTiles;
    this.xPos = xPos;
    this.yPos = yPos;
    
    this.moves = 0;
    this.Tilewidth = 50;
    
    //Tile Variable
    this.Tile = []; 
    for(var ix = 0; ix < this.xTiles; ix++){
        this.Tile.push([]);
    for(var iy = 0; iy < this.yTiles; iy++){
       this.Tile[ix].push({
           state:false, 
           Tstate:false,
           color:color(34, 105, 34), 
           stateColor:color(34, 105, 34)});
    }}
    //
};   //Defines the object gameboard
gameboard.prototype.draw = function() { 
    //Changes the width of each Tile so it doesn't go out of the canvas
    var maxTiles;
    if(this.xTiles > this.yTiles){maxTiles = this.xTiles;}else{maxTiles = this.yTiles;}
    if(maxTiles > 7){
        this.Tilewidth = (width-50)/(maxTiles);
    }else{this.Tilewidth = 50;}
    console.log(this.yTiles + ">" + this.xTiles);
    console.log(this.xTiles+0 > this.yTiles+0);
    console.log(8 > 30);
    
    //Draws every rectangle
    pushMatrix(); rectMode(CENTER);
    translate(  (this.xTiles*-(this.Tilewidth/2))+200+(this.Tilewidth/2)+this.xPos,  //translate x
                (this.yTiles*-(this.Tilewidth/2))+200+(this.Tilewidth/2)+this.yPos); //translate y
    for(var ix = 0; ix < this.Tile.length; ix++){
    for(var iy = 0; iy < this.Tile[ix].length; iy++){
        if(this.Tile[ix][iy].state) {this.Tile[ix][iy].stateColor = color(0, 255, 0);}
        else                        {this.Tile[ix][iy].stateColor = color(34, 105, 34);}
        
        fill(this.Tile[ix][iy].color); stroke(0, 0, 0); 
        rect(ix*this.Tilewidth, iy*this.Tilewidth, this.Tilewidth, this.Tilewidth);
        
        if(debugMode){
            if(this.Tile[ix][iy].Tstate){fill(255, 0, 0, 200);}
            else                        {fill(170, 0, 0, 50); }
            noStroke();
            ellipse(ix*this.Tilewidth, iy*this.Tilewidth, this.Tilewidth/5, this.Tilewidth/5);
        }
        
    }}
    popMatrix();
};                //Draws the gameboard
gameboard.prototype.activateTile = function(ix, iy){ 
    this.Tile[ix][iy].color = color(0, 102, 0);
    this.Tile[ix][iy].state = !this.Tile[ix][iy].state;
    this.Tile[ix][iy].Tstate = !this.Tile[ix][iy].Tstate;
                
    if(ix-1 >= 0){
        this.Tile[ix-1][iy].color = color(0, 102, 0);
        this.Tile[ix-1][iy].state = !this.Tile[ix-1][iy].state;                    
    }
    if(ix+1 < this.xTiles){
        this.Tile[ix+1][iy].color = color(0, 102, 0);
        this.Tile[ix+1][iy].state = !this.Tile[ix+1][iy].state;                    
    }
    if(iy-1 >= 0){
        this.Tile[ix][iy-1].color = color(0, 102, 0);
        this.Tile[ix][iy-1].state = !this.Tile[ix][iy-1].state;                    
    }
    if(iy+1 < this.yTiles){
        this.Tile[ix][iy+1].color = color(0, 102, 0);
        this.Tile[ix][iy+1].state = !this.Tile[ix][iy+1].state;                    
    }
};  
gameboard.prototype.mouseCheck = function(){                
    for(var ix = 0; ix < this.Tile.length; ix++){
    for(var iy = 0; iy < this.Tile[ix].length; iy++){
        var mouseXPos = mouseX-200-this.xPos+(this.xTiles*(this.Tilewidth/2))-(this.Tilewidth/2);
        var mouseYPos = mouseY-200-this.yPos+(this.yTiles*(this.Tilewidth/2))-(this.Tilewidth/2);
        //mouseXPos = 0;
        if (mouseXPos > (ix*this.Tilewidth)-(this.Tilewidth/2) &&
            mouseXPos < (ix*this.Tilewidth)+(this.Tilewidth/2) &&
            mouseYPos > (iy*this.Tilewidth)-(this.Tilewidth/2) &&
            mouseYPos < (iy*this.Tilewidth)+(this.Tilewidth/2)){
            
            if(click){
                this.activateTile(ix, iy);
                click = false;
                this.moves++;
            }
            else if(this.Tile[ix][iy].state){this.Tile[ix][iy].color = color(155, 255, 155);}
            else                            {this.Tile[ix][iy].color = color(7, 140, 7);}
        }else{
            this.Tile[ix][iy].color = this.Tile[ix][iy].stateColor;
        }
    }}
    
};           //Checks mouse pos & click events
gameboard.prototype.update = function(){
    this.mouseCheck();
    
    this.draw();
};               //Constant updating the gameboard

var board = new gameboard(0, 0, 0, 0);

var newGame = function(xTiles, yTiles){
    board = new gameboard(0, 0, xTiles, yTiles);
    for(var i = floor(random(0.9, xTiles*yTiles*2)); i > 0; i--){
        board.activateTile(floor(random(0, xTiles)), floor(random(0, yTiles)));
    }
};

//Debug comands
newGame(xTiles, yTiles); 



void draw() {
    background(255, 255, 255);
    board.update();
    
    //Debug comands
    fill(0, 0, 0); 
    text("moves: "+board.moves, 30, 380, 500, 50);
    text("debug: "+debugMode, 30, 365, 500, 50);
    //
};

void mouseClicked(){click = true;};
