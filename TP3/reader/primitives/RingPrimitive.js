function RingPrimitive(scene, slices, outterradius, innerradius) {
 	CGFobject.call(this,scene);
	this.slices=slices;
	this.innerradius = innerradius;
	this.outterradius = outterradius;

 	this.initBuffers();
 };

 RingPrimitive.prototype = Object.create(CGFobject.prototype);
 RingPrimitive.prototype.constructor = RingPrimitive;

 RingPrimitive.prototype.initBuffers = function() {

 	var alpha = Math.PI / (this.slices / 2);

 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];
	
	var scaletexture = this.innerradius/this.outterradius;
	

	//vertices de fora e de dentro
	for (var i = 0; i < this.slices; i++)
	{
		this.vertices.push(Math.cos(alpha*i)*this.outterradius, Math.sin(alpha*i)*this.outterradius, 0);
		this.normals.push(0, 0, -1);
		this.texCoords.push((1+(-Math.cos(alpha*i)))/2, (-1+Math.sin(alpha*i))/(-2));
	}
	for (var i = 0; i < this.slices; i++)
	{
		this.vertices.push(Math.cos(alpha*i)*this.innerradius, Math.sin(alpha*i)*this.innerradius, 0);
		this.normals.push(0, 0, -1);
		this.texCoords.push((1+(-Math.cos(alpha*i)*scaletexture))/2, (-1+Math.sin(alpha*i)*scaletexture)/(-2));
	}
	
	//indices do topo
	for (var i = 0; i < this.slices-1; i++)
	{
		this.indices.push(this.slices+i);
		this.indices.push(this.slices+i+1);
		this.indices.push(i+1);
		
		this.indices.push(i);
		this.indices.push(this.slices+i);	
		this.indices.push(i+1);
	}
	this.indices.push(2*this.slices-1);
	this.indices.push(this.slices);
	this.indices.push(0);
	
	this.indices.push(this.slices-1);
	this.indices.push(2*this.slices-1);	
	this.indices.push(0);
	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };