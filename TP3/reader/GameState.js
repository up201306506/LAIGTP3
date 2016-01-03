function GameState(scene){
	this.scene = scene;
		
	/* Tabuleiro e peças */
	this.board;
	this.WhitePieces = [];
	this.BlackPieces = [];
	this.createPieces();
		
	/* HUD */
	this.HUD = {};
	this.createHUD();
	/* Menu */
	this.Menu = {};
	this.createMenu();

	/* Estado*/
	this.state = 0;
	
	//0 - por escolher
	//1 - Hmn VS Hmn
	//2 - Hmn VS ezCpu
	//3 - Hmn VS hardCpu
	this.gamemode = 0;
	
	this.WhiteScore = 0;
	this.BlackScore = 0;
	
	/* selections */
	this.selectedpiece;
	this.selectedtype = 'Nothing';
	this.selectedboard;
	
	/* Animações */
	this.animation_array = [];
	this.waitUntil = 0;
	
	/* Prolog Requests */
	this.requestPending = false;
	this.moveValid = false;
	
	
}

GameState.prototype.createPieces = function (){	
	var whitetext = new CGFtexture(this.scene, "primitives/assets/whitewood.jpg");
	var blacktext = new CGFtexture(this.scene, "primitives/assets/blackwood.jpg");
	
	this.WhitePieces[11] = new GamePieceSmall(this.scene,'',-.5,6.5,11,whitetext,"White");
	this.WhitePieces[12] = new GamePieceSmall(this.scene,'',0,6.75,12,whitetext,"White");
	this.WhitePieces[13] = new GamePieceSmall(this.scene,'',-.5,7,13,whitetext,"White");
	this.WhitePieces[14] = new GamePieceMedium(this.scene,'',1.5,6.5,14,whitetext,"White");
	this.WhitePieces[15] = new GamePieceMedium(this.scene,'',2,7,15,whitetext,"White");
	this.WhitePieces[16] = new GamePieceMedium(this.scene,'',2.5,6.5,16,whitetext,"White");
	this.WhitePieces[17] = new GamePieceLarge(this.scene,'',4,6.5,17,whitetext,"White");
	this.WhitePieces[18] = new GamePieceLarge(this.scene,'',5,6.5,18,whitetext,"White");
	this.WhitePieces[19] = new GamePieceLarge(this.scene,'',4.5,7.25,19,whitetext,"White");
	
	this.BlackPieces[21] = new GamePieceSmall(this.scene,'',-.5,-4.5,21,blacktext,"Black");
	this.BlackPieces[22] = new GamePieceSmall(this.scene,'',0,-4.75,22,blacktext,"Black");
	this.BlackPieces[23] = new GamePieceSmall(this.scene,'',-.5,-5,23,blacktext,"Black");
	this.BlackPieces[24] = new GamePieceMedium(this.scene,'',1.5,-4.5,24,blacktext,"Black");
	this.BlackPieces[25] = new GamePieceMedium(this.scene,'',2,-5,25,blacktext,"Black");
	this.BlackPieces[26] = new GamePieceMedium(this.scene,'',2.5,-4.5,26,blacktext,"Black");
	this.BlackPieces[27] = new GamePieceLarge(this.scene,'',4,-4.5,27,blacktext,"Black");
	this.BlackPieces[28] = new GamePieceLarge(this.scene,'',5,-4.5,28,blacktext,"Black");
	this.BlackPieces[29] = new GamePieceLarge(this.scene,'',4.5,-5.25,29,blacktext,"Black");
}
GameState.prototype.createHUD = function () {

	this.HUD.appearance = new CGFappearance(this.scene);
	this.HUD.appearance.setAmbient(1, 1, 1, 1);
	this.HUD.appearance.setDiffuse(0.0, 0.0, 0.0, 1);	
	this.HUD.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
	this.HUD.appearance.setEmission(0.7, 0.7, 0.7, 2);
	this.HUD.appearance.setShininess(0);
	
	//Top
	this.HUD.topHUD = new SquarePrimitive(this.scene, 0, 1/5, 8/5, 0);
	this.HUD.topHUD.texture = new CGFtexture(this.scene, "primitives/Hud/Top.png"); 
	
	//Player
	this.HUD.Player = new SquarePrimitive(this.scene, 0, 1/2, 1, 0);
	this.HUD.Player.texture1 = new CGFtexture(this.scene, "primitives/Hud/topHMN.png"); 
	this.HUD.Player.texture2 = new CGFtexture(this.scene, "primitives/Hud/topCPU.png");
	
	//Score
	this.HUD.Score = new SquarePrimitive(this.scene, 0, 1, 1, 0);
	this.HUD.Score.texture = new CGFtexture(this.scene, "shaders/oolite-font.png");
	
	//Bot
	this.HUD.botHUD = new SquarePrimitive(this.scene, 0, 1/5, 8/5, 0);
	this.HUD.botHUD.texture = new CGFtexture(this.scene, "primitives/Hud/Bottom.png"); 
	
	//Butões Luzes
	this.HUD.LightON = new SquarePrimitive(this.scene, 0, 1/5, 2/5, 0);
	this.HUD.LightON.textureActive = new CGFtexture(this.scene, "primitives/Hud/ButaoLuzONactivo.png");
	this.HUD.LightON.textureInactive = new CGFtexture(this.scene, "primitives/Hud/ButaoLuzONdesactivado.png"); 
	this.HUD.LightOFF = new SquarePrimitive(this.scene, 0, 1/5, 2/5, 0);
	this.HUD.LightOFF.textureActive = new CGFtexture(this.scene, "primitives/Hud/ButaoLuzOFFactivo.png");
	this.HUD.LightOFF.textureInactive = new CGFtexture(this.scene, "primitives/Hud/ButaoLuzOFFdesactivado.png"); 
	
	//Butões Cenas LSX
	this.HUD.AmbientButton = new SquarePrimitive(this.scene, 0, 1/5, 4/5, 0);
	this.HUD.AmbientButton.texture1 = new CGFtexture(this.scene, "primitives/Hud/ButaoCenasQuarto.png");
	this.HUD.AmbientButton.texture2 = new CGFtexture(this.scene, "primitives/Hud/ButaoCenasOceano.png");
	this.HUD.AmbientButton.texture3 = new CGFtexture(this.scene, "primitives/Hud/ButaoCenasEspaco.png");
}
GameState.prototype.createMenu = function () {
	this.Menu.appearance = new CGFappearance(this.scene);
	this.Menu.appearance.setAmbient(1, 1, 1, 1);
	this.Menu.appearance.setDiffuse(0.0, 0.0, 0.0, 1);	
	this.Menu.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
	this.Menu.appearance.setEmission(0.7, 0.7, 0.7, 2);
	this.Menu.appearance.setShininess(0);
	
	//Back
	this.Menu.BackSquare = new SquarePrimitive(this.scene, 0, 1, 1, 0);
	this.Menu.BackSquare.texture1 = new CGFtexture(this.scene, "primitives/Hud/Menu1.png"); 
	this.Menu.BackSquare.texture2 = new CGFtexture(this.scene, "primitives/Hud/Menu2.png"); 
	
	//Board Choice
	this.Menu.Board1 = new SquarePrimitive(this.scene, 0, 1, 1/2, 0);
	this.Menu.Board1.texture = new CGFtexture(this.scene, "primitives/Hud/Board1.png");
	this.Menu.Board2 = new SquarePrimitive(this.scene, 0, 1, 1/2, 0);
	this.Menu.Board2.texture = new CGFtexture(this.scene, "primitives/Hud/Board2.png"); 
	this.Menu.Board3 = new SquarePrimitive(this.scene, 0, 1/2, 1, 0);
	this.Menu.Board3.texture = new CGFtexture(this.scene, "primitives/Hud/Board3.png"); 
	
	//Game Mode Choice
	this.Menu.Mode = new SquarePrimitive(this.scene, 0, 1/2, 1, 0);
	this.Menu.Mode.texture1 = new CGFtexture(this.scene, "primitives/Hud/HumVSHum.png");
	this.Menu.Mode.texture2 = new CGFtexture(this.scene, "primitives/Hud/HumVSeasy.png"); 
	this.Menu.Mode.texture3 = new CGFtexture(this.scene, "primitives/Hud/HumVShard.png"); 
	

}

