function Table(scene, bodytexture){
	this.scene = scene;
	
	this.body = new CubePrimitive(scene, bodytexture);
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
	
}
