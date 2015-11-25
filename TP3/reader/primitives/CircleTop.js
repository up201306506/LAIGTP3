/**
 * CircleTop
 * @constructor
 */
 function CircleTop(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 CircleTop.prototype = Object.create(CGFobject.prototype);
 CircleTop.prototype.constructor = CircleTop;

 CircleTop.prototype.initBuffers = function() {

 	var alpha = Math.PI / (this.slices / 2);

 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];

	//indice do vertice central
	var tamanhoInicial = 0;

	//vertice central
	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, -1);
	this.texCoords.push(0.5, 0.5);

	//vertices e normais do topo
	for (var i = 0; i < this.slices; i++)
	{
		this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);
		this.normals.push(0, 0, -1);
		this.texCoords.push((1+(-Math.cos(alpha*i)))/2, (-1+Math.sin(alpha*i))/(-2));
	}

	//indice do ultimo vertice
	var tamanhoFinal = this.slices;

	//indices do topo
	for (var i = tamanhoInicial+1; i < tamanhoFinal; i++)
	{
		this.indices.push( tamanhoInicial, i+1, i);
	}
	this.indices.push( tamanhoInicial, tamanhoInicial+1, tamanhoFinal);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };