
var degToRad = Math.PI / 180.0;

function GameScene() {
    CGFscene.call(this);
    this.texture = null;
	this.graphs = [];
}

GameScene.prototype = Object.create(CGFscene.prototype);
GameScene.prototype.constructor = GameScene;

GameScene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

	this.initCameras();
    this.initLights();
    this.gl.clearColor(0.7, 0.8, 0.7, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	this.enableTextures(true);

	/*Tempo*/
	this.tempo_inicio = 0;
	this.tempo_actual = 0;
    this.setUpdatePeriod(1000/60);
	
	
	/*Jogo*/
	this.Game = new GameState(this);
	this.TableTexture = new CGFtexture(this, "primitives/assets/tabletex.jpg");
	this.TableLegsTexture = new CGFtexture(this, "primitives/assets/metal.jpg");
	this.Table = new Table(this,this.TableTexture, this.TableLegsTexture);
	this.setPickEnabled(true);
	
	/*Ambiente*/
	this.Lights_On = true;
	this.Ambient = 'Quarto';
	this.PreviousAmbient = '';
	this.Ambientchoice = ['Quarto','Mar','Espaço'];
	
	this.GraphArrays = [];	
	
};

GameScene.prototype.initLights = function () {
	
	this.lights[0].setPosition(3,2,3,1);
	this.lights[0].setAmbient(0,0,0,1);
	this.lights[0].setDiffuse(0.9,0.9,0.9,1);
	this.lights[0].setSpecular(0.4,0.4,0.4,1);
	this.lights[1].update();

	
	this.lights[0].setVisible(true);
	this.lights[0].enable();

	
};

GameScene.prototype.initCameras = function () {
	this.camera = new CGFcamera(.4, 0.1, 500, vec3.fromValues(2.5,10,25), vec3.fromValues(2.5, 0, 0));
	};

GameScene.prototype.setDefaultAppearance = function () {
	
	this.setAmbient(0.7, 0.7, 0.7, 1.0);
	this.setDiffuse(0.4, 0.4, 0.4, 1.0);
    this.setSpecular(0.4, 0.4, 0.4, 1.0);
    this.setShininess(10.0);	
};

	//-----------------------------------------------------//
	//-----					onGraphLoaded			-------//
	//-----------------------------------------------------//



GameScene.prototype.onGraphLoaded = function (Graphname) 
{
	/*
		Handler called when the graph is finally loaded. 
		As loading is asynchronous, this may be called already after the application has started the run loop
	*/
	
	this.GraphArrays[Graphname] = {};
	this.GraphArrays[Graphname].Initial_Transform;
	this.GraphArrays[Graphname].SceneNode_id;
	this.GraphArrays[Graphname].LeafArray = []; 
	this.GraphArrays[Graphname].NodeArray = [];	
	this.GraphArrays[Graphname].TextureArray = [];
	this.GraphArrays[Graphname].MaterialArray = [];
	
	this.Read_Graph_Initials(Graphname);
	this.Read_Graph_Illumination(Graphname);
	this.Read_Graph_Materials(Graphname);
	this.Read_Graph_Textures(Graphname);
	
	this.Generate_Graph_Leafs(Graphname);
	this.Generate_Graph_Nodes(Graphname);
	
};


	//-----------------------------------------------------//
	//-----					DISPLAY					-------//
	//-----------------------------------------------------//

GameScene.prototype.display = function () {
    
	this.Game.logic();
	
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	this.updateProjectionMatrix();
    this.loadIdentity();
	this.applyViewMatrix();
	this.setDefaultAppearance();
	

	//Display do Jogo
	this.GameDisplay();
	
	//Display do LSX
	if (this.graphs[this.Ambient].loadedOk)
	{
		if (this.PreviousAmbient != this.Ambient){
			this.Change_Illumination(this.Ambient);
			this.Change_Lights(this.Ambient);
			this.PreviousAmbient = this.Ambient;
			console.log("Changing to " + this.Ambient + " enviroment.");
		}
			
		this.pushMatrix();
		this.multMatrix(this.GraphArrays[this.Ambient].Initial_Transform);
		this.Display_Node(this.Ambient, this.GraphArrays[this.Ambient].SceneNode_id);
		
		this.popMatrix();  //-perspectiva original	
	}
	
	//Light Update
	if (!this.Lights_On)
	{
		for (var i = 0; i < 8; i++)
			this.lights[i].disable();
	}
		else
	{
		for (var i = 0; i < 8; i++)
			this.lights[i].enable();
	}
	for (var i = 0; i < 8; i++)
		this.lights[i].update();
	
	//this.axis.display(); //Comentar para tirar eixos
};


	//-----------------------------------------------------//
	//-----					INITIALS				-------//
	//-----------------------------------------------------//