GameState.prototype.logic = function () {
	
		// 0 - Waiting for scene to load
			// 1 - Choosing Board
			// 2 - Choosing Difficulty
			// 3 - Waiting for the pieces to spawn
		// Turns
			// 21 - Player White's Turn - piece
			// 22 - Player White's Turn - board
			// 23 - Player Black's Turn - piece
			// 24 - Player Black's Turn - board
			
		// Turn Animation
			// 31 - Waiting for a white piece animation
			// 32 - Waiting for a black piece animation
		
		// Turn Prolog Logic
			// 33 - Resolving White turn validity 
			// 33 - Resolving Black turn validity 
	
	switch(this.state){
	case 0: //Waiting for scene to load
		if(this.scene.graphs[this.scene.Ambient].loadedOk)
		{
			this.state = 1;	
		}
		break;
	case 1:
		if(this.PickingLogic())
		{	
			this.state = 2;
		}
		break;
	case 2:
		if(this.PickingLogic())
		{	
			this.spawnAnimations();
			this.state = 3;
		}
		break;
	case 3: //Waiting for the pieces to spawn
		this.PickingLogic();
		if (this.scene.tempo_actual > this.waitUntil)
		{
			this.state = 21;
			console.log("============== E a vez do jogador branco ==============");
		}
		break;
	case 21: //Player White's Turn - piece
		if (this.PickingLogic())
		{
			this.state = 22;
		}
		break;
	case 22:
		if (this.PickingLogic())
		{
			//Log the movement
			this.LogMovement(this.selectedpiece, this.selectedboard);
			
			this.isMoveValid(this.selectedpiece, this.selectedboard);
			
			this.state = 33;
		}
		break;
	case 23:
		// 23 - Player Black's Turn - piece
		if (this.gamemode == 1)
		{
			if (this.PickingLogic())
				this.state = 24;
		}
		else
		{
			this.askForRandomMove();
			this.state = 24
		}
		break;
	case 24:
		if (this.gamemode == 1)
		{
			if (this.PickingLogic())
			{
				//Log the movement
				this.LogMovement(this.selectedpiece, this.selectedboard);
				
				this.isMoveValid(this.selectedpiece, this.selectedboard);
				
				this.state = 34;
			}
		}	
		else
		{
			if (!this.requestPending)
			{
				this.LogMovement(this.selectedpiece, this.selectedboard);
				
				this.isMoveValid(this.selectedpiece, this.selectedboard);
				
				this.state = 34;
			}
				
		}
		
		break;	
	case 31: 
		this.PickingLogic();
		
		/*
		//Change camera
		//(5000- (this.waitUntil-this.scene.tempo_actual) )
		var angle = 1  * degToRad;
		this.scene.camera.orbit(this.scene.axis.Y,angle);
		this.scene.cameraposition = this.scene.camera.position.slice();
		*/
		
		if (this.scene.tempo_actual > this.waitUntil)
		{
			this.updateScore();
			this.state = 23;
			console.log("============== E a vez do jogador preto ==============");
		}
		break;
	case 32: 
		this.PickingLogic();
		if (this.scene.tempo_actual > this.waitUntil)
		{
			this.updateScore();
			this.state = 21;
			console.log("============== E a vez do jogador branco ==============");
		}
		break;
	case 33: 
		if (!this.requestPending)
		{
			if(this.moveValid)
			{
				this.moveValid = false;
				this.PieceMovementLogic(this.selectedpiece, this.selectedboard);
				this.state = 31;
			}
			else
			{
				console.log("EEEEEEEEEEEEE Move wasn't valid, pick another piece EEEEEEEEEEEEE");
				this.state = 21;
			}
		}
		
		break;
	case 34:
		if (!this.requestPending)
		{
			if(this.moveValid)
			{
				this.moveValid = false;
				this.PieceMovementLogic(this.selectedpiece, this.selectedboard);
				this.state = 32;
			}
			else
			{
				console.log("EEEEEEEEEEEEE Move wasn't valid, pick another piece EEEEEEEEEEEEE");
				this.state = 23;
			}
		}
		break;
		
	default:
		this.logPicking();
		break;
	}
}

