function GameState(scene){
	this.scene = scene;
		
	/* Tabuleiro e peças */
	this.board = new Tabuleiro(this.scene,2);
	this.WhitePieces = [];
	this.BlackPieces = [];
	this.createPieces();
	
	/* Animações */
	this.animation_array = [];
	

	/* Estado*/
	this.state = 0;
	
	this.selectedpiece;
	this.selectedtype = 'Nothing';
	this.selectedboard;
	
	this.waitUntil = 0;
	
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

GameState.prototype.logic = function () {
	
		// 0 - Waiting for scene to load
			// 3 - Waiting for the pieces to spawn
		// Turns
			// 21 - Player White's Turn - piece
			// 22 - Player White's Turn - board
			// 23 - Player Black's Turn - piece
			// 24 - Player Black's Turn - board
		// Turn Animation
			// 31 - Waiting for a white piece animation
			// 32 - Waiting for a black piece animation
	
	switch(this.state){
	case 0:
		if(this.scene.graphs[this.scene.Ambient].loadedOk)
		{
			for (var i = 11; i < 20; i++)
			{
				this.WhitePieces[i].spawnAnimation();
				this.BlackPieces[i+10].spawnAnimation();
			}
			this.waitUntil = this.scene.tempo_actual + 2000;
			this.state = 3;
			console.log("Scene is now loaded");		
		}
		break;
	case 3: 
		if (this.scene.tempo_actual > this.waitUntil)
		{
			this.state = 21;
			console.log("E a vez do jogador branco");
		}
		break;
	case 21:
		if (this.PiecePicked())
			this.state = 22;
		break;
	case 22:
		if (this.BoardPicked())
		{
			//Log the movement
			console.log("Going to try moving piece " + this.selectedpiece.getid() + " towards board "+this.selectedboard.getid() );
			console.log("Inicial coordinates: x "+ this.selectedpiece.x + " z " + this.selectedpiece.z);
			console.log("Final coordinates: x "+ this.selectedboard.x + " z " + this.selectedboard.z);	
			
			if(this.isMoveValid(this.selectedpiece, this.selectedboard))
			{
				//Remove Piece from Floor where it was.
				if(this.selectedpiece.placed)
				{
					
				}
				
				//Animate
				var Large_eats_small = false;
				if (this.selectedpiece.objectName() == "GamePieceLarge" && this.selectedboard.currentheight == 1)
					if( this.selectedboard.bottomFloor.objectName() == "GamePieceSmall")
						Large_eats_small = true;
				var targetheight = 0.1275;	
				if(!Large_eats_small)
					targetheight += (0.15*this.selectedboard.currentheight);
				this.selectedpiece.AnimateTowards(this.selectedboard.x + 0.5, targetheight, this.selectedboard.z, 5, this.scene.tempo_actual/1000);
				if(!Large_eats_small)
					this.selectedboard.currentheight++;
				
				//Add piece to Floor it'll go to.
				if (this.selectedboard.currentheight == 1)
				{
					this.selectedboard.bottomFloor = this.selectedpiece;
					if (Large_eats_small)
						this.selectedboard.bottomDoubleFilled = true;
				}
				if (this.selectedboard.currentheight == 2)
					this.selectedboard.mediumFloor = this.selectedpiece;
				if (this.selectedboard.currentheight == 3)
					this.selectedboard.topFloor = this.selectedpiece;
				this.selectedpiece.placed = true;
				
				//time the animation
				this.waitUntil = this.scene.tempo_actual + 5000;
				//change state
				this.state = 31;
			}
			else
			{
				console.log("Move wasn't valid, pick another piece");
				this.state = 21;
			}
		}
		break;
	case 23:
		if (this.PiecePicked())
			this.state = 24;
		break;
	case 24:
		if (this.BoardPicked())
		{
			//Log the movement
			console.log("Going to try moving piece " + this.selectedpiece.getid() + " towards board "+this.selectedboard.getid() );
			console.log("Inicial coordinates: x "+ this.selectedpiece.x + " z " + this.selectedpiece.z);
			console.log("Final coordinates: x "+ this.selectedboard.x + " z " + this.selectedboard.z);	
			
			if(this.isMoveValid(this.selectedpiece, this.selectedboard))
			{
				//Remove Piece from Floor where it was.
				if(this.selectedpiece.placed)
				{
					
				}
				
				//Animate
				var Large_eats_small = false;
				if (this.selectedpiece.objectName() == "GamePieceLarge" && this.selectedboard.currentheight == 1)
					if( this.selectedboard.bottomFloor.objectName() == "GamePieceSmall")
						Large_eats_small = true;
				var targetheight = 0.1275;	
				if(!Large_eats_small)
					targetheight += (0.15*this.selectedboard.currentheight);
				this.selectedpiece.AnimateTowards(this.selectedboard.x + 0.5, targetheight, this.selectedboard.z, 5, this.scene.tempo_actual/1000);
				if(!Large_eats_small)
					this.selectedboard.currentheight++;
				
				//Add piece to Floor it'll go to.
				if (this.selectedboard.currentheight == 1)
				{
					this.selectedboard.bottomFloor = this.selectedpiece;
					if (Large_eats_small)
						this.selectedboard.bottomDoubleFilled = true;
				}
				if (this.selectedboard.currentheight == 2)
					this.selectedboard.mediumFloor = this.selectedpiece;
				if (this.selectedboard.currentheight == 3)
					this.selectedboard.topFloor = this.selectedpiece;
				this.selectedpiece.placed = true;
				
				//time the animation
				this.waitUntil = this.scene.tempo_actual + 5000;
				//change state
				this.state = 32;
			}
			else
			{
				console.log("Move wasn't valid, pick another piece");
				this.state = 23;
			}
		}
		break;	
	case 31: 
		if (this.scene.tempo_actual > this.waitUntil)
		{
			this.state = 23;
			console.log("E a vez do jogador preto");
		}
		break;
	case 32: 
		if (this.scene.tempo_actual > this.waitUntil)
		{
			this.state = 21;
			console.log("E a vez do jogador branco");
		}
		break;
		
	default:
		this.logPicking();
		break;
	}
}


GameState.prototype.PiecePicked = function () {
	if (this.scene.pickMode == false) {
		if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
			var obj = this.scene.pickResults[0][0];
			var customId = this.scene.pickResults[0][1];
			if (obj){
				console.log("Selected piece:" + customId);
	
				this.selectedpiece = obj;
				this.selectedtype = obj.objectName();
				this.scene.pickResults.splice(0,this.scene.pickResults.length);
				
				return true;
			}
			
			console.log("Pressed outside");		
			this.scene.pickResults.splice(0,this.scene.pickResults.length);
		}
	}
	
	return false;
}
GameState.prototype.BoardPicked = function () {
	if (this.scene.pickMode == false) {
		if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
			var obj = this.scene.pickResults[0][0];
			var customId = this.scene.pickResults[0][1];
			if (obj){
	
				if( customId > 10){
					
					this.selectedpiece = obj;
					this.selectedtype = obj.objectName();
					console.log("Selected piece:" + customId);
					this.scene.pickResults.splice(0,this.scene.pickResults.length);
					return false;
				}
				
				this.selectedboard = obj;
				console.log("Selected board:" + customId);
				this.scene.pickResults.splice(0,this.scene.pickResults.length);
				
				return true;
			}
			
			console.log("Pressed outside");		
			this.scene.pickResults.splice(0,this.scene.pickResults.length);
		}
	}
	
	return false;
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

GameState.prototype.updateAnimations = function (currTime){
	for(var i = 11; i < 20; i++){
		this.WhitePieces[i].updateAnimations(currTime);
		this.BlackPieces[i+10].updateAnimations(currTime);
	}
}

GameState.prototype.isMoveValid = function(Piece, TargetBoard){
	if (TargetBoard.currentheight == 3)
		return false;
	
	return true;
}