GameScene.prototype.Read_Graph_Initials = function (Graphname){
	/*
		Usa os valors da tag <INITIALS> do LSX nos seus locais apropriados.
		
		É notável o cálculo da this.Initial_Transform, a matriz de transformações iniciais da cena. Este cálculo
		apenas ocorre uma vez, aqui.
	*/
	
	//camera
	this.camera.near = this.graphs[Graphname].Parser.Initials.view_near;
	this.camera.far = this.graphs[Graphname].Parser.Initials.view_far;
	

	//Transformações Iniciais
	var Transformation_Matrix = mat4.create();
	mat4.identity(Transformation_Matrix);

	this.transformMatrix_m4(Transformation_Matrix, 'translation', 
					this.graphs[Graphname].Parser.Initials.view_translation_xx,
					this.graphs[Graphname].Parser.Initials.view_translation_yy,
					this.graphs[Graphname].Parser.Initials.view_translation_zz);
					
	this.transformMatrix_m4(Transformation_Matrix, 'rotation', 1,0,0, this.graphs[Graphname].Parser.Initials.view_rotation_xx);
	this.transformMatrix_m4(Transformation_Matrix, 'rotation', 0,1,0, this.graphs[Graphname].Parser.Initials.view_rotation_yy);
	this.transformMatrix_m4(Transformation_Matrix, 'rotation', 0,0,1, this.graphs[Graphname].Parser.Initials.view_rotation_zz);
	
	this.transformMatrix_m4(Transformation_Matrix, 'scale', 
					this.graphs[Graphname].Parser.Initials.view_scale_xx,
					this.graphs[Graphname].Parser.Initials.view_scale_yy,
					this.graphs[Graphname].Parser.Initials.view_scale_zz);

	this.GraphArrays[Graphname].Initial_Transform = Transformation_Matrix

	//Axis Length
	this.axis = new CGFaxis(this, this.graphs[Graphname].Parser.Initials.axis_length, 0.1);
	
}

	//-----------------------------------------------------//
	//-----					ILLUMINATION			-------//
	//-----------------------------------------------------//

GameScene.prototype.Read_Graph_Illumination = function (Graphname){	   
		//Ambient Light 
	this.setGlobalAmbientLight(this.graphs[Graphname].Parser.Illumination.ambient[0],
								this.graphs[Graphname].Parser.Illumination.ambient[1],
								this.graphs[Graphname].Parser.Illumination.ambient[2],
								this.graphs[Graphname].Parser.Illumination.ambient[3]);
		
		//Background
	this.gl.clearColor(	this.graphs[Graphname].Parser.Illumination.background[0],
						this.graphs[Graphname].Parser.Illumination.background[1],
						this.graphs[Graphname].Parser.Illumination.background[2],
						this.graphs[Graphname].Parser.Illumination.background[3]);
						
}
GameScene.prototype.Change_Illumination = function (Graphname){

		//Ambient Light 
	this.setGlobalAmbientLight(this.graphs[Graphname].Parser.Illumination.ambient[0],
								this.graphs[Graphname].Parser.Illumination.ambient[1],
								this.graphs[Graphname].Parser.Illumination.ambient[2],
								this.graphs[Graphname].Parser.Illumination.ambient[3]);
		
		//Background
	this.gl.clearColor(	this.graphs[Graphname].Parser.Illumination.background[0],
						this.graphs[Graphname].Parser.Illumination.background[1],
						this.graphs[Graphname].Parser.Illumination.background[2],
						this.graphs[Graphname].Parser.Illumination.background[3]);
}


	//-----------------------------------------------------//
	//-----					LIGHTS					-------//
	//-----------------------------------------------------//
GameScene.prototype.Change_Lights = function (Graphname) {
	

	//Luzes não declaradas no grafo começam inactivas, invisiveis e com emissão nula.
	for (var i = 0; i < 8; i++)
	{
	
		this.lights[i].setSpecular(0,0,0,0);
		this.lights[i].setAmbient(0,0,0,0);
		this.lights[i].setDiffuse(0,0,0,0);
		this.lights[i].update();
    
    	
		this.lights[i].setVisible(false);
		this.lights[i].disable();
	}
	
	for (var i = 0; i < this.graphs[Graphname].Parser.Lights.length; i++)
	{
		

		
		this.lights[i].setPosition(this.graphs[Graphname].Parser.Lights[i].position[0],
									this.graphs[Graphname].Parser.Lights[i].position[1],
									this.graphs[Graphname].Parser.Lights[i].position[2],
									this.graphs[Graphname].Parser.Lights[i].position[3]);
									
		this.lights[i].setAmbient(this.graphs[Graphname].Parser.Lights[i].ambient[0],
									this.graphs[Graphname].Parser.Lights[i].ambient[1],
									this.graphs[Graphname].Parser.Lights[i].ambient[2],
									this.graphs[Graphname].Parser.Lights[i].ambient[3]);
		this.lights[i].setDiffuse(this.graphs[Graphname].Parser.Lights[i].diffuse[0],
									this.graphs[Graphname].Parser.Lights[i].diffuse[1],
									this.graphs[Graphname].Parser.Lights[i].diffuse[2],
									this.graphs[Graphname].Parser.Lights[i].diffuse[3]);
		this.lights[i].setSpecular(this.graphs[Graphname].Parser.Lights[i].specular[0],
									this.graphs[Graphname].Parser.Lights[i].specular[1],
									this.graphs[Graphname].Parser.Lights[i].specular[2],
									this.graphs[Graphname].Parser.Lights[i].specular[3]);
																
		if (this.graphs[Graphname].Parser.Lights[i].enabled){
			this.lights[i].enable();
			this.lights[i].setVisible(true);
			
		}
			else
		this.lights[i].disable();

		this.lights[i].update();

		
	}
	
	
}



	//-----------------------------------------------------//
	//-----					TEXTURES				-------//
	//-----------------------------------------------------//

GameScene.prototype.Read_Graph_Textures = function (Graphname){
	/*
		Usa os valores da tag <TEXTURES> do LSX para criar objectos CGFtexture qe ficam guardado na TextureArray.
		
	*/

	for (var i = 0; i < this.graphs[Graphname].Parser.Textures.length; i++)
	{
		var newText = new CGFtexture(this, this.graphs[Graphname].Parser.Textures[i].path);

		
		newText.id = this.graphs[Graphname].Parser.Textures[i].id;
		newText.factor_s = this.graphs[Graphname].Parser.Textures[i].factor_s;
		newText.factor_t = this.graphs[Graphname].Parser.Textures[i].factor_t;
			
		this.GraphArrays[Graphname].TextureArray[newText.id] = newText;
	}
	
}

	//-----------------------------------------------------//
	//-----					MATERIALS				-------//
	//-----------------------------------------------------//

GameScene.prototype.Read_Graph_Materials = function (Graphname){
	/*
		Usa os valores da tag <MATERIALS> do LSX para criar objectos CGFappearance que ficam guardado na MaterialArray.
		
		Adicionalmente, é criado um material com as mesmas propriedades que a aparecia default da cena. 
		A existencia deste material deve-se à implementação de Display_Leaf()
	*/
	
	//Material Default
	var defMat = new CGFappearance(this);
	defMat.id="SceneDefaultMaterial";
	defMat.setAmbient(0.7, 0.7, 0.7, 1.0);
	defMat.setDiffuse(0.4, 0.4, 0.4, 1.0);
	defMat.setSpecular(0.4, 0.4, 0.4, 1.0);
	defMat.setShininess(10.0);
	defMat.setEmission(0, 0, 0, 1);
	
	this.GraphArrays[Graphname].MaterialArray.push(defMat);
	
	//Materiais do LSX
	for (var i = 0; i < this.graphs[Graphname].Parser.Materials.length; i++){
		
		var newMat = new CGFappearance(this);
		
		newMat.id = this.graphs[Graphname].Parser.Materials[i].id;
		newMat.setAmbient(this.graphs[Graphname].Parser.Materials[i].ambient[0],
									this.graphs[Graphname].Parser.Materials[i].ambient[1],
									this.graphs[Graphname].Parser.Materials[i].ambient[2],
									this.graphs[Graphname].Parser.Materials[i].ambient[3]);
		newMat.setDiffuse(this.graphs[Graphname].Parser.Materials[i].diffuse[0],
									this.graphs[Graphname].Parser.Materials[i].diffuse[1],
									this.graphs[Graphname].Parser.Materials[i].diffuse[2],
									this.graphs[Graphname].Parser.Materials[i].diffuse[3]);
		newMat.setSpecular(this.graphs[Graphname].Parser.Materials[i].specular[0],
									this.graphs[Graphname].Parser.Materials[i].specular[1],
									this.graphs[Graphname].Parser.Materials[i].specular[2],
									this.graphs[Graphname].Parser.Materials[i].specular[3]);	
		newMat.setShininess(this.graphs[Graphname].Parser.Materials[i].shininess);
		newMat.setEmission(this.graphs[Graphname].Parser.Materials[i].emission[0],
							this.graphs[Graphname].Parser.Materials[i].emission[1],
							this.graphs[Graphname].Parser.Materials[i].emission[2],
							this.graphs[Graphname].Parser.Materials[i].emission[3]);
		newMat.setTextureWrap('REPEAT', 'REPEAT');
		
		this.GraphArrays[Graphname].MaterialArray[newMat.id] = newMat;
	}
	
}


	//-----------------------------------------------------//
	//-----					LEAFS					-------//
	//-----------------------------------------------------//

GameScene.prototype.Generate_Graph_Leafs = function (Graphname){
	/*
		Usa os valores da tag <LEAFS> do LSX para criar CGFObjects que ficam guardados na LeafArray.
		
		Todas as primitivas são guardadas no mesmo array independentemente do seu tipo.
		Todas tem um valor de id que as identifica, igual ao dito no LSX.
		
	*/
	
	for (var i = 0; i < this.graphs[Graphname].Parser.Leaves.length; i++)
	{
		if (this.graphs[Graphname].Parser.Leaves[i].type == "rectangle")
		{
			var newRectangle = new SquarePrimitive(this, this.graphs[Graphname].Parser.Leaves[i].lt_x,
														this.graphs[Graphname].Parser.Leaves[i].lt_y,
														this.graphs[Graphname].Parser.Leaves[i].rb_x,
														this.graphs[Graphname].Parser.Leaves[i].rb_y);
			newRectangle.type = "rectangle";
			newRectangle.id = this.graphs[Graphname].Parser.Leaves[i].id;
			
			this.GraphArrays[Graphname].LeafArray[newRectangle.id] = newRectangle;
			
		}
		
	
		if (this.graphs[Graphname].Parser.Leaves[i].type == "cylinder")
		{
			var newCylinder = new CylinderPrimitive(this, this.graphs[Graphname].Parser.Leaves[i].parts,
														this.graphs[Graphname].Parser.Leaves[i].sections, 
														this.graphs[Graphname].Parser.Leaves[i].height, 
														this.graphs[Graphname].Parser.Leaves[i].bot_radius,
														this.graphs[Graphname].Parser.Leaves[i].top_radius);
			
			newCylinder.type = "cylinder";
			newCylinder.id = this.graphs[Graphname].Parser.Leaves[i].id;
			
			this.GraphArrays[Graphname].LeafArray[newCylinder.id] = newCylinder;
		}
		

		if (this.graphs[Graphname].Parser.Leaves[i].type == "sphere")
		{
			var newSphere = new SpherePrimitive(this, 
												this.graphs[Graphname].Parser.Leaves[i].parts,
												this.graphs[Graphname].Parser.Leaves[i].sections,
												this.graphs[Graphname].Parser.Leaves[i].radius);
			newSphere.type = "sphere";
			newSphere.id = this.graphs[Graphname].Parser.Leaves[i].id;

			this.GraphArrays[Graphname].LeafArray[newSphere.id] = newSphere;
		}
		
		
		if (this.graphs[Graphname].Parser.Leaves[i].type == "triangle")
		{
			var newTriangle = new TrianglePrimitive(this, 
												this.graphs[Graphname].Parser.Leaves[i].p1_x,
												this.graphs[Graphname].Parser.Leaves[i].p1_y,
												this.graphs[Graphname].Parser.Leaves[i].p1_z,
												this.graphs[Graphname].Parser.Leaves[i].p2_x,
												this.graphs[Graphname].Parser.Leaves[i].p2_y,
												this.graphs[Graphname].Parser.Leaves[i].p2_z,
												this.graphs[Graphname].Parser.Leaves[i].p3_x,
												this.graphs[Graphname].Parser.Leaves[i].p3_y,
												this.graphs[Graphname].Parser.Leaves[i].p3_z);
				
			newTriangle.type = "triangle";
			newTriangle.id = this.graphs[Graphname].Parser.Leaves[i].id;
					
			this.GraphArrays[Graphname].LeafArray[newTriangle.id] = newTriangle;
		}

		if (this.graphs[Graphname].Parser.Leaves[i].type == "plane")
		{
			var newPlane = new Plane(this, 
												this.graphs[Graphname].Parser.Leaves[i].parts);
				
			newPlane.type = "plane";
			newPlane.id = this.graphs[Graphname].Parser.Leaves[i].id;

			this.GraphArrays[Graphname].LeafArray[newPlane.id] = newPlane;
		}

		if (this.graphs[Graphname].Parser.Leaves[i].type == "patch")
		{
			var newPatch = new Patch(this, 
												this.graphs[Graphname].Parser.Leaves[i].order,
												this.graphs[Graphname].Parser.Leaves[i].partsU,
												this.graphs[Graphname].Parser.Leaves[i].partsV,
												this.graphs[Graphname].Parser.Leaves[i].controlpoints
												);
				
			newPatch.type = "patch";
			newPatch.id = this.graphs[Graphname].Parser.Leaves[i].id;
				
			this.GraphArrays[Graphname].LeafArray[newPatch.id] = newPatch;
		}

		if (this.graphs[Graphname].Parser.Leaves[i].type == "vehicle")
		{
			var newVehicle = new Vehicle(this);
				
			newVehicle.type = "vehicle";
			newVehicle.id = this.graphs[Graphname].Parser.Leaves[i].id;
								
			this.GraphArrays[Graphname].LeafArray[newVehicle.id] = newVehicle;
		}
		
		if (this.graphs[Graphname].Parser.Leaves[i].type == "terrain")
		{
			var newTerrain = new Terrain(this, this.graphs[Graphname].Parser.Leaves[i].texture_path,this.graphs[Graphname].Parser.Leaves[i].heightmap_path);
				
			newTerrain.type = "terrain";
			newTerrain.id = this.graphs[Graphname].Parser.Leaves[i].id;
			
			this.GraphArrays[Graphname].LeafArray[newTerrain.id] = newTerrain;
		}

	}
}


	//-----------------------------------------------------//
	//-----					NODES					-------//
	//-----------------------------------------------------//

GameScene.prototype.Generate_Graph_Nodes = function (Graphname){
	
	/*
		Usa os valores das tags <NODES> do LSX para criar objectos que ficam guardados na NodeArray.
		
		Todos os nodes são identificados pela sua propriedade id, identica à dita pelo LSX
		
	*/
	
	
	//Store root in this.SceneNode_id
	this.GraphArrays[Graphname].SceneNode_id = this.graphs[Graphname].Parser.Root_id;
	
	//make sure root is found
	var found = false;
	
	//Generate every node
	for (var i = 0; i < this.graphs[Graphname].Parser.Nodes.length; i++)
	{
		if (this.graphs[Graphname].Parser.Nodes[i].id == this.graphs[Graphname].Parser.Root_id)
			found = true;
		
		
		
		var newNode = {};
		
		// id
		newNode.id = this.graphs[Graphname].Parser.Nodes[i].id;
		
		//Material
		newNode.materialID = this.graphs[Graphname].Parser.Nodes[i].material_id;
		
		//Texture
		newNode.textureID = this.graphs[Graphname].Parser.Nodes[i].texture_id;
		
		//Transformation Matrix		
		var newMatrix = mat4.create();
		mat4.identity(newMatrix);
		for (var j = 0; j < this.graphs[Graphname].Parser.Nodes[i].Transform.length; j++)
		{
			switch(this.graphs[Graphname].Parser.Nodes[i].Transform[j].type)
			{
			case 'translation':	
				this.transformMatrix_m4(newMatrix, 'translation', 
								this.graphs[Graphname].Parser.Nodes[i].Transform[j].translation_x, 
								this.graphs[Graphname].Parser.Nodes[i].Transform[j].translation_y, 
								this.graphs[Graphname].Parser.Nodes[i].Transform[j].translation_z);
				break;
			case 'rotation':
					if(this.graphs[Graphname].Parser.Nodes[i].Transform[j].axis == 'x')
							this.transformMatrix_m4(newMatrix, 'rotation', 1,0,0, this.graphs[Graphname].Parser.Nodes[i].Transform[j].angle);
						if(this.graphs[Graphname].Parser.Nodes[i].Transform[j].axis == 'y')
							this.transformMatrix_m4(newMatrix, 'rotation', 0,1,0, this.graphs[Graphname].Parser.Nodes[i].Transform[j].angle);
						if(this.graphs[Graphname].Parser.Nodes[i].Transform[j].axis == 'z')
							this.transformMatrix_m4(newMatrix, 'rotation', 0,0,1, this.graphs[Graphname].Parser.Nodes[i].Transform[j].angle);
				break;
				
			case 'scale':
				this.transformMatrix_m4(newMatrix, 'scale', 
							this.graphs[Graphname].Parser.Nodes[i].Transform[j].scale_x, 
							this.graphs[Graphname].Parser.Nodes[i].Transform[j].scale_y,
							this.graphs[Graphname].Parser.Nodes[i].Transform[j].scale_z);
				break;
			default:
				break;
			}
		}
		newNode.transformationMatrix = newMatrix;
		
		
		//Animations
		newNode.Animations = [];
		var time_animations = 0;
		for(var j = 0; j < this.graphs[Graphname].Parser.Nodes[i].Animations.length; j++)
		{
			for(var k = 0; k < this.graphs[Graphname].Parser.Animations.length; k++)
			{
				if (this.graphs[Graphname].Parser.Animations[k].id == this.graphs[Graphname].Parser.Nodes[i].Animations[j])
				{
					var newAnimation;
					if (this.graphs[Graphname].Parser.Animations[k].type == "linear")
					{
						newAnimation = new LinearAnimation(
															this.graphs[Graphname].Parser.Animations[k].id, 
															this.graphs[Graphname].Parser.Animations[k].span, 
															time_animations, 
															"linear", 
															this.graphs[Graphname].Parser.Animations[k].controlpoints);
														
						newNode.Animations.push(newAnimation);	
					}
					if (this.graphs[Graphname].Parser.Animations[k].type == "circular")
					{
						newAnimation = new CircularAnimation(
															this.graphs[Graphname].Parser.Animations[k].id, 
															this.graphs[Graphname].Parser.Animations[k].span, 
															time_animations, 
															"circular",
															this.graphs[Graphname].Parser.Animations[k].center,
															this.graphs[Graphname].Parser.Animations[k].radius,
															this.graphs[Graphname].Parser.Animations[k].startang,
															this.graphs[Graphname].Parser.Animations[k].rotang
															);
														
						newNode.Animations.push(newAnimation);
					}
					time_animations += this.graphs[Graphname].Parser.Animations[k].span;
				}
			}
		}		
		
		
		//Descendents
		newNode.childIDs = [];
		for (var j = 0; j < this.graphs[Graphname].Parser.Nodes[i].Descendants.length; j++)
			newNode.childIDs.push(this.graphs[Graphname].Parser.Nodes[i].Descendants[j]);
		
		this.GraphArrays[Graphname].NodeArray[newNode.id] = newNode;
	}
	
	if (!found)
		console.log("There was no node with the Scene node's id!");
	else
		console.log("The Scene Graph is now loaded onto the Scene object. Length: ");
	
}


	//-----------------------------------------------------//
	//-----				GRAPH DISPLAY				-------//
	//-----------------------------------------------------//
	
var degToRad = Math.PI / 180.0;

GameScene.prototype.Display_Node = function(Graphname, NodeID, parentMatID, parentTexID, MaterialObject, TextureObject){
	/*
		Processa as informações de um Node do grafo e chama recurssivamente os Nodes filhos. Se porventura o filho for uma folha do grafo,
		chama em vez Display_Leaf(). Define portanto um comportamento de pesquisa em profundidade implicito.
		
		materiais e texturas: Encontra quais os materiais a que lhe correspondem ao nó em TextureArray e MaterialArray.
		matriz transformações: Com uso de um Top() à stack de matrizes, cálcula a própria e guarda-a na stack para que os filhos a possam usar
				
	
	*/
	if (typeof this.GraphArrays[Graphname].NodeArray[NodeID] === "undefined") //Node is found, function starts and ends within this clause
	{
		console.log("Node of ID:" + NodeID + ", is missing. That can't be good!");
		return;
	}
		
	var MaterialUsed = null;
	var TextureUsed = null;
	var Texture_ID_sent = null;
	
	//----------------------------------------------------Materials
	if (NodeID == this.GraphArrays[Graphname].SceneNode_id && this.GraphArrays[Graphname].NodeArray[NodeID].materialID == 'null')
		MaterialUsed = this.GraphArrays[Graphname].MaterialArray[0];
	else
		if (this.GraphArrays[Graphname].NodeArray[NodeID].materialID == 'null')
			MaterialUsed = MaterialObject;
		else
			MaterialUsed = this.GraphArrays[Graphname].MaterialArray[this.GraphArrays[Graphname].NodeArray[NodeID].materialID];

	
	////----------------------------------------------------Textures
	if(this.GraphArrays[Graphname].NodeArray[NodeID].textureID == 'clear')
		TextureUsed = null;
	else if(this.GraphArrays[Graphname].NodeArray[NodeID].textureID == 'null' && NodeID != this.GraphArrays[Graphname].SceneNode_id)
		TextureUsed = TextureObject;
	else
		TextureUsed = this.GraphArrays[Graphname].TextureArray[this.GraphArrays[Graphname].NodeArray[NodeID].textureID];
		
	if (TextureUsed == null)
		Texture_ID_sent = null;
	else 
		Texture_ID_sent = TextureUsed.id;
	
	
	
	////----------------------------------------------------Transformations
	this.multMatrix(this.GraphArrays[Graphname].NodeArray[NodeID].transformationMatrix);
		
		
		
	////----------------------------------------------------Animations
	var mostrecentanimation;
	for(var i = 0; i < this.GraphArrays[Graphname].NodeArray[NodeID].Animations.length; i++)
	{
		if (!this.GraphArrays[Graphname].NodeArray[NodeID].Animations[i].done)
		{
			mostrecentanimation = this.GraphArrays[Graphname].NodeArray[NodeID].Animations[i].getMatrix();
			i = this.GraphArrays[Graphname].NodeArray[NodeID].Animations.length;
		}
		
		if (i == this.GraphArrays[Graphname].NodeArray[NodeID].Animations.length-1 && mostrecentanimation == null)
		{
			mostrecentanimation = this.GraphArrays[Graphname].NodeArray[NodeID].Animations[i].getMatrix();
		}	
		
	}
	if (mostrecentanimation != null)
		this.multMatrix(mostrecentanimation);
	
	
	/*//SPIN SPIN SPIIIIIIN!!!
	if(this.GraphArrays[Graphname].NodeArray[NodeID].id == this.GraphArrays[Graphname].SceneNode_id)
	{
		var newMat = mat4.create();
		mat4.identity(newMat);
		this.transformMatrix_m4(newMat, 'rotation', 0,1,0, 8*this.tempo_actual/1000);
		this.multMatrix(newMat);
	}*/
	
	////----------------------------------------------------Children
	
	for(var j = 0; j < this.GraphArrays[Graphname].NodeArray[NodeID].childIDs.length; j++)
	{
		var Selected_Child_ID = this.GraphArrays[Graphname].NodeArray[NodeID].childIDs[j];
		var found = false;
				
		//Child is a node
		
		if (typeof this.GraphArrays[Graphname].NodeArray[Selected_Child_ID] != "undefined")
		{
			this.pushMatrix();
			this.Display_Node(Graphname,
						Selected_Child_ID, 
						MaterialUsed.id,
						Texture_ID_sent,
						MaterialUsed,
						TextureUsed);
			found = true;
			this.popMatrix();
		}
		
		//Child is a leaf
		if (typeof this.GraphArrays[Graphname].LeafArray[Selected_Child_ID] != "undefined")
		{
			this.pushMatrix();
			this.Display_Leaf(Selected_Child_ID, Graphname,
						MaterialUsed,
						TextureUsed);
			found = true;
			this.popMatrix();
		}
		

		if (!found)
			console.log("A child in node "+ NodeID + " with the id: " + Selected_Child_ID + " wasnt found in the graph!");	
	}
		
		
	////----------------------------------------------------End
}

