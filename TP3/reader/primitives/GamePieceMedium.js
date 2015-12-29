function GamePieceMedium(scene,textcpath, x, z, id, texture){
	GamePiece.call(this,id,scene,textcpath,x,z,id,texture,"GamePieceMedium");
	
	this.body = new CylinderPrimitive(scene, 24, 3, 0.15, .3, .3);
	this.bot = new CircleTop(scene, 24);
	this.top = new CircleTop(scene, 24);
	
}

GamePieceMedium.prototype = Object.create(GamePiece.prototype);
GamePieceMedium.prototype.constructor = GamePieceMedium;


GamePieceMedium.prototype.display = function()
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
		this.scene.scale(0.3,0.3,1);
		this.bot.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.scale(0.3,0.3,1);
		this.scene.rotate(180*degToRad,0,1,0);
		this.scene.translate(0,0,-0.15);
		this.top.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
}