GameState.prototype.PickingLogic = function () {
	/*
	id list:
		1-9: Board Tiles.
		
		11-13 - Peças Pequenas Brancas
		14-16 - Peças Médias Brancas
		17-19 - Peças Grandes Brancas
		
		21-23 - Peças Pequenas Pretas
		24-26 - Peças Médias Pretas
		27-29 - Peças Grandes Pretas
		
		31 - Primeiro Ambiente
		32 - Segundo Ambiente
		33 - Terceiro Ambiente
		34 - Ligar Luzes
		35 - Desligar Luzes
		36 - Undo
		
		41 - Escolher Tabuleiro 1
		42 - Escolher Tabuleiro 2
		43 - Escolher Tabuleiro 3
		
		44 - Escolher Humano vs Humano
		45 - Escolher Humano vs CPU (Fácil)
		46 - Escolher Humano vs CPU (Dificil)
*/
	
	
	if (this.scene.pickMode == false) {
		if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
			var obj = this.scene.pickResults[0][0];
			var customId = this.scene.pickResults[0][1];
			
			//Esvaziar o array de picks
			this.scene.pickResults.splice(0,this.scene.pickResults.length); 
			
			if (obj){
				//Foi excolhido um elemento do tabuleiro 
				if( customId < 30){ 
					if(this.state == 21 || this.state == 23)
						return this.PiecePicked(obj,customId);
					
					if(this.state == 22 || this.state == 24)
						return this.BoardPicked(obj,customId);
				}
				
				if(customId > 30 && customId < 40)
				{
					if(this.state > 2)
						this.OptionsPicked(obj,customId);
				}
				
				if(customId > 40 && customId < 50)
				{
					return this.MenuPicked(obj,customId);
				}
			}
		}
	}
	return false;
}
GameState.prototype.PiecePicked = function (obj,customId) {		
	console.log("Selected piece:" + customId); //Log
	//Indicar que a nova peça está selecionada, e desselecionar a anterior
	if (this.selectedpiece != null)
			this.selectedpiece.selected = false;
	this.selectedpiece = obj;
	this.selectedpiece.selected = true;
	
	//Guardar o tipo de peça
	this.selectedtype = obj.objectName();
	
	return true;
				
}
GameState.prototype.BoardPicked = function (obj,customId) {
	// Se o id for maior que 10, foi pegada uma peça e não um tabuleiro. Fazemos a alteração da selecção. 
	// Semelhante à função anterior.
	if( customId > 10){ 
		
		if (this.selectedpiece.getid() != obj.getid())
		//A peça carregada é diferente da selecionada
		{
		this.selectedpiece.selected = false;
		this.selectedpiece = obj;
		this.selectedpiece.selected = true;
		this.selectedtype = obj.objectName();
		console.log("Selected piece:" + customId);
		}
		else
		//A peça carregada é a mesma que a selecionada
		{
			this.selectedpiece.selected = false;
			this.state--;
		}
		
		this.scene.pickResults.splice(0,this.scene.pickResults.length);
		return false;
	}
	
	//Guarda-se o objecto do tabuleiro encontrado
	this.selectedboard = obj; 
	
	//Se uma peça e uma casa do tabuleiro estão selecionados, já não é necessário indicar qual a peça selecionada
	this.selectedpiece.selected = false;
	
	console.log("Selected board:" + customId); //log
	return true;
}
GameState.prototype.OptionsPicked = function (obj,customId) {
	
	if(customId == 34)
	{
		this.scene.Lights_On = true;
		console.log("Light Switch ON!");
	}
	else if (customId == 35)
	{
		this.scene.Lights_On = false;
		console.log("Light Switch OFF!");
	}else if (customId == 31)
	{
		this.scene.Ambient = 'Quarto';
	}else if (customId == 32)
	{
		this.scene.Ambient = 'Mar';
	}else if (customId == 33)
	{
		this.scene.Ambient = 'Espaco';
	}
		
}
GameState.prototype.MenuPicked = function (obj,customId) {
	
	if(customId > 40 && customId < 44)
	{
		this.board = new Tabuleiro(this.scene,customId-40);
		return true;	
	}
	
	if(customId > 43 && customId < 47)
	{
		this.gamemode = customId-43;
		return true;	
	}
	
	
	return false;
}

GameState.prototype.spawnAnimations = function() {
	for (var i = 11; i < 20; i++)
	{
		this.WhitePieces[i].spawnAnimation();
		this.BlackPieces[i+10].spawnAnimation();
	}
	this.waitUntil = 2000;
	this.scene.tempo_inicio = 0;
	this.scene.tempo_actual = 0;
	console.log("Scene is now loaded, clock time set to 0");
}
GameState.prototype.PieceMovementLogic = function(selectedpiece, selectedboard){
	
	//----------Remove Piece from Floor where it was.
	if(selectedpiece.placed)
	{
		//Uma situação especial de erro: Uma peça que sai de uma casa do tabuleiro tem de sair origatóriamente do andar inferior
		if (selectedpiece.placed_on_floor != 1)
			this.LogAbsoluteDisaster();
		//Situação: Se removermos uma peça do andar de baixo, e esse andar tinha duas peças que já lá deviam estar fixas
		if (selectedpiece.placed_on_floor == 1 && selectedpiece.placed_on_board.bottomDoubleFilled)
			this.LogAbsoluteDisaster();
		//Situação: Mesmo que a primeira, mas a verificar ela altura da torre
		if (selectedpiece.placed_on_board.currentheight > 1)
			this.LogAbsoluteDisaster();
		//Situação: Peças já no tabuleiro não podem mudar para casas vazia
		if (selectedboard.currentheight == 0)
			this.LogAbsoluteDisaster();
		
		//Ao remover a peça de uma casa, é preciso mudar os valores nessa casa
		selectedpiece.placed_on_board.towerowner = 0;
		selectedpiece.placed_on_board.bottomFloor = null;
		selectedpiece.placed_on_board.currentheight = 0;
		selectedpiece.placed_on_board = null;
		selectedpiece.placed_on_floor = null;
	}
	else
	{
		//Situação: Peças que vem de fora do tabuleiro tem de ser postas em casas vazias!
		if(selectedboard.currentheight != 0)
			this.LogAbsoluteDisaster();
	}
	
	//----------Animate
	var Large_eats_small = false;
	//É necessário reconhecer quando uma peça grande está a "comer" uma peça pequena, rodeando-a no mesmo andar
	if (selectedpiece.objectName() == "GamePieceLarge" && selectedboard.currentheight == 1)
		if(selectedboard.bottomFloor.objectName() == "GamePieceSmall")
			Large_eats_small = true;
	var targetheight = 0.1275;	//Altura do tabuleiro
	if(!Large_eats_small)
		targetheight += (0.15*selectedboard.currentheight); //Altura da torre
	
	//Arranjos na animação dependentes do tabuleiro
	if (this.board.configuration == 1)
		selectedpiece.AnimateTowards(selectedboard.x + 1, targetheight, selectedboard.z - 0.25, 5, this.scene.tempo_actual/1000);
	if (this.board.configuration == 2)
		selectedpiece.AnimateTowards(selectedboard.x + 0.5, targetheight, selectedboard.z, 5, this.scene.tempo_actual/1000);
	if (this.board.configuration == 3)
		selectedpiece.AnimateTowards(selectedboard.x - 0.5, targetheight, selectedboard.z + 1, 5, this.scene.tempo_actual/1000);
	
	if(!Large_eats_small)
		selectedboard.currentheight++;
	
	//----------Add piece to Floor it'll go to in it.
	if (selectedboard.currentheight == 1)
	{
		//Situação: Acima descrito com a criação da flag
		if (Large_eats_small)
		{
			selectedboard.bottomFloor.can_move = false;
			selectedpiece.can_move = false;
			selectedboard.bottomDoubleFilled = true;
		}
		selectedboard.bottomFloor = selectedpiece;
	}
	if (selectedboard.currentheight == 2)
	{
		selectedboard.bottomFloor.can_move = false;
		selectedboard.mediumFloor = selectedpiece;
		selectedpiece.can_move = false;
		//Situação: A peça grande não pode ir para o segundo andar
		//Situação: A peça pequena só pode ir para cima de uma peça média.
		//Situação: A peça média só pode ir para cima de uma peça grande.
		if(selectedpiece.objectName() == "GamePieceLarge" || (selectedpiece.objectName() == "GamePieceSmall" &&  selectedboard.bottomFloor.objectName() != "GamePieceMedium") 
														|| (selectedpiece.objectName() == "GamePieceMedium" &&  selectedboard.bottomFloor.objectName() != "GamePieceLarge") )
			this.LogAbsoluteDisaster();
	}
	if (selectedboard.currentheight == 3)
	{
		selectedboard.mediumFloor.can_move = false;
		selectedboard.topFloor = selectedpiece;
		selectedpiece.can_move = false;
		//Situação: A peça grande não pode ir para o terceiro andar
		//Situação: A peça grande não pode ir para o terceiro andar
		if(selectedpiece.objectName() == "GamePieceLarge" || selectedpiece.objectName() == "GamePieceMedium" )
			this.LogAbsoluteDisaster();
	}	
	
	//----------Crossreferences
	selectedpiece.placed = true;
	selectedpiece.placed_on_board = selectedboard;
	selectedpiece.placed_on_floor = selectedboard.currentheight;
	selectedboard.towerowner = selectedpiece.color;
	
	//----------Timing the animation
	this.waitUntil = this.scene.tempo_actual + 5000;
	
	
}

