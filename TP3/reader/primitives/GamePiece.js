function GamePiece(id) {
	this.id = id;
 }
 
GamePiece.prototype = Object.create(CGFobject.prototype);
GamePiece.prototype.constructor = GamePiece;

GamePiece.prototype.getid = function(){
	return this.id;
}