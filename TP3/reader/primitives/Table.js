function Table(scene, bodytexture, legstexture){
	this.scene = scene;
	
	this.body = new CubePrimitive(scene, bodytexture);
	this.leg = new CubePrimitive(scene, legstexture);
}


Table.prototype = Object.create(CGFobject.prototype);
Table.prototype.constructor = Table;


Table.prototype.display = function()
{
	var newMat = mat4.create();
	
	//Body
	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [2.5,-0.25,1]);
	mat4.scale(newMat, newMat, [10,0.5,14]);
	this.scene.multMatrix(newMat);
	
	this.body.display();
	this.scene.popMatrix();
	
	//Legs
	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [-1,-3,-4]);
	mat4.scale(newMat, newMat, [0.75,5,.75]);
	this.scene.multMatrix(newMat);
	this.leg.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [-1,-3,6]);
	mat4.scale(newMat, newMat, [0.75,5,.75]);
	this.scene.multMatrix(newMat);
	this.leg.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [6,-3,-4]);
	mat4.scale(newMat, newMat, [0.75,5,.75]);
	this.scene.multMatrix(newMat);
	this.leg.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [6,-3,6]);
	mat4.scale(newMat, newMat, [0.75,5,.75]);
	this.scene.multMatrix(newMat);
	this.leg.display();
	this.scene.popMatrix();
}
