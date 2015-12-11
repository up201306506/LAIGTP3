/**
 * Constructor para a classe HexagonPrism
 *
 * @param	scene	the CGFscene object the HexagonPrism will be displayed in
 * @see	construi_partes()
 */
function HexagonPrism(scene,textcpath, x, z, id){
	CGFobject.call(this,scene);
	this.scene = scene;
	
	this.x =x;
	this.z=z;
	this.id=id;

	this.body = new CylinderPrimitive(scene, 6, 6, 0.1275, 1, 1);
	this.mat = new CGFtexture(this.scene, textcpath);
	this.bot = new CircleTop(scene, 6, 6);
	this.top = new CircleTop(scene, 6, 6);
}

HexagonPrism.prototype = Object.create(CGFobject.prototype);
HexagonPrism.prototype.constructor = HexagonPrism;

/**
 * 
 *
 */
HexagonPrism.prototype.display = function()
{
	this.scene.pushMatrix();

	var dist_z = 2*Math.sqrt(0.75)+0.01;
	var dist_x =1.51;
	var newMat = mat4.create();
	mat4.identity(newMat);
	if(this.x==1 || this.x==3)
		mat4.translate(newMat, newMat, [this.x*dist_x,0,this.z*Math.sqrt(0.75)+((this.z+2)/2-2)*0.01-dist_z]);
	else
		mat4.translate(newMat, newMat, [this.x*dist_x,0,this.z*dist_z]);
	this.scene.multMatrix(newMat);


	this.scene.pushMatrix();
			this.mat.bind();
			mat4.identity(newMat); 
			mat4.rotate(newMat, newMat, -90*degToRad, [1,0,0]);
			this.scene.multMatrix(newMat);
	this.bot.display();
	this.body.display();
	this.scene.popMatrix();
	
	
	this.scene.pushMatrix();
			this.mat.bind();
			mat4.identity(newMat); 
			mat4.rotate(newMat, newMat, 90*degToRad, [1,0,0]);
			mat4.translate(newMat, newMat, [0,0,-0.1275]);
			this.scene.multMatrix(newMat);
	this.top.display();
	this.scene.popMatrix();
	

	this.scene.popMatrix();
}

HexagonPrism.prototype.getid = function(){
	return this.id;
}