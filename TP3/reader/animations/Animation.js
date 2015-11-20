/**
 * Construtor da classe Animation.
 * Guarda alguns valores basicos que outras animações poderaão usar 
 * 
 * @param id		String identificadora dese object
 * @param span 		tempo que a animação deve durar
 * @param timestart tempo desde o inicio de execução do programa em que a animação deve começar
 * @param type 		String que identifica qual o tipo de animação
 */
 function Animation(id, span, timestart, type) {
	this.id = id;
	this.span = span;
	this.type = type;
	this.timestart = timestart;
	this.timeend = this.timestart + this.span;
	
	
	//A matriz de transformação própriamente dita. Retorna com 
	//Aplicar com multmatrix. Retornar com getMatrix.
	this.Matriz_Animation = mat4.create();
	
	
	//Chave de bloqueio da animação. 
	//O updateMatrix deve implementar forma de a activar no final da animação e não mudar 
	//os valores da matriz após esse periodo. Imporante em animações em sequência.
	// (Os segmentos na LinearAnimation ficaram com uma chave cada)
	this.done = false;
	
};

/**
 * Faz update A matriz de transformções que resolve o estado da animação para um determinado tempo dado.
 * 
 * @param Tempo_Mili		Tempo que passou (em milisegundos) desde o inicio da execução do programa.
 */
Animation.prototype.updateMatrix = function(Tempo_Mili){
	
}


/**
 * Devolve A matriz de transformções que resolve o estado da animação para o ultimo tempo dado.
 * 
 * @return this.Matriz_Animation
 */
Animation.prototype.getMatrix = function(Tempo_Mili){
	return this.Matriz_Animation;
}

/**
 * 
 * @return this.span
 */
Animation.prototype.getDuration = function(Tempo_Mili){
	return this.span;
}
/**
 * 
 * @return this.timeend
 */
Animation.prototype.getEndingTime = function()
{
	return this.timeend;
}