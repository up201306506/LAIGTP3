

function Tabuleiro(scene, num){
	CGFobject.call(this,scene);
	this.scene = scene;
	
	if(num==1)
	{
		this.HEXAGON1 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,0,1);
		this.HEXAGON4 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,1,4);
		this.HEXAGON7 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,2,7);

		this.HEXAGON2 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,1,2);
		this.HEXAGON5 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,3,5);
		this.HEXAGON8 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,5,8);

		this.HEXAGON3 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,0,3);
		this.HEXAGON6 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,1,6);
		this.HEXAGON9 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,2,9);
	}
	else if(num==2)
	{
		this.HEXAGON1 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,0,1);
		this.HEXAGON4 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,1,4);
		this.HEXAGON7 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,2,7);

		this.HEXAGON2 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,1,2);
		this.HEXAGON5 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,3,5);
		this.HEXAGON8 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,5,8);

		this.HEXAGON3 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,-1,3);
		this.HEXAGON6 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,0,6);
		this.HEXAGON9 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,1,9);
	}
	else
	{
		this.HEXAGON1 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,0,1);
		
		this.HEXAGON2 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,1,2);
		this.HEXAGON4 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,3,4);

		this.HEXAGON3 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,-1,3);
		this.HEXAGON5 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,0,5);
		this.HEXAGON7 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,1,7);

		this.HEXAGON6 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",3,1,6);
		this.HEXAGON8 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",3,3,8);

		this.HEXAGON9 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",4,0,9);
	}
	
	this.hexagons = [];
	this.hexagons[1] = this.HEXAGON1;this.hexagons[2] = this.HEXAGON2;this.hexagons[3] = this.HEXAGON3;
	this.hexagons[4] = this.HEXAGON4;this.hexagons[5] = this.HEXAGON5;this.hexagons[6] = this.HEXAGON6;
	this.hexagons[7] = this.HEXAGON7;this.hexagons[8] = this.HEXAGON8;this.hexagons[9] = this.HEXAGON9;
}

Tabuleiro.prototype = Object.create(CGFobject.prototype);
Tabuleiro.prototype.constructor = Tabuleiro;

/**
 * 
 *
 */
Tabuleiro.prototype.display = function()
{
	this.scene.pushMatrix();

	this.HEXAGON1.display();
	this.HEXAGON2.display();
	this.HEXAGON3.display();
	this.HEXAGON4.display();
	this.HEXAGON5.display();
	this.HEXAGON6.display();
	this.HEXAGON7.display();
	this.HEXAGON8.display();
	this.HEXAGON9.display();
	

	this.scene.popMatrix();
}