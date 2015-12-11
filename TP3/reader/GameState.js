function GameState(scene){
	this.scene = scene;
	
	
	this.board = new Tabuleiro(this.scene,1);
	
	this.WhitePieces = [];
	this.WhitePieces[11] = new GamePieceSmall(this.scene,'',0,0,11)
	this.BlackPieces = [];
	
	
}


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
