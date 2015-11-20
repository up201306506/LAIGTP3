function SquarePrimitive(scene, tl_x, tl_y, br_x, br_y) {
	CGFobject.call(this,scene);

	
	//position
	this.tl_x=tl_x;
 	this.tl_y=tl_y;
 	this.br_x=br_x;
 	this.br_y=br_y;

	this.height = tl_y - br_y;
	this.width = br_x - tl_x;
	
	this.initBuffers();
};

SquarePrimitive.prototype = Object.create(CGFobject.prototype);
SquarePrimitive.prototype.constructor=SquarePrimitive;


SquarePrimitive.prototype.initBuffers = function () {
	this.vertices = [
            this.tl_x, this.tl_y, 0,	//0 - TOPLEFT
			this.tl_x, this.br_y, 0,	//1 - BOTLEFT
			this.br_x, this.br_y, 0,	//2 - BOTRIGHT
			this.br_x, this.tl_y, 0		//3 - TOPRIGHT
			];

		
	this.normals = [
         0, 0, 1,
         0, 0, 1,
         0, 0, 1,
         0, 0, 1
    ];
	
	this.texCoords = [
		0, 0,
	 	0, 1,
      	1, 1,
      	1, 0
     ];
			
			
	this.indices = [
            0, 1, 2, 
			2, 3, 0
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

SquarePrimitive.prototype.updateTexCoords = function(ampS, ampT)
{
    // declarar novas coordenadas de textura em função dos fatores de amplificação
    this.texCoords= [

		
		0, 0,
	 	0, 1*this.height /ampT,
      	1* this.width/ampS, 1* this.height /ampT,
      	1* this.width/ampS, 0
	];
 
    this.updateTexCoordsGLBuffers();
}
