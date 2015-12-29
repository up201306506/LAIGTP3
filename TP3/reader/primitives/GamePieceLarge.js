function GamePieceLarge(scene,textcpath, x, z, id, texture){
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
	
	this.innerbody = new CylinderPrimitive(scene, 24, 3, 0.15, .25, .25);
	this.outterbody = new CylinderPrimitive(scene, 24, 3, 0.15, .4, .4);
	this.ring = new RingPrimitive(scene, 24, 0.4, 0.25);
	
	this.animations = [];
	/*primeira animação*/
	var ControlPoints = []; 
	ControlPoints.push([this.x,2,this.z]);
	ControlPoints.push([this.x,0,this.z]);
	var newAnimation = new LinearAnimation(id, 2, 0, "linear",ControlPoints);
	this.animations.push(newAnimation);
}


GamePieceLarge.prototype = Object.create(CGFobject.prototype);
GamePieceLarge.prototype.constructor = GamePieceLarge;


GamePieceLarge.prototype.display = function()
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
		this.scene.scale(-1,1,1);
		this.innerbody.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.outterbody.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.rotate(180*degToRad,1,0,0);
		this.scene.translate(0,0,-0.15);
		this.ring.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.ring.display();
		this.scene.popMatrix();
		
		
	this.scene.popMatrix();
}

GamePieceLarge.prototype.getid = function(){
	return this.id;
}
GamePieceLarge.prototype.objectName = function(){
	return "GamePieceLarge";
}

GamePieceLarge.prototype.updateAnimations = function(currTime){
	for(var i = 0; i < this.animations.length; i++)
		 this.animations[i].updateMatrix(currTime);
}

GamePieceLarge.prototype.spawnAnimation = function(){
	var ControlPoints = []; 
	ControlPoints.push([this.x,2,this.z]);
	ControlPoints.push([this.x,0,this.z]);
	var newAnimation = new LinearAnimation(this.id, 2, 0, "linear",ControlPoints);
	this.animations.push(newAnimation);
	
}


GamePieceLarge.prototype.AnimateTowards = function(newX, newY, newZ, AnimationTimespan, TimeStart){
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

