function GamePieceMedium(scene,textcpath, x, z, id){
	this.scene = scene;
	this.x =x;
	this.z=z;
	this.id=id;
}


GamePieceMedium.prototype = Object.create(CGFobject.prototype);
GamePieceMedium.prototype.constructor = GamePieceMedium;