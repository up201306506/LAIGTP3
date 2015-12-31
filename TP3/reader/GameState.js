function GameState(scene){
	this.scene = scene;
		
	/* Tabuleiro e peças */
	this.board = new Tabuleiro(this.scene,2);
	this.WhitePieces = [];
	this.BlackPieces = [];
	this.createPieces();
	
	/* Animações */
	this.animation_array = [];
	
	/* HUD */
	this.HUD = {};
	this.createHUD();

	/* Estado*/
	this.state = 0;
	
	this.selectedpiece;
	this.selectedtype = 'Nothing';
	this.selectedboard;
	
	this.waitUntil = 0;
	
}

GameState.prototype.createPieces = function (){	
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
	case 0: //Waiting for scene to load
		if(this.scene.graphs[this.scene.Ambient].loadedOk)
		{
			for (var i = 11; i < 20; i++)
			{
				this.WhitePieces[i].spawnAnimation();
				this.BlackPieces[i+10].spawnAnimation();
			}
			this.waitUntil = this.scene.tempo_actual + 2000;
			this.state = 3;
			this.tempo_inicio = 0;
			console.log("Scene is now loaded, clock time set to 0");		
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
			
			if(this.isMoveValid(this.selectedpiece, this.selectedboard))
			{
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
	case 23:
		if (this.PickingLogic())
			this.state = 24;
		break;
	case 24:
		if (this.PickingLogic())
		{
			//Log the movement
			this.LogMovement(this.selectedpiece, this.selectedboard);
			
			if(this.isMoveValid(this.selectedpiece, this.selectedboard))
			{
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
	case 31: 
		this.PickingLogic();
		if (this.scene.tempo_actual > this.waitUntil)
		{
			this.state = 23;
			console.log("============== E a vez do jogador preto ==============");
		}
		break;
	case 32: 
		this.PickingLogic();
		if (this.scene.tempo_actual > this.waitUntil)
		{
			this.state = 21;
			console.log("============== E a vez do jogador branco ==============");
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
		35 - Deligar Luzes
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
	}
		
}
GameState.prototype.MenuPicked = function (obj,customId) {

	return true;
}

GameState.prototype.PieceMovementLogic = function(selectedpiece, selectedboard){
	
	//----------Remove Piece from Floor where it was.
	if(selectedpiece.placed)
	{
		//Uma situação especial de erro: Uma peça que sai de uma casa do tabuleiro tem de sair origatóriamente do andar inferior
		//Situação: Se removermos uma peça do andar de baixo, e esse andar tinha duas peças que já lá deviam estar fixas
		//Situação: Mesmo que a primeira, mas a verificar ela altura da torre
		if (selectedpiece.placed_on_floor != 1 || (selectedpiece.placed_on_floor == 1 && selectedpiece.placed_on_board.bottomDoubleFilled) || selectedpiece.placed_on_board.currentheight > 1)
			this.LogAbsoluteDisaster();
		
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
	selectedpiece.AnimateTowards(selectedboard.x + 0.5, targetheight, selectedboard.z, 5, this.scene.tempo_actual/1000);
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
	
	//----------Timing the animation
	this.waitUntil = this.scene.tempo_actual + 5000;
	
	
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
