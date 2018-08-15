function Player(x,y,width,height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.player1 = new Image();
  this.player1.src = "./images/player1.png";

  this.update = function(){
    ctx.drawImage(this.player1,this.x,this.y,this.width,this.height);
  }
  
  this.left   = function() { return this.x                 }
  this.right  = function() { return (this.x + this.width)  }
  this.top    = function() { return this.y  + 5            }
  this.bottom = function() { return (this.y + this.height - 10) }
  
  this.crashWith = function(obstacle){
      return !((this.bottom() < obstacle.top())    ||
               (this.top()    > obstacle.bottom()) ||
               (this.right()  < obstacle.left())   ||
               (this.left()   > obstacle.right())) 
    }
}


