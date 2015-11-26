
var degToRad = Math.PI / 180.0;

function GameScene() {
    CGFscene.call(this);
    this.texture = null;
}

GameScene.prototype = Object.create(CGFscene.prototype);
GameScene.prototype.constructor = GameScene;

GameScene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

	this.initCameras();
    this.initLights();
    this.gl.clearColor(0.7, 0.8, 0.7, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	this.enableTextures(true);

	this.tempo_inicio = 0;
	this.tempo_actual = 0;
    this.setUpdatePeriod(1000/60);

	
	this.board = new Tabuleiro(this,3);


	/*this.HEXAGON1 = new HexagonPrism(this,"primitives/assets/BigPieceBackground.jpg",0,0);
	this.HEXAGON4 = new HexagonPrism(this,"primitives/assets/BigPieceBackground.jpg",0,1);
	this.HEXAGON7 = new HexagonPrism(this,"primitives/assets/BigPieceBackground.jpg",0,2);

	this.HEXAGON2 = new HexagonPrism(this,"primitives/assets/BigPieceBackground.jpg",1,1);
	this.HEXAGON5 = new HexagonPrism(this,"primitives/assets/BigPieceBackground.jpg",1,3);
	this.HEXAGON8 = new HexagonPrism(this,"primitives/assets/BigPieceBackground.jpg",1,5);

	this.HEXAGON3 = new HexagonPrism(this,"primitives/assets/BigPieceBackground.jpg",2,0);
	this.HEXAGON6 = new HexagonPrism(this,"primitives/assets/BigPieceBackground.jpg",2,1);
	this.HEXAGON9 = new HexagonPrism(this,"primitives/assets/BigPieceBackground.jpg",2,2);*/


	
};

GameScene.prototype.initLights = function () {
	
	this.lights[1].setPosition(3,2,3,1);
	this.lights[1].setAmbient(0,0,0,1);
	this.lights[1].setDiffuse(0.9,0.9,0.9,1);
	this.lights[1].setSpecular(0.4,0.4,0.4,1);
	this.lights[1].update();

	
	this.lights[1].setVisible(true);
	this.lights[1].enable();

	
};

GameScene.prototype.initCameras = function () {
	this.camera = new CGFcamera(.4, 0.1, 500, vec3.fromValues(15,15,15), vec3.fromValues(0, 0, 0));
	};

GameScene.prototype.setDefaultAppearance = function () {
	
	this.setAmbient(0.7, 0.7, 0.7, 1.0);
	this.setDiffuse(0.4, 0.4, 0.4, 1.0);
    this.setSpecular(0.4, 0.4, 0.4, 1.0);
    this.setShininess(10.0);	
};

	//-----------------------------------------------------//
	//-----					DISPLAY					-------//
	//-----------------------------------------------------//

GameScene.prototype.display = function () {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	this.updateProjectionMatrix();
    this.loadIdentity();
	this.applyViewMatrix();
	this.setDefaultAppearance();

	
	//Light Update
	for(var i = 0; i <= 7; i++){
		this.lights[i].update();
	}			
	

	this.board.display();
/*	this.HEXAGON1.display();
	this.HEXAGON2.display();
	this.HEXAGON3.display();
	this.HEXAGON4.display();
	this.HEXAGON5.display();
	this.HEXAGON6.display();
	this.HEXAGON7.display();
	this.HEXAGON8.display();
	this.HEXAGON9.display();


	this.pushMatrix();
	var newMat = mat4.create();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [0,0,2*Math.sqrt(0.75)+0.01]);
	this.multMatrix(newMat);
	this.HEXAGON4.display();
	this.popMatrix();

	this.pushMatrix();
	var newMat = mat4.create();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [0,0,4*Math.sqrt(0.75)+0.02]);
	this.multMatrix(newMat);
	this.HEXAGON7.display();
	this.popMatrix();

	this.pushMatrix();
	var newMat = mat4.create();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [1.51,0,-Math.sqrt(0.75)-0.01]);
	this.multMatrix(newMat);
	this.HEXAGON2.display();
	this.popMatrix();

	this.pushMatrix();
	var newMat = mat4.create();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [1.51,0,Math.sqrt(0.75)]);
	this.multMatrix(newMat);
	this.HEXAGON5.display();
	this.popMatrix();

	this.pushMatrix();
	var newMat = mat4.create();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [1.51,0,0.01+3*Math.sqrt(0.75)]);
	this.multMatrix(newMat);
	this.HEXAGON8.display();
	this.popMatrix();

	this.pushMatrix();
	var newMat = mat4.create();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [3.02,0,0]);
	this.multMatrix(newMat);
	this.HEXAGON3.display();
	this.popMatrix();
	
	this.pushMatrix();
	var newMat = mat4.create();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [3.02,0,2*Math.sqrt(0.75)+0.01]);
	this.multMatrix(newMat);
	this.HEXAGON6.display();
	this.popMatrix();

	this.pushMatrix();
	var newMat = mat4.create();
	mat4.identity(newMat); 
	mat4.translate(newMat, newMat, [3.02,0,4*Math.sqrt(0.75)+0.02]);
	this.multMatrix(newMat);
	this.HEXAGON9.display();
	this.popMatrix();
*/
	this.axis.display();
    
};


	
	//-----------------------------------------------------//
	//-----				MATRIX STACK				-------//
	//-----------------------------------------------------//
	
GameScene.prototype.transformMatrix_m4 = function(matrix, transformtype, value_x, value_y, value_z, angle) {
	
	switch(transformtype)
	{
	case 'translation':
		mat4.translate(matrix, matrix, [value_x,value_y,value_z]);
		break;
	case 'rotation':
		mat4.rotate(matrix, matrix, angle*degToRad, [value_x,value_y,value_z]);
		break;
	case 'scale':
		mat4.scale(matrix, matrix, [value_x,value_y,value_z]);
		break;
	default: 
		throw "Invalid transformation!";
		break;
	}
	
	
}

	//-----------------------------------------------------//
	//-----				TIME						-------//
	//-----------------------------------------------------//


GameScene.prototype.update = function(currTime) {
	if(this.tempo_inicio == 0)
	{
		this.tempo_inicio = currTime;
	} else
	{
		this.tempo_actual = currTime - this.tempo_inicio ;
		//console.log(this.tempo_actual);
	}
	
}