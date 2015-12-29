function GamePieceSmall(scene,textcpath, x, z, id, texture){
	GamePiece.call(this,id,scene,textcpath,x,z,id,texture,"GamePieceSmall");
	
	this.body = new CylinderPrimitive(scene, 24, 3, 0.15, .2, .2);
	this.bot = new CircleTop(scene, 24);
	this.top = new CircleTop(scene, 24);

}


GamePieceSmall.prototype = Object.create(GamePiece.prototype);
GamePieceSmall.prototype.constructor = GamePieceSmall;


GamePieceSmall.prototype.display = function()
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

