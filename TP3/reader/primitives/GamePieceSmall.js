function GamePieceSmall(scene,textcpath, x, z, id, texture){
	this.scene = scene;
	this.x =x;
	this.z=z;
	this.id=id;
	
	this.placed = false;
	
	this.appearance = new CGFappearance(this.scene);
	this.appearance.setAmbient(0.7, 0.7, 0.7, 1);
	this.appearance.setDiffuse(1, 1, 1, 1);
	this.appearance.setSpecular(0.1, 0.1, 0.1, 1);	
	this.appearance.setTexture(texture);
	this.appearance.setTextureWrap('REPEAT', 'REPEAT');
	
	this.body = new CylinderPrimitive(scene, 24, 3, 0.15, .2, .2);
	this.bot = new CircleTop(scene, 24);
	this.top = new CircleTop(scene, 24);
}


GamePieceSmall.prototype = Object.create(CGFobject.prototype);
GamePieceSmall.prototype.constructor = GamePieceSmall;


GamePieceSmall.prototype.display = function()
{
	this.scene.pushMatrix();
	this.appearance.apply();
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.translate(this.x,-this.z,0);
	
		this.scene.pushMatrix();
		this.body.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.scale(0.2,0.2,1);
		this.bot.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.scale(0.2,0.2,1);
		this.scene.rotate(180*degToRad,0,1,0);
		this.scene.translate(0,0,-0.15);
		this.top.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
}

GamePieceSmall.prototype.getid = function(){
	return this.id;
}