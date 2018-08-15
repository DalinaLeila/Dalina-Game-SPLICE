function Obstacle(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y; 
  this.color = "#033860"
  this.radius = 25;

  this.update = function(){

    ctx.beginPath();
    ctx.moveTo(this.x+this.radius, this.y);
    ctx.lineTo(this.x+this.width-this.radius, this.y);
    ctx.quadraticCurveTo(this.x+this.width, this.y, this.x+this.width, this.y+this.radius);
    ctx.lineTo(this.x+this.width, this.y+this.height-this.radius);
    ctx.quadraticCurveTo(this.x+this.width, this.y+this.height, this.x+this.width-this.radius, this.y+this.height);
    ctx.lineTo(this.x+this.radius, this.y+this.height);
    ctx.quadraticCurveTo(this.x, this.y+this.height, this.x, this.y+this.height-this.radius);
    ctx.lineTo(this.x, this.y+this.radius);
    ctx.quadraticCurveTo(this.x, this.y, this.x+this.radius, this.y);
    
    var grd = ctx.createRadialGradient(75, 80, 5, 90, 60, 400);
    grd.addColorStop(1, this.color);
    grd.addColorStop(0, 'yellow');
    ctx.fillStyle = grd;
    ctx.fill(); 
  }

  this.left   = function() { return this.x                 }
  this.right  = function() { return (this.x + this.width)  }
  this.top    = function() { return this.y                 }
  this.bottom = function() { return (this.y + this.height) }
  
} 


  