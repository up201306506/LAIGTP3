

function Tabuleiro(scene, num){
	CGFobject.call(this,scene);
	this.scene = scene;
	
	if(num==1)
	{
		this.HEXAGON1 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,0);
		this.HEXAGON4 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,1);
		this.HEXAGON7 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,2);

		this.HEXAGON2 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,1);
		this.HEXAGON5 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,3);
		this.HEXAGON8 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,5);

		this.HEXAGON3 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,0);
		this.HEXAGON6 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,1);
		this.HEXAGON9 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,2);
	}
	else if(num==2)
	{
		this.HEXAGON1 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,0);
		this.HEXAGON4 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,1);
		this.HEXAGON7 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,2);

		this.HEXAGON2 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,1);
		this.HEXAGON5 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,3);
		this.HEXAGON8 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,5);

		this.HEXAGON3 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,-1);
		this.HEXAGON6 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,0);
		this.HEXAGON9 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,1);
	}
	else
	{
		this.HEXAGON1 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",0,0);

		this.HEXAGON2 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,1);
		this.HEXAGON4 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",1,3);

		this.HEXAGON3 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,-1);
		this.HEXAGON5 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,0);
		this.HEXAGON7 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",2,1);

		this.HEXAGON6 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",3,1);
		this.HEXAGON8 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",3,3);

		this.HEXAGON9 = new HexagonPrism(scene,"primitives/assets/BigPieceBackground.jpg",4,0);
	}

	
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