GameState.prototype.updateAnimations = function (currTime){
	//Avisar todas as peças do tempo para estas fazerem as suas animações.
	for(var i = 11; i < 20; i++){
		this.WhitePieces[i].updateAnimations(currTime);
		this.BlackPieces[i+10].updateAnimations(currTime);
	}
}

GameState.prototype.isMoveValid = function(Piece, TargetBoard){
	//Delete server game state
	this.sendPrologRequest("retract_everything");
	
	
	//Define a board equal to the current's
	if( this.state == 22)
		this.sendPrologRequest("turn(pl1)");
	else
		this.sendPrologRequest("turn(pl2)");
	this.sendPrologRequest(this.board.turnBoardtoStringProlog());
	this.sendPrologRequest("chosen_board(" + this.board.configuration + ")");
	this.sendPrologRequest("player_1(" + this.countUnplacedSmallWhite() + "," + this.countUnplacedMediumWhite() + "," + this.countUnplacedLargeWhite() + ")");
	this.sendPrologRequest("player_2(" + this.countUnplacedSmallBlack() + "," + this.countUnplacedMediumBlack() + "," + this.countUnplacedLargeBlack() + ")");
	this.sendPrologRequest("assert_everything_else");
	
	this.requestPending = true;
	this.moveValid = false;
	
	//Send a move
	if(!Piece.placed)
		this.sendPrologRequest("checkPlace(" + Piece.pieceTypeProlog() + "," + TargetBoard.getid() + ")");
	else
		this.sendPrologRequest("checkMove(" + Piece.placed_on_board.getid() + "," + TargetBoard.getid() +")");

	var theself = this;
	this.moveValidRequest(theself);
	
}
GameState.prototype.updateScore = function(){
	//Delete server game state
	this.sendPrologRequest("retract_everything");
	
	//Define a board equal to the current's
	this.sendPrologRequest(this.board.turnBoardtoStringProlog());
	this.sendPrologRequest("assert_everything_else");
	
	//Get scores for that board
	this.sendPrologRequest("count_points_players");
	var theself = this;
	this.sendScoreRequest(1, theself);
	this.sendScoreRequest(2, theself);
}
GameState.prototype.askForRandomMove = function() {
	//Delete server game state
	this.sendPrologRequest("retract_everything");
	
	//Define a board equal to the current's
	if (this.gamemode == 2)
		this.sendPrologRequest("difficulty(e)");
	else
		this.sendPrologRequest("difficulty(h)");
	this.sendPrologRequest("turn(pl2)");
	this.sendPrologRequest("player_1(" + this.countUnplacedSmallWhite() + "," + this.countUnplacedMediumWhite() + "," + this.countUnplacedLargeWhite() + ")");
	this.sendPrologRequest("player_2(" + this.countUnplacedSmallBlack() + "," + this.countUnplacedMediumBlack() + "," + this.countUnplacedLargeBlack() + ")");
	this.sendPrologRequest("chosen_board(" + this.board.configuration + ")");
	this.sendPrologRequest(this.board.turnBoardtoStringProlog());
	this.sendPrologRequest("assert_everything_else");
	
	
	//Async - Check what movement type and set it all up.
	this.requestPending = true;
	var theself = this;
	if (this.gamemode == 2)
		this.randomMoveEasyRequest(theself);
	
	
	
}

