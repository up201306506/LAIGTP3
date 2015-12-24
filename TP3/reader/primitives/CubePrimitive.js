function CubePrimitive(scene){
	this.scene = scene;
	this.square = new SquarePrimitive(scene, -0.5, 0.5, 0.5, -.5);
}


CubePrimitive.prototype = Object.create(CGFobject.prototype);
CubePrimitive.prototype.constructor = CubePrimitive;


CubePrimitive.prototype.display = function()
{
	var newMat = mat4.create();
	
	//Top
	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.rotate(newMat, newMat, -90*degToRad, [1,0,0]);
	mat4.translate(newMat, newMat, [0,0,.5]);
	this.scene.multMatrix(newMat);
	this.square.display();
	this.scene.popMatrix();
	
	//Bottom
	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.rotate(newMat, newMat, 90*degToRad, [1,0,0]);
	mat4.translate(newMat, newMat, [0,0,.5]);
	this.scene.multMatrix(newMat);
	this.square.display();
	this.scene.popMatrix();
	
	//Front
	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [0,0,.5]);
	this.scene.multMatrix(newMat);
	this.square.display();
	this.scene.popMatrix();
	
	//Back
	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.rotate(newMat, newMat, 180*degToRad, [1,0,0]);
	mat4.translate(newMat, newMat, [0,0,.5]);
	this.scene.multMatrix(newMat);
	this.square.display();
	this.scene.popMatrix();
	

	//Left
	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.rotate(newMat, newMat, -90*degToRad, [0,1,0]);
	mat4.translate(newMat, newMat, [0,0,.5]);
	this.scene.multMatrix(newMat);
	this.square.display();
	this.scene.popMatrix();
	
	//Right
	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.rotate(newMat, newMat, 90*degToRad, [0,1,0]);
	mat4.translate(newMat, newMat, [0,0,.5]);
	this.scene.multMatrix(newMat);
	this.square.display();
	this.scene.popMatrix();
	

	
}
