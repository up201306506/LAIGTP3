function GamePieceLarge(scene,textcpath, x, z, id, texture, color){
	GamePiece.call(this,id,scene,textcpath,x,z,id,texture,"GamePieceLarge",color);
	
	this.innerbody = new CylinderPrimitive(scene, 24, 3, 0.15, .25, .25);
	this.outterbody = new CylinderPrimitive(scene, 24, 3, 0.15, .4, .4);
	this.ring = new RingPrimitive(scene, 24, 0.4, 0.25);
	
}


GamePieceLarge.prototype = Object.create(GamePiece.prototype);
GamePieceLarge.prototype.constructor = GamePieceLarge;


GamePieceLarge.prototype.display = function()
{
	this.scene.pushMatrix();
	this.appearance.apply();
	
	if(this.animations.length > 0)
	{
		var animationmatrix = this.animations[this.animations.length - 1].getMatrix();
		this.scene.multMatrix(animationmatrix);
	}
	
	this.scene.rotate(-90*degToRad,1,0,0);
	
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

