function GamePiece(id,scene,textcpath,x,z,id,texture,name) {
	this.id = id;
	this.scene = scene;
	this.name = name;
	
	this.x=x;
	this.y=0;
	this.z=z;
	
	this.placed = false;
	this.placed_on_board;
	this.placed_on_floor;
	this.can_move = true;
	
	this.appearance = new CGFappearance(this.scene);
	this.appearance.setAmbient(0.7, 0.7, 0.7, 1);
	this.appearance.setDiffuse(1, 1, 1, 1);
	this.appearance.setSpecular(0.1, 0.1, 0.1, 1);	
	this.appearance.setTexture(texture);
	this.appearance.setTextureWrap('REPEAT', 'REPEAT');
	
	this.animations = [];	
 }
 
GamePiece.prototype = Object.create(CGFobject.prototype);
GamePiece.prototype.constructor = GamePiece;

GamePiece.prototype.display = function(){
	// Please reimplement me on instances of this class.
}

		///////////////
		//  Getters	 //
		///////////////

GamePiece.prototype.getid = function(){
	return this.id;
}

GamePiece.prototype.objectName = function(){
	return this.name;
}

		//////////////////////////
		//	Animation Functions //
		//////////////////////////
		
GamePiece.prototype.updateAnimations = function(currTime){
	for(var i = 0; i < this.animations.length; i++)
		 this.animations[i].updateMatrix(currTime);
}
GamePiece.prototype.spawnAnimation = function(){
	var ControlPoints = []; 
	ControlPoints.push([this.x,2,this.z]);
	ControlPoints.push([this.x,0,this.z]);
	var newAnimation = new LinearAnimation(this.id, 2, 0, "linear",ControlPoints);
	this.animations.push(newAnimation);
	
}
GamePiece.prototype.AnimateTowards = function(newX, newY, newZ, AnimationTimespan, TimeStart){
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

