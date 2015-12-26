function GameState(scene){
	this.scene = scene;
		
	/* Tabuleiro e peças */
	this.board = new Tabuleiro(this.scene,2);
	this.WhitePieces = [];
	this.BlackPieces = [];
	this.createPieces();

		this.state = 0;
		// 0 - Waiting for scene to load
		// Menus
			// 1 - Sending PROLOG command
			// 2 - Waiting for PROLOG response
		// Displays
			// 10 - Waiting for piece animations
			// 11 - Waiting for score animation
		// Turns
			// 21 - Player White's Turn - piece
			// 22 - Player White's Turn - board
			// 23 - Player Black's Turn - piece
			// 24 - Player Black's Turn - board
			
	
}

GameState.prototype.createPieces = function ()
{
/*
	id list:
		1-9: Board Tiles.
		
		11-13 - Peças Pequenas Brancas
		14-16 - Peças Médias Brancas
		17-19 - Peças Grandes Brancas
		
		21-23 - Peças Pequenas Pretas
		24-26 - Peças Médias Pretas
		27-29 - Peças Grandes Pretas
*/
	
	var whitetext = new CGFtexture(this.scene, "primitives/assets/whitewood.jpg");
	var blacktext = new CGFtexture(this.scene, "primitives/assets/blackwood.jpg");
	
	this.WhitePieces[11] = new GamePieceSmall(this.scene,'',-.5,6.5,11,whitetext);
	this.WhitePieces[12] = new GamePieceSmall(this.scene,'',0,6.75,12,whitetext);
	this.WhitePieces[13] = new GamePieceSmall(this.scene,'',-.5,7,13,whitetext);
	this.WhitePieces[14] = new GamePieceMedium(this.scene,'',1.5,6.5,14,whitetext);
	this.WhitePieces[15] = new GamePieceMedium(this.scene,'',2,7,15,whitetext);
	this.WhitePieces[16] = new GamePieceMedium(this.scene,'',2.5,6.5,16,whitetext);
	this.WhitePieces[17] = new GamePieceLarge(this.scene,'',4,6.5,17,whitetext);
	this.WhitePieces[18] = new GamePieceLarge(this.scene,'',5,6.5,18,whitetext);
	this.WhitePieces[19] = new GamePieceLarge(this.scene,'',4.5,7.25,19,whitetext);
	
	this.BlackPieces[21] = new GamePieceSmall(this.scene,'',-.5,-4.5,21,blacktext);
	this.BlackPieces[22] = new GamePieceSmall(this.scene,'',0,-4.75,22,blacktext);
	this.BlackPieces[23] = new GamePieceSmall(this.scene,'',-.5,-5,23,blacktext);
	this.BlackPieces[24] = new GamePieceMedium(this.scene,'',1.5,-4.5,24,blacktext);
	this.BlackPieces[25] = new GamePieceMedium(this.scene,'',2,-5,25,blacktext);
	this.BlackPieces[26] = new GamePieceMedium(this.scene,'',2.5,-4.5,26,blacktext);
	this.BlackPieces[27] = new GamePieceLarge(this.scene,'',4,-4.5,27,blacktext);
	this.BlackPieces[28] = new GamePieceLarge(this.scene,'',5,-4.5,28,blacktext);
	this.BlackPieces[29] = new GamePieceLarge(this.scene,'',4.5,-5.25,29,blacktext);
}

GameState.prototype.logic = function (sceneready) {
	
	switch(this.state){
	case 0:
		if(sceneready)
			this.state = 1;
			console.log("Scene is now loaded");
		break;
	
	default:
		this.logPicking();
		break;
	}
}


GameState.prototype.PiecePicked = function () {
	
	if (this.scene.pickMode == false) {
	
	}
}

GameState.prototype.Sceneloaded = function () {
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
					console.log("Picked object: " + obj.objectName() + ", with pick id " + customId);
				}
			}
			this.scene.pickResults.splice(0,this.scene.pickResults.length);
		}		
	}
}