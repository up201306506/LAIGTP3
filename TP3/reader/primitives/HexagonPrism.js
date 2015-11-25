/**
 * Constructor para a classe HexagonPrism
 *
 * @param	scene	the CGFscene object the HexagonPrism will be displayed in
 * @see	construi_partes()
 */
function HexagonPrism(scene,textcpath){
	CGFobject.call(this,scene);
	this.scene = scene;
	
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
	
	this.scene.pushMatrix();
			this.mat.bind();
			var newMat = mat4.create();
			mat4.identity(newMat); mat4.rotate(newMat, newMat, -90*degToRad, [1,0,0]);
			this.scene.multMatrix(newMat);
	this.bot.display();
	this.body.display();
	this.scene.popMatrix();
	
	
	this.scene.pushMatrix();
			this.mat.bind();
			var newMat = mat4.create();
			mat4.identity(newMat); 
			mat4.rotate(newMat, newMat, 90*degToRad, [1,0,0]);
			mat4.translate(newMat, newMat, [0,0,-0.1275]);
			this.scene.multMatrix(newMat);
	this.top.display();
	this.scene.popMatrix();
	
	this.scene.popMatrix();
}