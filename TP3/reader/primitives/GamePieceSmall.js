function GamePieceSmall(scene,textcpath, x, z, id){
	this.scene = scene;
	this.x =x;
	this.z=z;
	this.id=id;
	
	
	//this.mat = new CGFtexture(this.scene, textcpath);
	this.body = new CylinderPrimitive(scene, 24, 3, 0.1275, .2, .2);
	this.bot = new CircleTop(scene, 24);
	this.top = new CircleTop(scene, 24);
}


GamePieceSmall.prototype = Object.create(CGFobject.prototype);
GamePieceSmall.prototype.constructor = GamePieceSmall;


GamePieceSmall.prototype.display = function()
{
	this.body.display();
	
	this.bot.display();
	
	this.top.display();
}

GamePieceSmall.prototype.getid = function(){
	return this.id;
}