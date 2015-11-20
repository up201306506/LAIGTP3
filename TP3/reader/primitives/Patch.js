/**
 * Construtor da clasee Patch 
 * 
 * @param scene	O objecto CGFscene em que vai ser apresentado o Patch
 * @param order A ordem das curvas em AMBOS os UV. Pode ser 1, 2 ou 3. 
 * @param partsU Numero de partes (vertices - 1) que vão ser usados no sentido U 
 * @param partsV Numero de partes (vertices - 1) que vão ser usados no sentido V 
 * @param controlpoints Lista com listas de pontos que em cada U->V indicam onde se encontram os pontos de controlo do patch em XYZ. 
 * @see #makeSurface(order,partsU,partsV,controlpoints)
 */
function Patch(scene, order,partsU,partsV,controlpoints) {
	this.scene = scene;
 	CGFobject.call(this,scene);
    this.surface;
    this.ready=false;
    this.makeSurface(order,partsU,partsV,controlpoints);
    this.initBuffers();
 };

 Patch.prototype = Object.create(CGFobject.prototype);
 Patch.prototype.constructor = Patch;

/**
 * Forma e guarda em this.surface um objecto CGFnurbsSurface 
 * 
 * @param order A ordem das curvas em AMBOS os UV. Pode ser 1, 2 ou 3. 
 * @param partsU Numero de partes (vertices - 1) que vão ser usados no sentido U 
 * @param partsV Numero de partes (vertices - 1) que vão ser usados no sentido V 
 * @param controlpoints Lista com listas de pontos que em cada U->V indicam onde se encontram os pontos de controlo do patch em XYZ.
 */
Patch.prototype.makeSurface = function (order,partsU,partsV,controlpoints) {
		
	var nurbsSurface;

	for (var i = 0; i < controlpoints.length; i++)
	{
		controlpoints[i].push(1);
	}

	switch(order)
	{
	case 1:
	nurbsSurface = new CGFnurbsSurface(order, order, [0, 0, 1, 1], [0, 0, 1, 1], 
						[	// U = 0
						[ // V = 0..1;
							 controlpoints[0],
							 controlpoints[1],
							
						],
						// U = 1
						[ // V = 0..1
							 controlpoints[2],
							 controlpoints[3]							 
						]
					]);
		break;
	case 2:
	nurbsSurface = new CGFnurbsSurface(order, order,[0, 0, 0, 1, 1, 1], [0, 0, 0, 1, 1, 1], 
						[	// U = 0
						[ // V = 0..1;
							 controlpoints[0],
							 controlpoints[1],
							 controlpoints[2]
							
						],
						// U = 1
						[ // V = 0..1
							 controlpoints[3],
							 controlpoints[4],
							 controlpoints[5]							 
						],
						// U = 2
						[ // V = 0..1
							 controlpoints[6],
							 controlpoints[7],
							 controlpoints[8]							 
						]
					]);
		break;
	case 3:
	nurbsSurface = new CGFnurbsSurface(order, order, [0, 0, 0, 0, 1, 1, 1, 1],[0, 0, 0, 0, 1, 1, 1, 1], 
						[	// U = 0
						[ // V = 0..1;
							 controlpoints[0],
							 controlpoints[1],
							 controlpoints[2],
							 controlpoints[3]
							
						],
						// U = 1
						[ // V = 0..1
							 controlpoints[4],
							 controlpoints[5],
							 controlpoints[6],
							 controlpoints[7]							 
						],
						// U = 2
						[ // V = 0..1;
							 controlpoints[8],
							 controlpoints[9],
							 controlpoints[10],
							 controlpoints[11]
							
						],
						// U = 3
						[ // V = 0..1
							 controlpoints[12],
							 controlpoints[13],
							 controlpoints[14],
							 controlpoints[15]							 
						]
					]);
		break;

	default:
		break;

	}
	



	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surface = new CGFnurbsObject(this.scene, getSurfacePoint, partsU, partsV );
	this.ready = true;


};


 Patch.prototype.initBuffers = function() {
  	this.surface.initBuffers();
};


/**
 * Mostra a superficie na cena 
 * 
 */
Patch.prototype.display= function()
{
	if(this.ready)
	{
		//console.log("display");
		//var transform = mat4.create();
		//mat4.scale(transform, transform, [1,1,1]);
		//this.scene.multMatrix(transform);
		this.surface.display();
	}
		
		
};