
var degToRad = Math.PI / 180.0;

function GameScene() {
    CGFscene.call(this);
    this.texture = null;
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

	this.tempo_inicio = 0;
	this.tempo_actual = 0;
    this.setUpdatePeriod(1000/60);

	
	this.board = new Tabuleiro(this,2);

	this.Lights_On = true;
	this.Ambient = 1;
	this.Ambientchoice = ['Céu','Quarto','Opções', 'Mais Opções'];
	
	
	this.SceneNode_id;
	
	this.LeafArray = []; 
	this.NodeArray = [];	
	this.TextureArray = [];
	this.MaterialArray = [];
	
	
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
	this.camera = new CGFcamera(.4, 0.1, 500, vec3.fromValues(15,15,15), vec3.fromValues(0, 0, 0));
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



GameScene.prototype.onGraphLoaded = function () 
{
	/*
		Handler called when the graph is finally loaded. 
		As loading is asynchronous, this may be called already after the application has started the run loop
	*/
	
	//this.Read_Graph_Initials();
	this.Read_Graph_Illumination();
	//this.Read_Graph_Lights();
	this.Read_Graph_Materials();
	this.Read_Graph_Textures();
	
	this.Generate_Graph_Leafs();
	this.Generate_Graph_Nodes();
	
};


	//-----------------------------------------------------//
	//-----					DISPLAY					-------//
	//-----------------------------------------------------//

GameScene.prototype.display = function () {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	this.updateProjectionMatrix();
    this.loadIdentity();
	this.applyViewMatrix();
	this.setDefaultAppearance();

	
	//Light Update
	if (!this.Lights_On)
			this.lights[0].disable();
		else
			this.lights[0].enable();
		
	this.lights[0].update();	
	

	this.board.display();
	this.axis.display();
    
};


	//-----------------------------------------------------//
	//-----					INITIALS				-------//
	//-----------------------------------------------------//

GameScene.prototype.Read_Graph_Initials = function (){
	/*
		Usa os valors da tag <INITIALS> do LSX nos seus locais apropriados.
		
		É notável o cálculo da this.Initial_Transform, a matriz de transformações iniciais da cena. Este cálculo
		apenas ocorre uma vez, aqui.
	*/
	
	//camera
	this.camera.near = this.graph.Parser.Initials.view_near;
	this.camera.far = this.graph.Parser.Initials.view_far;
	

	//Transformações Iniciais
	var Transformation_Matrix = mat4.create();
	mat4.identity(Transformation_Matrix);

	this.transformMatrix_m4(Transformation_Matrix, 'translation', 
					this.graph.Parser.Initials.view_translation_xx,
					this.graph.Parser.Initials.view_translation_yy,
					this.graph.Parser.Initials.view_translation_zz);
					
	this.transformMatrix_m4(Transformation_Matrix, 'rotation', 1,0,0, this.graph.Parser.Initials.view_rotation_xx);
	this.transformMatrix_m4(Transformation_Matrix, 'rotation', 0,1,0, this.graph.Parser.Initials.view_rotation_yy);
	this.transformMatrix_m4(Transformation_Matrix, 'rotation', 0,0,1, this.graph.Parser.Initials.view_rotation_zz);
	
	this.transformMatrix_m4(Transformation_Matrix, 'scale', 
					this.graph.Parser.Initials.view_scale_xx,
					this.graph.Parser.Initials.view_scale_yy,
					this.graph.Parser.Initials.view_scale_zz);

	this.Initial_Transform = Transformation_Matrix;
	

	//Axis Length
	this.axis = new CGFaxis(this, this.graph.Parser.Initials.axis_length, 0.1);
	
}

	//-----------------------------------------------------//
	//-----					ILLUMINATION			-------//
	//-----------------------------------------------------//

GameScene.prototype.Read_Graph_Illumination = function (){
	/*
		Usa os valores da tag <ILLUMINATION> do LSX nos seus locais apropriados.		
	*/
	   
		//Ambient Light 
	this.setGlobalAmbientLight(this.graph.Parser.Illumination.ambient[0],
								this.graph.Parser.Illumination.ambient[1],
								this.graph.Parser.Illumination.ambient[2],
								this.graph.Parser.Illumination.ambient[3]);
		
		//Background
	this.gl.clearColor(	this.graph.Parser.Illumination.background[0],
						this.graph.Parser.Illumination.background[1],
						this.graph.Parser.Illumination.background[2],
						this.graph.Parser.Illumination.background[3]);
}


	//-----------------------------------------------------//
	//-----					LIGHTS					-------//
	//-----------------------------------------------------//
GameScene.prototype.Read_Graph_Lights = function () {
	
	/*
		Usa os valores da tag <LIGHTS> do LSX nos seus locais apropriados.
		
		Estas declarações apenas ocorrem uma vez. No display, apenas o update() é necessário para utilizar as luzes.
		
	*/
	
	
	console.log("Setting up lights...");
	for (var i = 0; i < this.graph.Parser.Lights.length; i++)
	{
		

		
		this.lights[i].setPosition(this.graph.Parser.Lights[i].position[0],
									this.graph.Parser.Lights[i].position[1],
									this.graph.Parser.Lights[i].position[2],
									this.graph.Parser.Lights[i].position[3]);
									
		this.lights[i].setAmbient(this.graph.Parser.Lights[i].ambient[0],
									this.graph.Parser.Lights[i].ambient[1],
									this.graph.Parser.Lights[i].ambient[2],
									this.graph.Parser.Lights[i].ambient[3]);
		this.lights[i].setDiffuse(this.graph.Parser.Lights[i].diffuse[0],
									this.graph.Parser.Lights[i].diffuse[1],
									this.graph.Parser.Lights[i].diffuse[2],
									this.graph.Parser.Lights[i].diffuse[3]);
		this.lights[i].setSpecular(this.graph.Parser.Lights[i].specular[0],
									this.graph.Parser.Lights[i].specular[1],
									this.graph.Parser.Lights[i].specular[2],
									this.graph.Parser.Lights[i].specular[3]);
																
		if (this.graph.Parser.Lights[i].enabled){
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

GameScene.prototype.Read_Graph_Textures = function (){
	/*
		Usa os valores da tag <TEXTURES> do LSX para criar objectos CGFtexture qe ficam guardado na TextureArray.
		
	*/

	for (var i = 0; i < this.graph.Parser.Textures.length; i++)
	{
		var newText = new CGFtexture(this, this.graph.Parser.Textures[i].path);

		
		newText.id = this.graph.Parser.Textures[i].id;
		newText.factor_s = this.graph.Parser.Textures[i].factor_s;
		newText.factor_t = this.graph.Parser.Textures[i].factor_t;
		this.TextureArray[newText.id] = newText;		
	
	}
	
}

	//-----------------------------------------------------//
	//-----					MATERIALS				-------//
	//-----------------------------------------------------//

GameScene.prototype.Read_Graph_Materials = function (){
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
	this.MaterialArray.push(defMat);
	
	//Materiais do LSX
	for (var i = 0; i < this.graph.Parser.Materials.length; i++){
		
		var newMat = new CGFappearance(this);
		
		newMat.id = this.graph.Parser.Materials[i].id;
		newMat.setAmbient(this.graph.Parser.Materials[i].ambient[0],
									this.graph.Parser.Materials[i].ambient[1],
									this.graph.Parser.Materials[i].ambient[2],
									this.graph.Parser.Materials[i].ambient[3]);
		newMat.setDiffuse(this.graph.Parser.Materials[i].diffuse[0],
									this.graph.Parser.Materials[i].diffuse[1],
									this.graph.Parser.Materials[i].diffuse[2],
									this.graph.Parser.Materials[i].diffuse[3]);
		newMat.setSpecular(this.graph.Parser.Materials[i].specular[0],
									this.graph.Parser.Materials[i].specular[1],
									this.graph.Parser.Materials[i].specular[2],
									this.graph.Parser.Materials[i].specular[3]);	
		newMat.setShininess(this.graph.Parser.Materials[i].shininess);
		newMat.setEmission(this.graph.Parser.Materials[i].emission[0],
							this.graph.Parser.Materials[i].emission[1],
							this.graph.Parser.Materials[i].emission[2],
							this.graph.Parser.Materials[i].emission[3]);
		newMat.setTextureWrap('REPEAT', 'REPEAT');
		
		this.MaterialArray[newMat.id] = newMat;
	}
	
}


	//-----------------------------------------------------//
	//-----					LEAFS					-------//
	//-----------------------------------------------------//

GameScene.prototype.Generate_Graph_Leafs = function (){
	/*
		Usa os valores da tag <LEAFS> do LSX para criar CGFObjects que ficam guardados na LeafArray.
		
		Todas as primitivas são guardadas no mesmo array independentemente do seu tipo.
		Todas tem um valor de id que as identifica, igual ao dito no LSX.
		
	*/
	
	for (var i = 0; i < this.graph.Parser.Leaves.length; i++)
	{
		if (this.graph.Parser.Leaves[i].type == "rectangle")
		{
			var newRectangle = new SquarePrimitive(this, this.graph.Parser.Leaves[i].lt_x,
														this.graph.Parser.Leaves[i].lt_y,
														this.graph.Parser.Leaves[i].rb_x,
														this.graph.Parser.Leaves[i].rb_y);
			newRectangle.type = "rectangle";
			newRectangle.id = this.graph.Parser.Leaves[i].id;
			
			this.LeafArray[newRectangle.id] = newRectangle;
			
		}
		
	
		if (this.graph.Parser.Leaves[i].type == "cylinder")
		{
			var newCylinder = new CylinderPrimitive(this, this.graph.Parser.Leaves[i].parts,
														this.graph.Parser.Leaves[i].sections, 
														this.graph.Parser.Leaves[i].height, 
														this.graph.Parser.Leaves[i].bot_radius,
														this.graph.Parser.Leaves[i].top_radius);
			
			newCylinder.type = "cylinder";
			newCylinder.id = this.graph.Parser.Leaves[i].id;
			
			this.LeafArray[newCylinder.id] = newCylinder;
		}
		

		if (this.graph.Parser.Leaves[i].type == "sphere")
		{
			var newSphere = new SpherePrimitive(this, 
												this.graph.Parser.Leaves[i].parts,
												this.graph.Parser.Leaves[i].sections,
												this.graph.Parser.Leaves[i].radius);
			newSphere.type = "sphere";
			newSphere.id = this.graph.Parser.Leaves[i].id;
			
			this.LeafArray[newSphere.id] = newSphere;
		}
		
		
		if (this.graph.Parser.Leaves[i].type == "triangle")
		{
			var newTriangle = new TrianglePrimitive(this, 
												this.graph.Parser.Leaves[i].p1_x,
												this.graph.Parser.Leaves[i].p1_y,
												this.graph.Parser.Leaves[i].p1_z,
												this.graph.Parser.Leaves[i].p2_x,
												this.graph.Parser.Leaves[i].p2_y,
												this.graph.Parser.Leaves[i].p2_z,
												this.graph.Parser.Leaves[i].p3_x,
												this.graph.Parser.Leaves[i].p3_y,
												this.graph.Parser.Leaves[i].p3_z);
				
			newTriangle.type = "triangle";
			newTriangle.id = this.graph.Parser.Leaves[i].id;
								
			this.LeafArray[newTriangle.id] = newTriangle;
		}

		if (this.graph.Parser.Leaves[i].type == "plane")
		{
			var newPlane = new Plane(this, 
												this.graph.Parser.Leaves[i].parts);
				
			newPlane.type = "plane";
			newPlane.id = this.graph.Parser.Leaves[i].id;
								
			this.LeafArray[newPlane.id] = newPlane;
		}

		if (this.graph.Parser.Leaves[i].type == "patch")
		{
			var newPatch = new Patch(this, 
												this.graph.Parser.Leaves[i].order,
												this.graph.Parser.Leaves[i].partsU,
												this.graph.Parser.Leaves[i].partsV,
												this.graph.Parser.Leaves[i].controlpoints
												);
				
			newPatch.type = "patch";
			newPatch.id = this.graph.Parser.Leaves[i].id;
								
			this.LeafArray[newPatch.id] = newPatch;
		}

		if (this.graph.Parser.Leaves[i].type == "vehicle")
		{
			var newVehicle = new Vehicle(this);
				
			newVehicle.type = "vehicle";
			newVehicle.id = this.graph.Parser.Leaves[i].id;
								
			this.LeafArray[newVehicle.id] = newVehicle;
		}
		
		if (this.graph.Parser.Leaves[i].type == "terrain")
		{
			var newTerrain = new Terrain(this, this.graph.Parser.Leaves[i].texture_path,this.graph.Parser.Leaves[i].heightmap_path);
				
			newTerrain.type = "terrain";
			newTerrain.id = this.graph.Parser.Leaves[i].id;
								
			this.LeafArray[newTerrain.id] = newTerrain;
		}

	}
}


	//-----------------------------------------------------//
	//-----					NODES					-------//
	//-----------------------------------------------------//

GameScene.prototype.Generate_Graph_Nodes = function (){
	
	/*
		Usa os valores das tags <NODES> do LSX para criar objectos que ficam guardados na NodeArray.
		
		Todos os nodes são identificados pela sua propriedade id, identica à dita pelo LSX
		
	*/
	
	
	//Store root in this.SceneNode_id
	this.SceneNode_id = this.graph.Parser.Root_id;
	
	//make sure root is found
	var found = false;
	
	//Generate every node
	for (var i = 0; i < this.graph.Parser.Nodes.length; i++)
	{
		if (this.graph.Parser.Nodes[i].id == this.graph.Parser.Root_id)
			found = true;
		
		
		
		var newNode = {};
		
		// id
		newNode.id = this.graph.Parser.Nodes[i].id;
		
		//Material
		newNode.materialID = this.graph.Parser.Nodes[i].material_id;
		
		//Texture
		newNode.textureID = this.graph.Parser.Nodes[i].texture_id;
		
		//Transformation Matrix		
		var newMatrix = mat4.create();
		mat4.identity(newMatrix);
		for (var j = 0; j < this.graph.Parser.Nodes[i].Transform.length; j++)
		{
			switch(this.graph.Parser.Nodes[i].Transform[j].type)
			{
			case 'translation':	
				this.transformMatrix_m4(newMatrix, 'translation', 
								this.graph.Parser.Nodes[i].Transform[j].translation_x, 
								this.graph.Parser.Nodes[i].Transform[j].translation_y, 
								this.graph.Parser.Nodes[i].Transform[j].translation_z);
				break;
			case 'rotation':
					if(this.graph.Parser.Nodes[i].Transform[j].axis == 'x')
							this.transformMatrix_m4(newMatrix, 'rotation', 1,0,0, this.graph.Parser.Nodes[i].Transform[j].angle);
						if(this.graph.Parser.Nodes[i].Transform[j].axis == 'y')
							this.transformMatrix_m4(newMatrix, 'rotation', 0,1,0, this.graph.Parser.Nodes[i].Transform[j].angle);
						if(this.graph.Parser.Nodes[i].Transform[j].axis == 'z')
							this.transformMatrix_m4(newMatrix, 'rotation', 0,0,1, this.graph.Parser.Nodes[i].Transform[j].angle);
				break;
				
			case 'scale':
				this.transformMatrix_m4(newMatrix, 'scale', 
							this.graph.Parser.Nodes[i].Transform[j].scale_x, 
							this.graph.Parser.Nodes[i].Transform[j].scale_y,
							this.graph.Parser.Nodes[i].Transform[j].scale_z);
				break;
			default:
				break;
			}
		}
		newNode.transformationMatrix = newMatrix;
		
		
		//Animations
		newNode.Animations = [];
		var time_animations = 0;
		for(var j = 0; j < this.graph.Parser.Nodes[i].Animations.length; j++)
		{
			for(var k = 0; k < this.graph.Parser.Animations.length; k++)
			{
				if (this.graph.Parser.Animations[k].id == this.graph.Parser.Nodes[i].Animations[j])
				{
					var newAnimation;
					if (this.graph.Parser.Animations[k].type == "linear")
					{
						newAnimation = new LinearAnimation(
															this.graph.Parser.Animations[k].id, 
															this.graph.Parser.Animations[k].span, 
															time_animations, 
															"linear", 
															this.graph.Parser.Animations[k].controlpoints);
														
						newNode.Animations.push(newAnimation);	
					}
					if (this.graph.Parser.Animations[k].type == "circular")
					{
						newAnimation = new CircularAnimation(
															this.graph.Parser.Animations[k].id, 
															this.graph.Parser.Animations[k].span, 
															time_animations, 
															"circular",
															this.graph.Parser.Animations[k].center,
															this.graph.Parser.Animations[k].radius,
															this.graph.Parser.Animations[k].startang,
															this.graph.Parser.Animations[k].rotang
															);
														
						newNode.Animations.push(newAnimation);
					}
					time_animations += this.graph.Parser.Animations[k].span;
				}
			}
		}		
		
		
		//Descendents
		newNode.childIDs = [];
		for (var j = 0; j < this.graph.Parser.Nodes[i].Descendants.length; j++)
			newNode.childIDs.push(this.graph.Parser.Nodes[i].Descendants[j]);
		
		
		this.NodeArray[newNode.id] = newNode;
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

GameScene.prototype.Display_Node = function(NodeID, parentMatID, parentTexID, MaterialObject, TextureObject){
	/*
		Processa as informações de um Node do grafo e chama recurssivamente os Nodes filhos. Se porventura o filho for uma folha do grafo,
		chama em vez Display_Leaf(). Define portanto um comportamento de pesquisa em profundidade implicito.
		
		materiais e texturas: Encontra quais os materiais a que lhe correspondem ao nó em TextureArray e MaterialArray.
		matriz transformações: Com uso de um Top() à stack de matrizes, cálcula a própria e guarda-a na stack para que os filhos a possam usar
				
	
	*/
	if (typeof this.NodeArray[NodeID] === "undefined") //Node is found, function starts and ends within this clause
	{
		console.log("Node of ID:" + NodeID + ", is missing. That can't be good!");
		return;
	}
		
	var MaterialUsed = null;
	var TextureUsed = null;
	var Texture_ID_sent = null;
	
	//----------------------------------------------------Materials
	if (NodeID == this.SceneNode_id && this.NodeArray[NodeID].materialID == 'null')
		MaterialUsed = this.MaterialArray[0];
	else
		if (this.NodeArray[NodeID].materialID == 'null')
			MaterialUsed = MaterialObject;
		else
			MaterialUsed = this.MaterialArray[this.NodeArray[NodeID].materialID];

	
	////----------------------------------------------------Textures
	if(this.NodeArray[NodeID].textureID == 'clear')
		TextureUsed = null;
	else if(this.NodeArray[NodeID].textureID == 'null' && NodeID != this.SceneNode_id)
		TextureUsed = TextureObject;
	else
		TextureUsed = this.TextureArray[this.NodeArray[NodeID].textureID];
		
	if (TextureUsed == null)
		Texture_ID_sent = null;
	else 
		Texture_ID_sent = TextureUsed.id;
	
	
	
	////----------------------------------------------------Transformations
	this.multMatrix(this.NodeArray[NodeID].transformationMatrix);
		
		
		
	////----------------------------------------------------Animations
	var mostrecentanimation;
	for(var i = 0; i < this.NodeArray[NodeID].Animations.length; i++)
	{
		if (!this.NodeArray[NodeID].Animations[i].done)
		{
			mostrecentanimation = this.NodeArray[NodeID].Animations[i].getMatrix();
			i = this.NodeArray[NodeID].Animations.length;
		}
		
		if (i == this.NodeArray[NodeID].Animations.length-1 && mostrecentanimation == null)
		{
			mostrecentanimation = this.NodeArray[NodeID].Animations[i].getMatrix();
		}	
		
	}
	if (mostrecentanimation != null)
		this.multMatrix(mostrecentanimation);
	
	
	/*//SPIN SPIN SPIIIIIIN!!!
	if(this.NodeArray[NodeID].id == this.SceneNode_id)
	{
		var newMat = mat4.create();
		mat4.identity(newMat);
		this.transformMatrix_m4(newMat, 'rotation', 0,1,0, 8*this.tempo_actual/1000);
		this.multMatrix(newMat);
	}*/
	
	////----------------------------------------------------Children
	
	for(var j = 0; j < this.NodeArray[NodeID].childIDs.length; j++)
	{
		var Selected_Child_ID = this.NodeArray[NodeID].childIDs[j];
		var found = false;
				
		//Child is a node
		
		if (typeof this.NodeArray[Selected_Child_ID] != "undefined")
		{
			this.pushMatrix();
			this.Display_Node(Selected_Child_ID, 
						MaterialUsed.id,
						Texture_ID_sent,
						MaterialUsed,
						TextureUsed);
			found = true;
			this.popMatrix();
		}
		
		//Child is a leaf
		if (typeof this.LeafArray[Selected_Child_ID] != "undefined")
		{
			this.pushMatrix();
			this.Display_Leaf(Selected_Child_ID,
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

GameScene.prototype.Display_Leaf = function (id, MaterialObject, TextureObject){
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
		if(this.LeafArray[id].type == "rectangle" || this.LeafArray[id].type == "triangle")
			this.LeafArray[id].updateTexCoords(TextureObject.factor_s, TextureObject.factor_t);
		TextureObject.bind();
	}
	if (this.LeafArray[id].type == 'sphere')	
		this.rotate(90*degToRad,1,0,0);
	
	
	//Display
	this.LeafArray[id].display();
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
	
	/*if (this.graph.loadedOk && this.NodeArray.length != 0)
	{
		this.updateAnimationNodes(this.NodeArray[this.SceneNode_id])
	}*/
}

GameScene.prototype.updateAnimationNodes = function(Node){

	for(var i = 0; i < Node.Animations.length; i++)
		 Node.Animations[i].updateMatrix(this.tempo_actual);
	 
	 
	for(var i = 0; i < Node.childIDs.length; i++)
	{
		if (typeof this.NodeArray[Node.childIDs[i]] != "undefined")
		{
			this.updateAnimationNodes(this.NodeArray[Node.childIDs[i]])
		}
		
	}		
	
	
	
}