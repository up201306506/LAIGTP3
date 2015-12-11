
function MySceneGraph(filename, scene, ambientname) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
	scene.graph[ambientname] = this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	this.reader.open('scenes/'+filename, this);  
}


MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;


		//var error = this.parseGlobalsExample(rootElement);
	//-------------------------------------------------------------------------------------
	// Here should go the calls for different functions to parse the various blocks
	//-------------------------------------------------------------------------------------
		
		var error = this.parseLSX(rootElement);
		
		

	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};

MySceneGraph.prototype.parseGlobalsExample= function(rootElement) {
	
	var elems =  rootElement.getElementsByTagName('globals');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	// various examples of different types of access
	var globals = elems[0];
	this.background = this.reader.getRGBA(globals, 'background');
	this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill","line","point"]);
	this.cullface = this.reader.getItem(globals, 'cullface', ["back","front","none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw","cw"]);

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

	var tempList=rootElement.getElementsByTagName('list');

	if (tempList == null  || tempList.length==0) {
		return "list element is missing.";
	}
	
	this.list=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];

		// process each element and store its information
		this.list[e.id]=e.attributes.getNamedItem("coords").value;
		console.log("Read list item id "+ e.id+" with value "+this.list[e.id]);
	};

};
	
	
	
	
	
	
MySceneGraph.prototype.parseLSX= function(rootElement){
	
	//Estrutura onde se vão guardar os valores: this.Parser
		this.Parser = {};
	
	var error = this.parseInitials(rootElement);
	if (error != null)
		return error;
	
	error = this.parseIllumination(rootElement);
	if (error != null)
		return error;
	
	error = this.parseLights(rootElement);
	if (error != null)
		return error;
	
	error = this.parseTextures(rootElement);
	if (error != null)
		return error;
	
	error = this.parseMaterials(rootElement);
	if (error != null)
		return error;
	
	error = this.parseAnimations(rootElement);
	if (error != null)
		return error;
	
	error = this.parseLeaves(rootElement);
	if (error != null)
		return error;
	
	error = this.parseNodes(rootElement);
	if (error != null)
		return error;	
	}
		
MySceneGraph.prototype.parseInitials= function(rootElement) {
	//-----------------------------------------------
		console.log("Parsing INITIALS");
	//-----------------------------------------------

	this.Parser.Initials = {};
	
	/*
		This.Parser.Initials
		Values: 
			* frustum: 		view_near, view_far (float)
			* translation: 	view_translation_xx, view_translation_yy, view_translation_zz (float)
			* rotation: 	view_rotation_xx, view_rotation_yy, view_rotation_zz (float)
			* scale: 		view_scale_xx, view_scale_yy, view_scale_zz (float)
			* reference: 	axis_length (float)

	*/

	
	// <INITIALS> must exist and be a singular tag
	var tempInitials = rootElement.getElementsByTagName('INITIALS');		
	if (tempInitials == null || tempInitials.length != 1) {
		return "<INITIALS> is either missing or there's multiples of them. Length: " + tempInitials.length;
	}
	
	
	var Init_frustum, Init_translation, Init_rotation, Init_scale, Init_reference;
	
	
	//------------  frustum   ---------------
	
	Init_frustum =  tempInitials[0].getElementsByTagName('frustum');
	
	if (Init_frustum == null || Init_frustum.length != 1) {
		return "Camera frustum information is either missing or there's multiples of them. Length: " + Init_frustum.length;
	}
	Init_frustum = Init_frustum[0];
	
	this.Parser.Initials.view_near = this.reader.getFloat(Init_frustum, 'near');
	this.Parser.Initials.view_far = this.reader.getFloat(Init_frustum, 'far');
	
	//console.log("Frustum values loaded: near=" + this.Parser.Initials.view_near
	//						+ ", far=" +  this.Parser.Initials.view_far);

	
	//------------  translation -------------
	
	Init_translation = tempInitials[0].getElementsByTagName('translation');
	
	if (Init_translation == null || Init_translation.length != 1) {
		return "View Translation information is either missing or there's multiples of them. Length: " + Init_frustum.length;
	}
	Init_translation = Init_translation[0];

	this.Parser.Initials.view_translation_xx = this.reader.getFloat(Init_translation, 'x');
	this.Parser.Initials.view_translation_yy = this.reader.getFloat(Init_translation, 'y');
	this.Parser.Initials.view_translation_zz = this.reader.getFloat(Init_translation, 'z');

	//console.log("View Translation values loaded: x=" + this.Parser.view_translation_xx
	//										+ ", y=" + this.Parser.view_translation_yy
	//										+ ", z=" + this.Parser.view_translation_zz);
	
	
	//------------  rotation  ---------------
	//------------  rotation  ---------------
	//------------  rotation  ---------------
	Init_rotation = tempInitials[0].getElementsByTagName('rotation');
	
	if (Init_rotation == null || Init_rotation.length != 3) {
		return "rotation information is either missing or there'sa different number than 3 of them. Length: " + Init_rotation.length;
	}
	
	var templength =Init_rotation.length;		
	for (var i=0; i< templength; i++)
	{			
		if (Init_rotation[i].attributes.getNamedItem('axis').value == 'x')
		{
			this.Parser.Initials.view_rotation_xx = this.reader.getFloat(Init_rotation[i], 'angle');
		} else if (Init_rotation[i].attributes.getNamedItem('axis').value == 'y')
		{
			this.Parser.Initials.view_rotation_yy = this.reader.getFloat(Init_rotation[i], 'angle');
		} else if (Init_rotation[i].attributes.getNamedItem('axis').value == 'z')
		{
			this.Parser.Initials.view_rotation_zz = this.reader.getFloat(Init_rotation[i], 'angle');
		}			
	}
	if (this.Parser.Initials.view_rotation_zz == null || this.Parser.Initials.view_rotation_xx == null || this.Parser.Initials.view_rotation_zz == null)
	{
		return "View Rotation information was not correctly loaded, check the axis values in the rotation tags";
	}
	//console.log("View Rotation values loaded: x=" + this.Parser.Initials.view_rotation_xx
	//								+ ", y=" + this.Parser.Initials.view_rotation_yy
	//								+ ", z=" + this.Parser.Initials.view_rotation_zz);
										
										
	
	//------------  scale     ---------------
	Init_scale = tempInitials[0].getElementsByTagName('scale');
	
	if (Init_scale == null || Init_scale.length != 1) {
		return "View Scale information is either missing or there's multiples of them. Length: " + Init_scale.length;
	}
	Init_scale = Init_scale[0];

	this.Parser.Initials.view_scale_xx = this.reader.getFloat(Init_scale, 'sx');
	this.Parser.Initials.view_scale_yy = this.reader.getFloat(Init_scale, 'sy');
	this.Parser.Initials.view_scale_zz = this.reader.getFloat(Init_scale, 'sz');

	//console.log("View Scale values loaded: x=" + this.Parser.Initials.view_scale_xx
	//										+ ", y=" + this.Parser.Initials.view_scale_yy
	//										+ ", z=" + this.Parser.Initials.view_scale_zz);
	
	
	
	//------------  reference ---------------
	Init_reference = tempInitials[0].getElementsByTagName('reference');
	
	if (Init_reference == null || Init_reference.length != 1) {
		return "Axis Size information is either missing or there's multiples of them. Length: " + Init_reference.length;
	}
	
	this.Parser.Initials.axis_length = this.reader.getFloat(Init_reference[0], 'length'); 
	//console.log("Axis size values loaded: " + this.Parser.Initials.axis_length);
	
	console.log(this.Parser.Initials);
	
}