GameState.prototype.countUnplacedSmallWhite = function(){
	var count = 0;
	if (!this.WhitePieces[11].placed)
		count++;
	if (!this.WhitePieces[12].placed)
		count++;
	if (!this.WhitePieces[13].placed)
		count++;
	return count;
}
GameState.prototype.countUnplacedMediumWhite = function(){
	var count = 0;
	if (!this.WhitePieces[14].placed)
		count++;
	if (!this.WhitePieces[15].placed)
		count++;
	if (!this.WhitePieces[16].placed)
		count++;
	return count;
}
GameState.prototype.countUnplacedLargeWhite = function(){
	var count = 0;
	if (!this.WhitePieces[17].placed)
		count++;
	if (!this.WhitePieces[18].placed)
		count++;
	if (!this.WhitePieces[19].placed)
		count++;
	return count;
}
GameState.prototype.countUnplacedSmallBlack = function(){
	var count = 0;
	if (!this.BlackPieces[21].placed)
		count++;
	if (!this.BlackPieces[22].placed)
		count++;
	if (!this.BlackPieces[23].placed)
		count++;
	return count;
}
GameState.prototype.countUnplacedMediumBlack = function(){
	var count = 0;
	if (!this.BlackPieces[24].placed)
		count++;
	if (!this.BlackPieces[25].placed)
		count++;
	if (!this.BlackPieces[26].placed)
		count++;
	return count;
}
GameState.prototype.countUnplacedLargeBlack = function(){
	var count = 0;
	if (!this.BlackPieces[27].placed)
		count++;
	if (!this.BlackPieces[28].placed)
		count++;
	if (!this.BlackPieces[29].placed)
		count++;
	return count;
}