GameScene.prototype.Display_Leaf = function (id, Graphname, MaterialObject, TextureObject){
		/*
			O objectivo final desta função é fazer o display() de uma primitiva e voltar atrás ao Node() mãe para continuar.
			Três outras tarefas ocorrem antes: 	Aplicar o material do Node, 
												aplicar a textura do Node atendendo ao seu factor de escala,
												aplicar as tranformações da cena e todos os nós ao objecto.
	
		*/

	
	//Material
	MaterialObject.apply();
	
	//Texture
	if (TextureObject != null)
	{
		if(this.GraphArrays[Graphname].LeafArray[id].type == "rectangle" || this.GraphArrays[Graphname].LeafArray[id].type == "triangle")
			this.GraphArrays[Graphname].LeafArray[id].updateTexCoords(TextureObject.factor_s, TextureObject.factor_t);
		TextureObject.bind();
	}
	if (this.GraphArrays[Graphname].LeafArray[id].type == 'sphere')	
		this.rotate(90*degToRad,1,0,0);
	
	
	//Display
	this.GraphArrays[Graphname].LeafArray[id].display();
}

	
	
	//-----------------------------------------------------//
	//-----				MATRIX STACK				-------//
	//-----------------------------------------------------//
	
GameScene.prototype.transformMatrix_m4 = function(matrix, transformtype, value_x, value_y, value_z, angle) {
	
	switch(transformtype)
	{
	case 'translation':
		mat4.translate(matrix, matrix, [value_x,value_y,value_z]);
		break;
	case 'rotation':
		mat4.rotate(matrix, matrix, angle*degToRad, [value_x,value_y,value_z]);
		break;
	case 'scale':
		mat4.scale(matrix, matrix, [value_x,value_y,value_z]);
		break;
	default: 
		throw "Invalid transformation!";
		break;
	}
	
	
}

	//-----------------------------------------------------//
	//-----				TIME						-------//
	//-----------------------------------------------------//