MySceneGraph.prototype.parseIllumination= function(rootElement){
	
	//-----------------------------------------------
		console.log("Parsing ILLUMINATION");
	//-----------------------------------------------

	this.Parser.Illumination = {};
	
	/*
		this.Parser.Illumination
		Values: 
			* ambient: 		this.ambient[] (0-3 RGBA) (float)
			* background: 	this.background[] (0-3 RGBA) (float)

	*/
	
	// <ILLUMINATION> must exist and be a singular tag
	var tempIllumination = rootElement.getElementsByTagName('ILLUMINATION');		
	if (tempIllumination == null || tempIllumination.length != 1) {
		return "<ILLUMINATION> is either missing or there's multiples of them. Length: " + tempIllumination.length;
	}
	
	//------------   ambient  ---------------
	
	var illu_ambient = tempIllumination[0].getElementsByTagName('ambient');
	if (illu_ambient == null || illu_ambient.length != 1) {
		return "Ambient Light information is either missing or there's multiples of them. Length: " + illu_ambient.length;
	}
	illu_ambient = illu_ambient[0];
	
	this.Parser.Illumination.ambient = [];
	this.Parser.Illumination.ambient[0] = this.reader.getFloat(illu_ambient, 'r');
	this.Parser.Illumination.ambient[1] = this.reader.getFloat(illu_ambient, 'g');
	this.Parser.Illumination.ambient[2] = this.reader.getFloat(illu_ambient, 'b');
	this.Parser.Illumination.ambient[3] = this.reader.getFloat(illu_ambient, 'a');
	
	//console.log("Ambient Light: Loaded RGBA values: ["+this.Parser.Illumination.ambient[0]+", "+this.Parser.Illumination.ambient[1]+", "
	//			+this.Parser.Illumination.ambient[2]+", "+this.Parser.Illumination.ambient[3]+"]");
	
	
	//------------ background ---------------

	var illu_background =  tempIllumination[0].getElementsByTagName('background');
	if (illu_background == null || illu_background.length != 1) {
		return "Background information is either missing or there's multiples of them. Length: " + illu_background.length;
	}
	illu_background = illu_background[0];
	
	this.Parser.Illumination.background = [];
	this.Parser.Illumination.background[0] = this.reader.getFloat(illu_background, 'r');
	this.Parser.Illumination.background[1] = this.reader.getFloat(illu_background, 'g');
	this.Parser.Illumination.background[2] = this.reader.getFloat(illu_background, 'b');
	this.Parser.Illumination.background[3] = this.reader.getFloat(illu_background, 'a');
	//console.log("Background: Loaded RGBA values: ["+this.Parser.Illumination.background[0]+", "+this.Parser.Illumination.background[1]+", "
	//			+this.Parser.Illumination.background[2]+", "+this.Parser.Illumination.background[3]+"]");
				
	console.log(this.Parser.Illumination);

	
}

MySceneGraph.prototype.parseLights= function(rootElement){

	//-----------------------------------------------
		console.log("Parsing LIGHTS");
	//-----------------------------------------------

	this.Parser.Lights = [];
	
	// <LIGHTS> must exist and be a singular tag
	var tempLights = rootElement.getElementsByTagName('LIGHTS');
	if (tempLights == null || tempLights.length != 1) {
		return "<LIGHTS> is either missing or there's too many of them. Length: " + tempLights.length;
	}
	tempLights = tempLights[0].getElementsByTagName('LIGHT');
	if (tempLights.length > 8) {
		return "There's too many light, maxmum amount: 8. Length: " + tempLights.length;
	}
	var lightamount = tempLights.length
	console.log("Found "+lightamount+" Light(s)");
	

	this.lights_ambient_r = [], this.lights_ambient_g = [], this.lights_ambient_b = [], this.lights_ambient_a = [];
	this.lights_diffuse_r = [], this.lights_diffuse_g = [], this.lights_diffuse_b = [], this.lights_diffuse_a = [];
	this.lights_specular_r = [], this.lights_specular_g = [], this.lights_specular_b = [], this.lights_specular_a = [];
	
	
	if (lightamount > 0)
	{
		for (var i = 0; i < lightamount; i++ )
		{
			
			this.Parser.Lights[i] = {};
			
			/*
				this.Parser.Lights[i]
				Values: 
					* id: 		lights		(text)
					* enable: 	enabled 	(float)
					* position:	position[] 	(XYZW) (float)
					* ambient:	ambient[] 	(RGBA) (float)
					* diffuse:	diffuse[] 	(RGBA) (float)
					* specular:	specular[] 	(RGBA) (float)
			*/
			
			var Light_Node = tempLights[i];
			
			//------------	id			---------------
			this.Parser.Lights[i].id = Light_Node.attributes.getNamedItem('id').value;
			if (i > 0)
				for (var j = 0; j < i; j++)
					if (this.Parser.Lights[i].id == this.Parser.Lights[j].id)
						return "Two lights had the same id, Light indexes: "+ j  + " and " + i;
			
			//------------	enable		---------------
			this.Parser.Lights[i].enabled = (Light_Node.getElementsByTagName('enable')[0].attributes.getNamedItem('value').value  == '1');
			
			//------------	position	---------------
			this.Parser.Lights[i].position = [];
			this.Parser.Lights[i].position[0] = this.reader.getFloat(Light_Node.getElementsByTagName('position')[0], 'x');
			this.Parser.Lights[i].position[1] = this.reader.getFloat(Light_Node.getElementsByTagName('position')[0], 'y');
			this.Parser.Lights[i].position[2] = this.reader.getFloat(Light_Node.getElementsByTagName('position')[0], 'z');
			this.Parser.Lights[i].position[3] = this.reader.getFloat(Light_Node.getElementsByTagName('position')[0], 'w');
			
			
			//------------	ambient		---------------
			this.Parser.Lights[i].ambient = [];
			this.Parser.Lights[i].ambient[0] = this.reader.getFloat(Light_Node.getElementsByTagName('ambient')[0], 'r');
			this.Parser.Lights[i].ambient[1] = this.reader.getFloat(Light_Node.getElementsByTagName('ambient')[0], 'g');
			this.Parser.Lights[i].ambient[2] = this.reader.getFloat(Light_Node.getElementsByTagName('ambient')[0], 'b');
			this.Parser.Lights[i].ambient[3] = this.reader.getFloat(Light_Node.getElementsByTagName('ambient')[0], 'a');
			
			
			//------------	diffuse		---------------
			this.Parser.Lights[i].diffuse = [];
			this.Parser.Lights[i].diffuse[0] = this.reader.getFloat(Light_Node.getElementsByTagName('diffuse')[0], 'r');
			this.Parser.Lights[i].diffuse[1] = this.reader.getFloat(Light_Node.getElementsByTagName('diffuse')[0], 'g');
			this.Parser.Lights[i].diffuse[2] = this.reader.getFloat(Light_Node.getElementsByTagName('diffuse')[0], 'b');
			this.Parser.Lights[i].diffuse[3] = this.reader.getFloat(Light_Node.getElementsByTagName('diffuse')[0], 'a');
			
			//------------	specular	---------------
			this.Parser.Lights[i].specular = [];
			this.Parser.Lights[i].specular[0] = this.reader.getFloat(Light_Node.getElementsByTagName('specular')[0], 'r');
			this.Parser.Lights[i].specular[1] = this.reader.getFloat(Light_Node.getElementsByTagName('specular')[0], 'g');
			this.Parser.Lights[i].specular[2] = this.reader.getFloat(Light_Node.getElementsByTagName('specular')[0], 'b');
			this.Parser.Lights[i].specular[3] = this.reader.getFloat(Light_Node.getElementsByTagName('specular')[0], 'a');
			
			/*
			console.log(this.Parser.Lights[i].id + 
							": enabled=" +this.Parser.Lights[i].enabled+ 
							", position: [" + this.Parser.Lights[i].position[0] 
											+ ", " + this.Parser.Lights[i].position[1] 
											+ ", " + this.Parser.Lights[i].position[2] 
											+ ", " + this.Parser.Lights[i].position[3] + 
							"], ambient: [" + this.Parser.Lights[i].ambient[0] 
											+ ", " + this.Parser.Lights[i].ambient[1] 
											+ ", " + this.Parser.Lights[i].ambient[2] 
											+ ", " + this.Parser.Lights[i].ambient[3]+ 
							"], diffuse: [" + this.Parser.Lights[i].diffuse[0] 
											+ ", " + this.Parser.Lights[i].diffuse[1] 
											+ ", " + this.Parser.Lights[i].diffuse[2] 
											+ ", " + this.Parser.Lights[i].diffuse[3]+ 
							"], specular: [" + this.Parser.Lights[i].specular[0] 
											+ ", " + this.Parser.Lights[i].specular[1] 
											+ ", " + this.Parser.Lights[i].specular[2] 
											+ ", " + this.Parser.Lights[i].specular[3]+ "]");
			*/
			console.log(this.Parser.Lights[i]);
		}
	}
}

MySceneGraph.prototype.parseTextures= function(rootElement){
	
	//-----------------------------------------------
		console.log("Parsing TEXTURES");
	//-----------------------------------------------

		
		
	this.Parser.Textures = [];
		
	// <TEXTURES> must exist and be a singular tag
	var tempTextures = rootElement.getElementsByTagName('TEXTURES');		
	if (tempTextures == null || tempTextures.length != 1) {
		return "<TEXTURES> is either missing or there's multiples of them. Length: " + tempTextures.length;
	}
	tempTextures = tempTextures[0].getElementsByTagName('TEXTURE');
	
	var textamount = tempTextures.length;
	console.log("Found "+textamount+" Texture(s)");

	
	if (textamount > 0)
	{
		for (var i = 0; i < textamount; i++)
		{
			
			/*
			Values: 
				* id: 				id(text)
				* path: 			path (text)
				* amplif_factor:	factor_s, factor_t (float)

			*/
			
			this.Parser.Textures[i] = {};
			
			var Texture_Node = tempTextures[i];
			
			//------------	id				---------------
			this.Parser.Textures[i].id = Texture_Node.attributes.getNamedItem('id').value;
			
			if (i > 0)
				for (var j = 0; j < i; j++)
					if (this.Parser.Textures[i].id == this.Parser.Textures[j].id)
						return "Two textures had the same id, texture indexes: "+ j  + " and " + i;
			
			//------------	path			---------------
			
			this.Parser.Textures[i].path = Texture_Node.getElementsByTagName('file')[0].attributes.getNamedItem('path').value;
			
			//------------	amplif_factor	---------------
			
			this.Parser.Textures[i].factor_s = this.reader.getFloat(Texture_Node.getElementsByTagName('amplif_factor')[0], 's');
			this.Parser.Textures[i].factor_t = this.reader.getFloat(Texture_Node.getElementsByTagName('amplif_factor')[0], 't');
			
			/*
			console.log(this.Parser.Textures[i].id
					+": File path:" + this.Parser.Textures[i].path
					+ " Amplification Factor: s=" + this.Parser.Textures[i].factor_s + " t=" + this.Parser.Textures[i].factor_t
					);
			*/
			
			console.log(this.Parser.Textures[i]);
		}
	}	
}

MySceneGraph.prototype.parseMaterials= function(rootElement){
		
	//-----------------------------------------------
		console.log("Parsing MATERIALS");
	//-----------------------------------------------

	this.Parser.Materials = [];
	
	

	// <MATERIALS> must exist and be a singular tag
	var tempMaterials = rootElement.getElementsByTagName('MATERIALS');		
	if (tempMaterials == null || tempMaterials.length != 1) {
		return "<MATERIALS> is either missing or there's multiples of them. Length: " + tempMaterials.length;
	}
	
	tempMaterials = tempMaterials[0].getElementsByTagName('MATERIAL');
	var materamount = tempMaterials.length;
	console.log("Found "+materamount+" Material(s)");
	
	if (materamount > 0){
		
		for (var i = 0; i < materamount; i++){
			
			this.Parser.Materials[i] = {};
			var Material_Node = tempMaterials[i];
			
			/*
				Values: 
					* id: 			id				(text)
					* shininess: 	shininess		(float)
					* specular:		specular[] 		(RGBA) (float)
					* diffuse:		diffuse[] 		(RGBA) (float)
					* ambient:		ambient[] 		(RGBA) (float)
					* emission:		emission[] 		(RGBA) (float)

			*/
			
			//------------	id				---------------
			this.Parser.Materials[i].id = Material_Node.attributes.getNamedItem('id').value;
			
			if (i > 0)
				for (var j = 0; j < i; j++)
					if (this.Parser.Materials[i].id == this.Parser.Materials[j].id)
						return "Two materials had the same id, material indexes: "+ j  + " and " + i;
			
			//------------	shininess		---------------
			this.Parser.Materials[i].shininess = this.reader.getFloat(Material_Node.getElementsByTagName('shininess')[0], 'value');
			
			//------------	specular		---------------
			this.Parser.Materials[i].specular = [];
			this.Parser.Materials[i].specular[0] = this.reader.getFloat(Material_Node.getElementsByTagName('specular')[0], 'r');
			this.Parser.Materials[i].specular[1] = this.reader.getFloat(Material_Node.getElementsByTagName('specular')[0], 'g');
			this.Parser.Materials[i].specular[2] = this.reader.getFloat(Material_Node.getElementsByTagName('specular')[0], 'b');
			this.Parser.Materials[i].specular[3] = this.reader.getFloat(Material_Node.getElementsByTagName('specular')[0], 'a');
			
			//------------	diffuse			---------------
			this.Parser.Materials[i].diffuse = [];
			this.Parser.Materials[i].diffuse[0] = this.reader.getFloat(Material_Node.getElementsByTagName('diffuse')[0], 'r');
			this.Parser.Materials[i].diffuse[1] = this.reader.getFloat(Material_Node.getElementsByTagName('diffuse')[0], 'g');
			this.Parser.Materials[i].diffuse[2] = this.reader.getFloat(Material_Node.getElementsByTagName('diffuse')[0], 'b');
			this.Parser.Materials[i].diffuse[3] = this.reader.getFloat(Material_Node.getElementsByTagName('diffuse')[0], 'a');
			
			//------------	ambient			---------------
			this.Parser.Materials[i].ambient = [];
			this.Parser.Materials[i].ambient[0] = this.reader.getFloat(Material_Node.getElementsByTagName('ambient')[0], 'r');
			this.Parser.Materials[i].ambient[1] = this.reader.getFloat(Material_Node.getElementsByTagName('ambient')[0], 'g');
			this.Parser.Materials[i].ambient[2] = this.reader.getFloat(Material_Node.getElementsByTagName('ambient')[0], 'b');
			this.Parser.Materials[i].ambient[3] = this.reader.getFloat(Material_Node.getElementsByTagName('ambient')[0], 'a');
			
			//------------	emission		---------------
			this.Parser.Materials[i].emission = [];
			this.Parser.Materials[i].emission[0] = this.reader.getFloat(Material_Node.getElementsByTagName('emission')[0], 'r');
			this.Parser.Materials[i].emission[1] = this.reader.getFloat(Material_Node.getElementsByTagName('emission')[0], 'g');
			this.Parser.Materials[i].emission[2] = this.reader.getFloat(Material_Node.getElementsByTagName('emission')[0], 'b');
			this.Parser.Materials[i].emission[3] = this.reader.getFloat(Material_Node.getElementsByTagName('emission')[0], 'a');
			
			
			
			/*console.log(this.Parser.Materials[i].id +
					": shininess:" + this.Parser.Materials[i].shininess +
					", specular: [" + this.Parser.Materials[i].specular[0] +
									"," + this.Parser.Materials[i].specular[1] +
									"," + this.Parser.Materials[i].specular[2] +
									"," + this.Parser.Materials[i].specular[3] +
					"] diffuse: [" + this.Parser.Materials[i].diffuse[0] +
									"," + this.Parser.Materials[i].diffuse[1] +
									"," + this.Parser.Materials[i].diffuse[2] +
									"," + this.Parser.Materials[i].diffuse[3] +
					"] ambient: [" + this.Parser.Materials[i].ambient[0] +
									"," + this.Parser.Materials[i].ambient[1] +
									"," + this.Parser.Materials[i].ambient[2] +
									"," + this.Parser.Materials[i].ambient[3] +
					"] emission: [" + this.Parser.Materials[i].emission[0] +
									"," + this.Parser.Materials[i].emission[1] +
									"," + this.Parser.Materials[i].emission[2] +
									"," + this.Parser.Materials[i].emission[3] + "]"
					);*/
			console.log(this.Parser.Materials[i]);
		}
	}
	
	
	
	
	
}

MySceneGraph.prototype.parseAnimations= function(rootElement){
	//-----------------------------------------------
		console.log("Parsing ANIMATIONS");
	//-----------------------------------------------
	
	this.Parser.Animations = [];
	
	// <ANIMATIONS> must exist and be a singular tag
	
	var tempAnimations = rootElement.getElementsByTagName('ANIMATIONS');		
	if (tempAnimations == null || tempAnimations.length != 1) {
		return "<ANIMATIONS> is either missing or there's multiples of them. Length: " + tempAnimations.length;
	}
	
	tempAnimations = tempAnimations[0].getElementsByTagName('animation');
	var animationamount = tempAnimations.length;
	console.log("Found "+animationamount+" Animation(s)");
	
	if (animationamount > 0){
		for (var i = 0; i < animationamount; i++){
			this.Parser.Animations[i] = {};
			var Animation_Node = tempAnimations[i];	
			/*
				Values: 
					* id: 			id				(text)
					* span: 		span			(float)
					* type: 		type			(text)
						(linear)
						* xx, yy, zz:		controlpoints[]		(float)(xyz)
						(circular)
						* center: 		center[]			(float)(xyz)
						* radius: 		radius				(float)
			*/
			//------------	id				---------------
			this.Parser.Animations[i].id = Animation_Node.attributes.getNamedItem('id').value;	
				if (i > 0)
					for (var j = 0; j < i; j++)
						if (this.Parser.Animations[i].id == this.Parser.Animations[j].id)
							return "Two Animations had the same id, indexes: "+ j  + " and " + i;
						
			//------------	span		---------------	
			this.Parser.Animations[i].span = parseFloat(Animation_Node.attributes.getNamedItem('span').value);
			
			
			//------------	type		---------------
			this.Parser.Animations[i].type = Animation_Node.attributes.getNamedItem('type').value;
			
			if(this.Parser.Animations[i].type == "linear")
			{
				//------------	controlpoint		---------------
				this.Parser.Animations[i].controlpoints = [];
				var control_point_list = Animation_Node.getElementsByTagName('controlpoint');
				for(var k = 0; k < control_point_list.length; k++)
				{
					this.Parser.Animations[i].controlpoints[k] = [ 	 parseFloat(control_point_list[k].attributes.getNamedItem('xx').value),
																	 parseFloat(control_point_list[k].attributes.getNamedItem('yy').value),
																	 parseFloat(control_point_list[k].attributes.getNamedItem('zz').value)
																];
				}
				
			} else if(this.Parser.Animations[i].type == "circular")
			{
				//------------	center		---------------	
				
				var str = Animation_Node.attributes.getNamedItem('center').value;
				var str = str.match(/\S+/g);
				
				this.Parser.Animations[i].center = [];
				this.Parser.Animations[i].center[0] = parseFloat(str[0]);
				this.Parser.Animations[i].center[1] = parseFloat(str[1]);
				this.Parser.Animations[i].center[2] = parseFloat(str[2]);
				
				//------------	radius		---------------	
				this.Parser.Animations[i].radius = parseFloat(Animation_Node.attributes.getNamedItem('radius').value);
				
				//------------	startang		---------------	
				this.Parser.Animations[i].startang = parseFloat(Animation_Node.attributes.getNamedItem('startang').value);
				
				//------------	rotang		---------------	
				this.Parser.Animations[i].rotang = parseFloat(Animation_Node.attributes.getNamedItem('rotang').value);
								
				
			} else 
				return "Non-valid type on Animation index " + i + " was found.";
		

			console.log(this.Parser.Animations[i]);
			
			
			
		}
	}
	
	
	
}

MySceneGraph.prototype.parseLeaves= function(rootElement){
	
	//-----------------------------------------------
		console.log("Parsing LEAVES");
	//-----------------------------------------------
	this.Parser.Leaves = [];
	
	
	// <LEAVES> must exist and be a singular tag
	var tempLeaves = rootElement.getElementsByTagName('LEAVES');		
	if (tempLeaves == null || tempLeaves.length != 1) {
		return "<LEAVES> is either missing or there's multiples of them. Length: " + tempLeaves.length;
	}
	tempLeaves = tempLeaves[0].getElementsByTagName('LEAF');
	if (tempLeaves == null || tempLeaves.length == 0) {
		return "You haven't defined any <LEAF>. Length: " + tempLeaves.length;
	}
	
	var leafamount = tempLeaves.length;
	console.log("Found "+leafamount+" leaf nodes");
	
	for (var i = 0; i < leafamount; i++){
		
		this.Parser.Leaves[i] = {};
		var Leaf_Node = tempLeaves[i];
			
		/*				
			Values: 
				* id: 			id				(text)
				* type: 		type			(text)
				* args: 
					** rectangle
						lt_x, lt_y, rb_x, rb_y									(float)
					** cylinder
						height, bot_radius, top_radius, sections, parts			(float)
					** sphere
						radius, sections, parts									(float)
					** triangle
						p1_x, p1_y, p1_z, p2_x, p2_y, p2_z, p3_x, p3_y, p3_z	(float)
		*/
		
		//------------	id				---------------
		this.Parser.Leaves[i].id = Leaf_Node.attributes.getNamedItem('id').value;
			
			if (i > 0)
				for (var j = 0; j < i; j++)
					if (this.Parser.Leaves[i].id == this.Parser.Leaves[j].id)
						return "Two leaves had the same id, indexes: "+ j  + " and " + i;
					
		//------------	type			---------------
		this.Parser.Leaves[i].type = Leaf_Node.attributes.getNamedItem('type').value;
		
		//console.log("Leaf "+ i + ": id=" + this.Parser.Leaves[i].id + ", type=" + this.Parser.Leaves[i].type);

		switch(this.Parser.Leaves[i].type)
		{			
			//------------	rectangle		---------------
		case "rectangle":
			var str = Leaf_Node.attributes.getNamedItem('args').value;
			var arg_list = str.match(/\S+/g);
			
			this.Parser.Leaves[i].lt_x = parseFloat(arg_list[0]);
			this.Parser.Leaves[i].lt_y = parseFloat(arg_list[1]);
			this.Parser.Leaves[i].rb_x = parseFloat(arg_list[2]);
			this.Parser.Leaves[i].rb_y = parseFloat(arg_list[3]);
			/*console.log("	Values: lt_x=" + this.Parser.Leaves[i].lt_x +
								", lt_y=" + this.Parser.Leaves[i].lt_y +
								", rb_x=" + this.Parser.Leaves[i].rb_x +
								", rb_y=" + this.Parser.Leaves[i].rb_y 
						);
			*/
			break;
		
			//------------	cylinder		---------------
		case "cylinder":
			var str = Leaf_Node.attributes.getNamedItem('args').value;
			var arg_list = str.match(/\S+/g);
			
			this.Parser.Leaves[i].height = parseFloat(arg_list[0]);
			this.Parser.Leaves[i].bot_radius = parseFloat(arg_list[1]);
			this.Parser.Leaves[i].top_radius = parseFloat(arg_list[2]);
			this.Parser.Leaves[i].sections = parseFloat(arg_list[3]);
			this.Parser.Leaves[i].parts = parseFloat(arg_list[4]);
			/*console.log("	Values: height=" + this.Parser.Leaves[i].height +
								", bot_radius=" + this.Parser.Leaves[i].bot_radius +
								", top_radius=" + this.Parser.Leaves[i].top_radius +
								", sections=" + this.Parser.Leaves[i].sections +
								", parts=" + this.Parser.Leaves[i].parts 
						);
			*/
			break;
		
			//------------	sphere			---------------
		case "sphere":
			var str = Leaf_Node.attributes.getNamedItem('args').value;
			var arg_list = str.match(/\S+/g);
			
			this.Parser.Leaves[i].radius = parseFloat(arg_list[0]);
			this.Parser.Leaves[i].sections = parseFloat(arg_list[1]);
			this.Parser.Leaves[i].parts = parseFloat(arg_list[2]);
			/*console.log("	Values: radius=" + this.Parser.Leaves[i].radius +
								", sections=" + this.Parser.Leaves[i].sections +
								", parts=" + this.Parser.Leaves[i].parts 
						);
			*/
			break;
			
			//------------	triangle		---------------	
		
		case "triangle":	
			var str = Leaf_Node.attributes.getNamedItem('args').value;
			var arg_list = str.match(/\S+/g);
				
			this.Parser.Leaves[i].p1_x = parseFloat(arg_list[0]);
			this.Parser.Leaves[i].p1_y = parseFloat(arg_list[1]);
			this.Parser.Leaves[i].p1_z = parseFloat(arg_list[2]);
			this.Parser.Leaves[i].p2_x = parseFloat(arg_list[3]);
			this.Parser.Leaves[i].p2_y = parseFloat(arg_list[4]);
			this.Parser.Leaves[i].p2_z = parseFloat(arg_list[5]);
			this.Parser.Leaves[i].p3_x = parseFloat(arg_list[6]);
			this.Parser.Leaves[i].p3_y = parseFloat(arg_list[7]);
			this.Parser.Leaves[i].p3_z = parseFloat(arg_list[8]);
			/*console.log("	Values: p1_x=" + this.Parser.Leaves[i].p1_x +
								", p1_y=" + this.Parser.Leaves[i].p1_y +
								", p1_z=" + this.Parser.Leaves[i].p1_z +
								", p2_x=" + this.Parser.Leaves[i].p2_x +
								", p2_y=" + this.Parser.Leaves[i].p2_y +
								", p2_z=" + this.Parser.Leaves[i].p2_z +
								", p3_x=" + this.Parser.Leaves[i].p3_x +
								", p3_y=" + this.Parser.Leaves[i].p3_y +
								", p3_z=" + this.Parser.Leaves[i].p3_z 
						);
			*/
			break;
			
			//------------	plane			---------------
		case "plane":
			this.Parser.Leaves[i].parts = parseFloat(Leaf_Node.attributes.getNamedItem('parts').value);

			break;
			//------------	vehicle			---------------
		case "vehicle":
			break;
			
			//------------	terrain			---------------
		case "terrain":
			this.Parser.Leaves[i].texture_path = Leaf_Node.attributes.getNamedItem('texture').value;
			this.Parser.Leaves[i].heightmap_path = Leaf_Node.attributes.getNamedItem('heightmap').value;
			break;
			
			//------------	patch			---------------
		case "patch":
			this.Parser.Leaves[i].order = parseFloat(Leaf_Node.attributes.getNamedItem('order').value);
			this.Parser.Leaves[i].partsU = parseFloat(Leaf_Node.attributes.getNamedItem('partsU').value);
			this.Parser.Leaves[i].partsV = parseFloat(Leaf_Node.attributes.getNamedItem('partsV').value);
			
			
			this.Parser.Leaves[i].controlpoints = [];
			var control_point_list = Leaf_Node.getElementsByTagName('controlpoint');
			for(var k = 0; k < control_point_list.length; k++)
			{
				this.Parser.Leaves[i].controlpoints[k] = [ 	 parseFloat(control_point_list[k].attributes.getNamedItem('xx').value),
															 parseFloat(control_point_list[k].attributes.getNamedItem('yy').value),
															 parseFloat(control_point_list[k].attributes.getNamedItem('zz').value)
															];
			}
				
			
			break;
			
			
			
			
		default:
			return "Non-valid type was found.";
			break;
		}
		console.log(this.Parser.Leaves[i]);
	}
	
}


MySceneGraph.prototype.parseNodes= function(rootElement){
	
	//-----------------------------------------------
		console.log("Parsing NODES");
	//-----------------------------------------------
	
	this.Parser.Nodes = [];
	
				
		/*				
			Values: 
			
				(unique)  Root_id
				
				* id:				id				(text)
				* MATERIAL: 		material_id		(text)
				* TEXTURE: 			texture_id		(text)
				* TRANSLATION:		
									translation_x	(float)
									translation_y	(float)
									translation_z	(float)
				* ROTATION:			
									axis			(text)
									rotation		(float)
				* SCALE: 
									scale_x			(float)
									scale_y			(float)
									scale_z			(float)
				? - All transformations have a "type" (text) element as well
				
				* DESCENDANTS:
					** DESCENDANT: Descendants[]	(text)
					
				* ANIMATION:
					** animationref: animationid	(text)
		*/
	
	
	
	// <NODES> must exist and be a singular tag
	var tempNodes = rootElement.getElementsByTagName('NODES');		
	if (tempNodes == null || tempNodes.length != 1) {
		return "<NODES> is either missing or there's multiples of them. Length: " + tempNodes.length;
	}
	
	var tempRoot = tempNodes[0].getElementsByTagName('ROOT');
	if (tempRoot == null || tempRoot.length != 1) {
		return "<ROOT> is either missing or there's multiples of it. Length: " + tempRoot.length;
	}
	this.Parser.Root_id = tempRoot[0].attributes.getNamedItem('id').value;
	console.log("	Root will be Node id: " + this.Parser.Root_id)
	
	//Parsing must fail if this never turns true
	var bool_root_found = false;
	
	tempNodes[0].getElementsByTagName('ROOT');
	tempNodes = tempNodes[0].getElementsByTagName('NODE');
	if (tempNodes == null || tempNodes.length == 0) {
		return "You haven't defined any <NODE>, you need at least one <NODE> for root.";
	}
	
	var nodeamount = tempNodes.length;
	console.log("Found "+nodeamount+" nodes");
	
	for (var i = 0; i < nodeamount; i++)
	{
		
		this.Parser.Nodes[i] = {};
		var Node_Twice = tempNodes[i]; 		// Pinnacle of varaible name creativity right here, WITNESS ME! 

		
		//------------	id			---------------
		this.Parser.Nodes[i].id = Node_Twice.attributes.getNamedItem('id').value;
				
		if (i > 0)
			for (var j = 0; j < i; j++)
				if (this.Parser.Nodes[i].id == this.Parser.Nodes[j].id)
					return "Two nodes had the same id, indexes: "+ j  + " and " + i;
						
		if (this.Parser.Nodes[i].id == this.Parser.Root_id)
			var bool_root_found = true;
			
		//console.log("Node "+ i + ": id=" + this.Parser.Nodes[i].id);
		
		//------------	MATERIAL	---------------
		this.Parser.Nodes[i].material_id = Node_Twice.getElementsByTagName('MATERIAL')[0].attributes.getNamedItem('id').value;
		if (this.Parser.Nodes[i].material_id == null) {
			return "You haven't defined any Material.";
		}
			//console.log("	Material used:" + this.Parser.Nodes[i].material_id );
		
		
		//------------	TEXTURE		---------------
		this.Parser.Nodes[i].texture_id = Node_Twice.getElementsByTagName('TEXTURE')[0].attributes.getNamedItem('id').value;
		if (this.Parser.Nodes[i].texture_id == null) {
			return "You haven't defined any Texture.";
		}
			//console.log("	Texture used:" + this.Parser.Nodes[i].texture_id );
		
		
		//------------	Transformações ---------------
		this.Parser.Nodes[i].Transform = [];
		
		
		var Node_List = Node_Twice.childNodes;
		var found = 0;
		
		for (var j=0; j<Node_List.length; j++)
		{			
			
			switch(Node_List[j].tagName)
			{
			case 'TRANSLATION': 
				//------------	TRANSLATION	---------------
				
				var Transformation_Element = {};
				Transformation_Element.type = 'translation';
				Transformation_Element.translation_x = this.reader.getFloat(Node_List[j] , 'x');
				Transformation_Element.translation_y = this.reader.getFloat(Node_List[j] , 'y');
				Transformation_Element.translation_z = this.reader.getFloat(Node_List[j] , 'z');

				this.Parser.Nodes[i].Transform.push(Transformation_Element);
				
				/*console.log("	Transformation of type " + this.Parser.Nodes[i].Transform[found].type +
									": x=" +  this.Parser.Nodes[i].Transform[found].translation_x +
									": y=" +  this.Parser.Nodes[i].Transform[found].translation_y +
									": z=" +  this.Parser.Nodes[i].Transform[found].translation_z 
							);
				*/
				
				found++;
				break;
			case 'ROTATION': 
				//------------	ROTATION	---------------
				var Transformation_Element = {};
				Transformation_Element.type = 'rotation';
				Transformation_Element.axis = Node_List[j].attributes.getNamedItem('axis').value;
				Transformation_Element.angle = this.reader.getFloat(Node_List[j] , 'angle');

				this.Parser.Nodes[i].Transform.push(Transformation_Element);
				
				/*console.log("	Transformation of type " + this.Parser.Nodes[i].Transform[found].type +
									" over the " +  this.Parser.Nodes[i].Transform[found].axis +
									" axis: angle=" +  this.Parser.Nodes[i].Transform[found].angle 
							);
				*/
				
				found++;
				break;
			case 'SCALE': 
				//------------	SCALE		---------------
				var Transformation_Element = {};
				Transformation_Element.type = 'scale';
				Transformation_Element.scale_x = this.reader.getFloat(Node_List[j] , 'sx');
				Transformation_Element.scale_y = this.reader.getFloat(Node_List[j] , 'sy');
				Transformation_Element.scale_z = this.reader.getFloat(Node_List[j] , 'sz');
				
				this.Parser.Nodes[i].Transform.push(Transformation_Element);
				
				/*console.log("	Transformation of type " + this.Parser.Nodes[i].Transform[found].type +
									": x=" +  this.Parser.Nodes[i].Transform[found].scale_x +
									": y=" +  this.Parser.Nodes[i].Transform[found].scale_y +
									": z=" +  this.Parser.Nodes[i].Transform[found].scale_z 
							);
				*/
				found++;
				break;
			default:
				break;
			}
			
			
			
		}
		
		//------------	DESCENDANTS	---------------
		this.Parser.Nodes[i].Descendants = [];

		var descendant_list = Node_Twice.getElementsByTagName('DESCENDANTS')[0].getElementsByTagName('DESCENDANT');
		if (descendant_list == null) {
			return "You haven't defined any descendants.";
		}
		
		for (var j = 0; j < descendant_list.length; j++)
		{
			this.Parser.Nodes[i].Descendants[j] = descendant_list[j].attributes.getNamedItem('id').value;
			//console.log("	Descendant found:" + this.Parser.Nodes[i].Descendants[j] );	
		}
		
		console.log(this.Parser.Nodes[i]);
		
		//------------	ANIMATIONS	---------------
		
		this.Parser.Nodes[i].Animations = [];
		var animation_list = Node_Twice.getElementsByTagName('animationref')
		for (var j = 0; j < animation_list.length; j++)
		{
			this.Parser.Nodes[i].Animations[j] = animation_list[j].attributes.getNamedItem('id').value;
		}
	}
	
	if (bool_root_found == false)
		return "No Node had the same ID as the root node";
}

	
/*
 * Callback to be executed on any read error
 */
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};