GameState.prototype.LogAbsoluteDisaster = function(){
	console.log("EEEEEEEEEEEEE                     Moving this piece is inconsistent with the game rules!               EEEEEEEEEEEEE");
	console.log("EEEEEEEEEEEEE    The animation engine doesn't care, however expect severe issues with the game logic   EEEEEEEEEEEEE");
	console.log("EEEEEEEEEEEEE                                   How did you even do this?                              EEEEEEEEEEEEE");
}
GameState.prototype.LogMovement = function(selectedpiece, selectedboard){
	console.log("Going to try moving piece " + selectedpiece.getid() + " towards board "+selectedboard.getid() );
	console.log("Inicial coordinates: x "+ selectedpiece.x + " z " + selectedpiece.z);
	console.log("Final coordinates: x "+ selectedboard.x + " z " + selectedboard.z);
}

GameState.prototype.sendPrologRequest = function(requestString){
	var requestPort = 8081;
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

	console.log("Sending ProLog Request: " + requestString);
	
	request.onload = function(data){console.log("ProLog request successful. Reply: " + data.target.response);};
	request.onerror = function(){console.log("Error waiting for ProLog response");};

	
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
}
GameState.prototype.sendScoreRequest = function(playernumber, theself){
	var requestPort = 8081;
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:'+requestPort+'/'+"points_player_"+playernumber, true);

	console.log("Sending ProLog Request: " + "points_player_" + playernumber);
	
	if(playernumber == 1)
		request.onload = function(data){console.log("White Player's score changed: " + data.target.response); theself.WhiteScore = parseFloat(data.target.response); };
	else if(playernumber == 2)
		request.onload = function(data){console.log("Black Player's score changed: " + data.target.response); theself.BlackScore = parseFloat(data.target.response); };
	else
		request.onload = function(data){console.log("ProLog request successful. Reply: " + data.target.response);};
			
	request.onerror = function(){console.log("Error waiting for ProLog response");};

	
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
}
GameState.prototype.moveValidRequest = function(theself){
	var requestPort = 8081;
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:'+requestPort+'/'+"moveValid", true);
	console.log("Sending ProLog Request: " + "moveValid");
	
	request.onload = function(data){ theself.requestPending = false; if(data.target.response == 'OK') theself.moveValid = true; else theself.moveValid = false; };		
	request.onerror = function(){console.log("Error waiting for ProLog response"); theself.requestPending = false; theself.moveValid = false;};

	
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
}
GameState.prototype.randomMoveEasyRequest = function(theself){
	var requestPort = 8081;
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:'+requestPort+'/'+"random_move", true);
	console.log("Sending ProLog Request: " + "random_move");
	
	request.onload = function(data){ 
										theself.requestPending = false; theself.moveValid = false;
										var results = data.target.response.split(",");
										if(results[0] == "1")
										{
											if(results[1] == 'sp')
											{
												if(!theself.BlackPieces[21].placed)
													theself.selectedpiece = theself.BlackPieces[21];
												if(!theself.BlackPieces[22].placed)
													theself.selectedpiece = theself.BlackPieces[22];
												if(!theself.BlackPieces[23].placed)
													theself.selectedpiece = theself.BlackPieces[23];
											} else if(results[1] == 'mp')
											{
												if(!theself.BlackPieces[24].placed)
													theself.selectedpiece = theself.BlackPieces[24];
												if(!theself.BlackPieces[25].placed)
													theself.selectedpiece = theself.BlackPieces[25];
												if(!theself.BlackPieces[26].placed)
													theself.selectedpiece = theself.BlackPieces[26];
											} else {
												if(!theself.BlackPieces[27].placed)
													theself.selectedpiece = theself.BlackPieces[27];
												if(!theself.BlackPieces[28].placed)
													theself.selectedpiece = theself.BlackPieces[28];
												if(!theself.BlackPieces[29].placed)
													theself.selectedpiece = theself.BlackPieces[29];
											}
											theself.selectedboard = theself.board.hexagons[parseFloat(results[3])];
										}
										else if(results[0] == "2")
										{		
											theself.selectedpiece = theself.board.hexagons[parseFloat(results[2])].bottomFloor;
											theself.selectedboard = theself.board.hexagons[parseFloat(results[3])];
										}
										else
											console.log("Disaster! " + data.target.response);
									};		
	request.onerror = function(){console.log("Error waiting for ProLog response"); 
												theself.requestPending = false; 
												theself.moveValid = false;};

	
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
}


