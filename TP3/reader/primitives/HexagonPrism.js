function HexagonPrism(scene,textcpath, x, z, id){
	CGFobject.call(this,scene);
	this.scene = scene;
	
	this.id=id;
	this.towerowner = 0;
	
	this.x=x;
	this.z=z;
	this.XZpositions();
	
	this.currentheight = 0;

	this.body = new CylinderPrimitive(scene, 6, 6, 0.1275, 1, 1);
	this.text = new CGFtexture(this.scene, textcpath);
	this.bot = new CircleTop(scene, 6);
	this.top = new CircleTop(scene, 6);
	
	
	this.bottomFloor = null; this.bottomDoubleFilled = false;
	this.mediumFloor = null;
	this.topFloor = null;
	
}

HexagonPrism.prototype = Object.create(CGFobject.prototype);
HexagonPrism.prototype.constructor = HexagonPrism;


HexagonPrism.prototype.XZpositions = function(){
		
	var dist_z = 2*Math.sqrt(0.75)+0.01;
	var dist_x =1.51;
	if(this.x==1 || this.x==3)
	{
		this.x = this.x*dist_x;
		this.z = this.z*Math.sqrt(0.75)+((this.z+2)/2-2)*0.01-dist_z;
	}
	else
	{
		this.x = this.x*dist_x;
		this.z = this.z*dist_z;
	}
	
}


HexagonPrism.prototype.display = function()
{
	this.scene.pushMatrix();

	var newMat = mat4.create();
	mat4.identity(newMat);
	mat4.translate(newMat, newMat, [this.x,0,this.z]);
	this.scene.multMatrix(newMat);


	this.scene.pushMatrix();
			this.text.bind();
			mat4.identity(newMat); 
			mat4.rotate(newMat, newMat, -90*degToRad, [1,0,0]);
			this.scene.multMatrix(newMat);
	this.bot.display();
	this.body.display();
	this.scene.popMatrix();
	
	
	this.scene.pushMatrix();
			this.text.bind();
			mat4.identity(newMat); 
			mat4.rotate(newMat, newMat, 90*degToRad, [1,0,0]);
			mat4.translate(newMat, newMat, [0,0,-0.1275]);
			this.scene.multMatrix(newMat);
	this.top.display();
	this.scene.popMatrix();
	

	this.scene.popMatrix();
}

HexagonPrism.prototype.getid = function(){
	return this.id;
}

HexagonPrism.prototype.objectName = function(){
	return "HexagonPrism";
}

HexagonPrism.prototype.sayTowerTypeProlog = function(){
	if (this.currentheight == 0)
		return 0;
	else if (this.currentheight == 1)
	{
		if(this.bottomDoubleFilled)
			return 6;
		else if(this.bottomFloor.objectName() == "GamePieceSmall")
			return 1;
		else if(this.bottomFloor.objectName() == "GamePieceMedium")
			return 2;
		else if(this.bottomFloor.objectName() == "GamePieceLarge")
			return 5;
		else
			return 0;
	}
	else if (this.currentheight == 2)
	{
		if(this.mediumFloor.objectName() == "GamePieceSmall")
			return 3;
		else if(this.mediumFloor.objectName() == "GamePieceMedium")
			return 7;
		else
			return 0;
	}
	else if (this.currentheight == 3)
	{
		if(this.topFloor.objectName() == "GamePieceSmall")
			return 8;
		else
			return 0;
	}
	else
		return 0;
}
HexagonPrism.prototype.sayTowerOwnerProlog = function(){
	if(this.towerowner == "White")
		return 1;
	else if(this.towerowner == "Black")
		return 2;
	else
		return 0;

}

