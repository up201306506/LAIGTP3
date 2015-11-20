/**
 * Construtor da classe Terrain.
 * Guarda um objecto Shader que usa um Shader de vertices e um shader de fragmento de cor
 * 
 * @param scene	O objecto CGFscene em que vai ser apresentado o Terrain
 * @param Text_path Localização (path) onde se encontra o ficheiro de textura de cores. Deve ter dimensões multiplas de 2
 * @param Height_path Localização (path) onde se encontra o ficheiro de textura de altura. Deve ter dimensões multiplas de 2
 * @see #makeSurface(divs)
 */
function Terrain(scene, Text_path, Height_path) {
	this.scene = scene;
 	CGFobject.call(this,scene);
    this.surface;
    this.makeSurface(200); //Não tentem meter maior.
	this.Texture = new CGFtexture(this.scene, Text_path);
	this.HeightMap = new CGFtexture(this.scene, Height_path);
	
	
	//Passei três horas a tentar perceber porque raio isto não dava com Texture.bind()
	this.appearance = new CGFappearance(this.scene);
	this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
	this.appearance.setShininess(120);
	this.appearance.setTexture(this.Texture);
	this.appearance.setTextureWrap('REPEAT', 'REPEAT');
	
	
	
	
	
	this.Shader = new CGFshader(this.scene.gl, "shaders/extrude.vert", "shaders/singletext.frag")
	this.Shader.setUniformsValues({HeightMap: 1}); //Esta função tem um console.log implementado. Se aparecer um "1" ao calhas, vem daqui.
	this.Shader.setUniformsValues({normScale: 1.4});
	
 };

 Terrain.prototype = Object.create(CGFobject.prototype);
 Terrain.prototype.constructor = Terrain;

/**
 * Forma e guarda em this.surface um objecto CGFnurbsSurface 
 *
 * @param divs Numero de partes (vertices - 1) que vão ser usados em AMBOS sentidos UV 
 */
Terrain.prototype.makeSurface = function (divs) {
		
	var nurbsSurface = new CGFnurbsSurface(1, 1, [0, 0, 1, 1], [0, 0, 1, 1], 
						[	// U = 0
						[ // V = 0..1;
							 [-5, 0, 5, 1 ],
							 [-5, 0, -5, 1 ]
							
						],
						// U = 1
						[ // V = 0..1
							 [ 5, 0, 5, 1 ],
							 [ 5, 0, -5, 1 ]							 
						]
					]);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surface = new CGFnurbsObject(this.scene, getSurfacePoint, divs, divs );
	
};


/**
 * Mostra a superfície na scene 
 *
 */
Terrain.prototype.display= function()
{
		this.scene.pushMatrix();
		
		this.appearance.apply();
		//this.Texture.bind();
		this.HeightMap.bind(1);
		
		this.scene.setActiveShader(this.Shader);
		this.surface.display();
		this.scene.setActiveShader(this.scene.defaultShader);
		
		
		this.scene.popMatrix();
};
