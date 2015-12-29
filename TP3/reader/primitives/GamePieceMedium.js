function GamePieceMedium(scene,textcpath, x, z, id, texture){
	this.scene = scene;
	this.x=x;
	this.y=0;
	this.z=z;
	
	this.id=id;
	this.placed = false;
	this.placed_on_board;
	this.placed_on_floor;
	
	
	this.appearance = new CGFappearance(this.scene);
	this.appearance.setAmbient(0.7, 0.7, 0.7, 1);
	this.appearance.setDiffuse(1, 1, 1, 1);
	this.appearance.setSpecular(0.1, 0.1, 0.1, 1);	
	this.appearance.setTexture(texture);
	this.appearance.setTextureWrap('REPEAT', 'REPEAT');
	
	this.body = new CylinderPrimitive(scene, 24, 3, 0.15, .3, .3);
	this.bot = new CircleTop(scene, 24);
	this.top = new CircleTop(scene, 24);
	
	this.animations = [];
	/*primeira animação*/
	var ControlPoints = []; 
	ControlPoints.push([this.x,2,this.z]);
	ControlPoints.push([this.x,0,this.z]);
	var newAnimation = new LinearAnimation(id, 2, 0, "linear",ControlPoints);
	this.animations.push(newAnimation);
}


GamePieceMedium.prototype = Object.create(CGFobject.prototype);
GamePieceMedium.prototype.constructor = GamePieceMedium;


GamePieceMedium.prototype.display = function()
{
	this.scene.pushMatrix();
	this.appearance.apply();
	
	if(this.animations.length > 0)
	{
		var animationmatrix = this.animations[this.animations.length - 1].getMatrix();
		this.scene.multMatrix(animationmatrix);
	}
	
	
	this.scene.rotate(-90*degToRad,1,0,0);
	
		this.scene.pushMatrix();
		this.body.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.scale(0.3,0.3,1);
		this.bot.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.scale(0.3,0.3,1);
		this.scene.rotate(180*degToRad,0,1,0);
		this.scene.translate(0,0,-0.15);
		this.top.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
}

GamePieceMedium.prototype.getid = function(){
	return this.id;
}

GamePieceMedium.prototype.objectName = function(){
	return "GamePieceMedium";
}

GamePieceMedium.prototype.updateAnimations = function(currTime){
	for(var i = 0; i < this.animations.length; i++)
		 this.animations[i].updateMatrix(currTime);
}

GamePieceMedium.prototype.spawnAnimation = function(){
	var ControlPoints = []; 
	ControlPoints.push([this.x,2,this.z]);
	ControlPoints.push([this.x,0,this.z]);
	var newAnimation = new LinearAnimation(this.id, 2, 0, "linear",ControlPoints);
	this.animations.push(newAnimation);
	
}

GamePieceMedium.prototype.AnimateTowards = function(newX, newY, newZ, AnimationTimespan, TimeStart){
	var ControlPoints = [];
	ControlPoints.push([this.x, this.y, this.z]);
	ControlPoints.push([this.x, 3, this.z]);
	ControlPoints.push([newX, 3, newZ]);
	ControlPoints.push([newX, newY, newZ]);
	var newAnimation = new LinearAnimation(this.id, AnimationTimespan, TimeStart, "linear",ControlPoints);	
	newAnimation.Matriz_Animation = this.animations[this.animations.length - 1].getMatrix();
	this.animations.push(newAnimation);
	
	this.x = newX;
	this.y = newY;
	this.z = newZ;
}

