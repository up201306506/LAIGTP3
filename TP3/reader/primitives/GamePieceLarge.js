function GamePieceLarge(scene,textcpath, x, z, id, texture){
	this.scene = scene;
	this.x =x;
	this.z=z;
	
	this.id=id;
	this.placed = false;
	this.placed_on = 0;
	this.can_move = true;
	
	
	this.appearance = new CGFappearance(this.scene);
	this.appearance.setAmbient(0.7, 0.7, 0.7, 1);
	this.appearance.setDiffuse(1, 1, 1, 1);
	this.appearance.setSpecular(0.1, 0.1, 0.1, 1);	
	this.appearance.setTexture(texture);
	this.appearance.setTextureWrap('REPEAT', 'REPEAT');
	
	this.innerbody = new CylinderPrimitive(scene, 24, 3, 0.15, .25, .25);
	this.outterbody = new CylinderPrimitive(scene, 24, 3, 0.15, .4, .4);
	this.ring = new RingPrimitive(scene, 24, 0.4, 0.25);
}


GamePieceLarge.prototype = Object.create(CGFobject.prototype);
GamePieceLarge.prototype.constructor = GamePieceLarge;


GamePieceLarge.prototype.display = function()
{
	this.scene.pushMatrix();
	this.appearance.apply();
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.translate(this.x,-this.z,0);
	
		this.scene.pushMatrix();
		this.scene.scale(-1,1,1);
		this.innerbody.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.outterbody.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.rotate(180*degToRad,1,0,0);
		this.scene.translate(0,0,-0.15);
		this.ring.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.ring.display();
		this.scene.popMatrix();
		
		
	this.scene.popMatrix();
}

GamePieceLarge.prototype.getid = function(){
	return this.id;
}