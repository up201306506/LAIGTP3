function GamePieceLarge(scene,textcpath, x, z, id){
	this.scene = scene;
	this.x =x;
	this.z=z;
	this.id=id;
}

GamePieceLarge.prototype = Object.create(CGFobject.prototype);
GamePieceLarge.prototype.constructor = GamePieceLarge;