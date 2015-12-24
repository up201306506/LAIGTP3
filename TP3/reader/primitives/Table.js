function Table(scene){
	this.scene = scene;
	
	this.body = new CubePrimitive(scene);
}


Table.prototype = Object.create(CGFobject.prototype);
Table.prototype.constructor = Table;


Table.prototype.display = function()
{
	this.scene.pushMatrix();
	this.body.display();
	this.scene.popMatrix();
	
}
