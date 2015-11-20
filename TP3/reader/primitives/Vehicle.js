
/**
 * Constructor para a classe Vehicle
 * Neste caso, o veiculo é um barco pirata
 *
 * @param	scene	the CGFscene object the Vehicle will be displayed in
 * @see	construi_partes()
 */
function Vehicle(scene){
	CGFobject.call(this,scene);
	this.scene = scene;
	
	this.Array_Partes = [];
	this.Array_Texturas = [];
	this.construi_partes();
}

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;

/**
 * Gera as peças que vão fazem o Vehicle 
 *
 */
Vehicle.prototype.construi_partes = function()
{
	//Corpo
	this.Array_Texturas["corpo"] = new CGFtexture(this.scene, "primitives/assets/Boards.jpg");	
	this.Array_Partes["corpo"] = new Patch(this.scene, 3,24,24,
		[
		[0,0.5,2],[0,0.5,2],[0,0.5,2],[0,0.5,2],
		[-1,0,1],[0,-2,1],[0,-2,1],[1,0,1],
		[-1,0,0],[0,-2,0],[0,-2,0],[1,0,0],
		[-1,0,-1],[0,0,-1.5],[0,0,-1.5],[1,0,-1]
		]);
		
	//Chão
	this.Array_Partes["chao"] = new Patch(this.scene, 3,24,24,
		[
		[0,0.5,2],[0,0.5,2],[0,0.5,2],[0,0.5,2],
		[1,0,1],[-0.33,0,1],[0.33,-0,1],[-1,0,1],
		[1,0,0],[-0.33,0,0],[0.33,-0,0],[-1,0,0],
		[1,0,-1],[0,0,-1.5],[0,0,-1.5],[-1,0,-1]
		]);
		
	//Mastro
	this.Array_Texturas["Mastro"] = new CGFtexture(this.scene, "primitives/assets/metal.jpg");
	this.Array_Partes["Mastro"] = new CylinderPrimitive(this.scene, 5,5,1.5,0.05,0.05);
	
	//Bandeira
	this.Array_Texturas["bandeira"] = new CGFtexture(this.scene, "primitives/assets/pirateflag.jpg");
	this.Array_Partes["bandeira"] = new Patch(this.scene, 1,4,4,
		[
		[0,0,1],[0,0,1.5],
		[1,0,1],[1,0,1.5]
		]);
	this.Array_Partes["bandeiraback"] = new Patch(this.scene, 1,4,4,
		[
		[1,0,1],[1,0,1.5],[0,0,1],[0,0,1.5]
		]);
}
	
var degToRad = Math.PI / 180.0;

/**
 * Mostra na cea as peças todas do Vehicle 
 *
 */
Vehicle.prototype.display = function()
{
	this.scene.pushMatrix();
	
	//Corpo
	this.Array_Texturas["corpo"].bind();
	this.Array_Partes["corpo"].display();
	this.Array_Partes["chao"].display();
	//Mastro
	this.scene.pushMatrix();
			var newMat = mat4.create();
			mat4.identity(newMat);
			mat4.rotate(newMat, newMat, -90*degToRad, [1,0,0]);
			this.scene.multMatrix(newMat);
	this.Array_Texturas["Mastro"].bind();
	this.Array_Partes["Mastro"].display();
	this.scene.popMatrix();
	//bandeira
	this.scene.pushMatrix();
			var newMat = mat4.create();
			mat4.identity(newMat);
			mat4.rotate(newMat, newMat, -90*degToRad, [1,0,0]);
			mat4.rotate(newMat, newMat, 90*degToRad, [0,0,1]);
			this.scene.multMatrix(newMat);
	this.Array_Texturas["bandeira"].bind();
	this.Array_Partes["bandeira"].display();
	this.Array_Partes["bandeiraback"].display();
	this.scene.popMatrix();
	
	
	this.scene.popMatrix();
}