GameScene.prototype.update = function(currTime) {
	if(this.tempo_inicio == 0)
	{
		this.tempo_inicio = currTime;
	} else
	{
		this.tempo_actual = currTime - this.tempo_inicio ;
		//console.log(this.tempo_actual);
	}
	
	
	if (this.graphs[this.Ambient].loadedOk)
	{
		
		this.Game.updateAnimations(this.tempo_actual);
		this.updateAnimationNodes(this.GraphArrays[this.Ambient].NodeArray[this.GraphArrays[this.Ambient].SceneNode_id]);
	}
}

GameScene.prototype.updateAnimationNodes = function(Node){

	for(var i = 0; i < Node.Animations.length; i++)
		 Node.Animations[i].updateMatrix(this.tempo_actual);
	 
	 
	for(var i = 0; i < Node.childIDs.length; i++)
	{
		if (typeof this.GraphArrays[this.Ambient].NodeArray[Node.childIDs[i]] != "undefined")
		{
			this.updateAnimationNodes(this.GraphArrays[this.Ambient].NodeArray[Node.childIDs[i]])
		}
		
	}		
	
	
	
}

	//-----------------------------------------------------//
	//-----				GAME						-------//
	//-----------------------------------------------------//
GameScene.prototype.GameDisplay = function(Node){

	this.pushMatrix();
	
	/*Mesa*/
	this.Table.display();
	this.clearPickRegistration();
		
		
	/*Tabuleiro*/
	for (var i = 1; i < 10; i++)
	{
		this.pushMatrix();
		/*Allow picking*/
		if(this.Game.state == 22 || this.Game.state == 24)
		{
			this.clearPickRegistration();
			if (i == this.Game.board.hexagons[i].getid())
				this.registerForPick(i, this.Game.board.hexagons[i]);
			else
				console.log("FIX ID ON HEXAGON!" + i);
		}
		
		/* position the board */
		if(this.Game.board.num == 1)
		{
			this.rotate(90*degToRad,0,1,0);
			this.translate(-2.5,0,.5);
		}
		if(this.Game.board.num == 2)
		{
			this.translate(0.5,0,0);
		}
		if(this.Game.board.num == 3)
		{
			this.translate(-0.5,0,1);
		}
		this.Game.board.hexagons[i].display();
		
		
		this.popMatrix();
	}
	
	
	/*Peças*/
	for (var i = 11; i < 20; i++)
	{
		this.pushMatrix();
		/*Allow picking*/			
		this.clearPickRegistration();
		if(this.Game.state == 21 || this.Game.state == 22)
		{
			if (i == this.Game.WhitePieces[i].getid())
				this.registerForPick(i, this.Game.WhitePieces[i]);
			else
				console.log("FIX ID ON WHITE PIECE!" + i);
		}			
		this.Game.WhitePieces[i].display();
		this.popMatrix();
	}
	for (var i = 21; i < 30; i++)
	{
		this.pushMatrix();
		/*Allow picking*/
		this.clearPickRegistration();
		if(this.Game.state == 23|| this.Game.state == 24)
		{	
			if (i == this.Game.BlackPieces[i].getid())
				this.registerForPick(i, this.Game.BlackPieces[i]);
			else
				console.log("FIX ID ON BLACK PIECE!" + i);
		}
		this.Game.BlackPieces[i].display();
		this.pushMatrix();
	}
		
	this.clearPickRegistration();
	this.popMatrix(); 
}	
	
	