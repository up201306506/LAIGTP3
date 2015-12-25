function GameState(scene){
	this.scene = scene;
	
	
	this.board = new Tabuleiro(this.scene,2);
	
	this.WhitePieces = [];
	this.BlackPieces = [];
	this.createPieces();
	
}

GameState.prototype.createPieces = function ()
{
/*
	id list:
		1-9: Board Tiles.
		
		11-13 - Pe�as Pequenas Brancas
		14-16 - Pe�as M�dias Brancas
		17-19 - Pe�as Grandes Brancas
		
		21-23 - Pe�as Pequenas Pretas
		24-26 - Pe�as M�dias Pretas
		27-29 - Pe�as Grandes Pretas
*/
	
	
	this.WhitePieces[11] = new GamePieceSmall(this.scene,'',-.5,6.5,11);
	this.WhitePieces[12] = new GamePieceSmall(this.scene,'',0,6.75,12);
	this.WhitePieces[13] = new GamePieceSmall(this.scene,'',-.5,7,13);

	
	this.BlackPieces[21] = new GamePieceSmall(this.scene,'',-.5,-4.5,21);
	this.BlackPieces[22] = new GamePieceSmall(this.scene,'',0,-4.75,22);
	this.BlackPieces[23] = new GamePieceSmall(this.scene,'',-.5,-5,23);
}



GameState.prototype.logPicking = function ()
{
	if (this.scene.pickMode == false) {
		if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
			for (var i=0; i< this.scene.pickResults.length; i++) {
				var obj = this.scene.pickResults[i][0];
				if (obj)
				{
					var customId = this.scene.pickResults[i][1];				
					console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.scene.pickResults.splice(0,this.scene.pickResults.length);
		}		
	}
}