/**
 * Construtor da classe CircularAnimation.
 * Guarda alguns valores basicos que outras animações poderaão usar 
 * 
 * @param id		String identificadora dese object
 * @param span 		tempo que a animação deve durar
 * @param timestart tempo desde o inicio de execução do programa em que a animação deve começar
 * @param type 		String que identifica qual o tipo de animação
 */
 function CircularAnimation(id, span, timestart, type, center, radius, startang, rotang) {
	Animation.call(this,id,span,timestart,"circular");

	this.center = center;
	this.radius = radius;
	this.startang = startang;
	this.rotang = rotang;
	
	//Derivada de movimento do angulo. Acho que lhe chamavam velocidade angular. Ahhh!~ Fisica. Pfft!
	this.delta = this.rotang * degToRad / this.span;

	
};


CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

var degToRad = Math.PI / 180.0;

/**
 * Faz update A matriz de transformções que resolve o estado da animação para um determinado tempo dado.
 * 
 * @param Tempo_Mili		Tempo que passou (em milisegundos) desde o inicio da execução do programa.
 */
CircularAnimation.prototype.updateMatrix = function(Tempo_Mili){

	var Tempo_Segundos = Tempo_Mili/1000;
	var Periodo_Movimento = Tempo_Segundos - this.timestart;	
		
	
	if (Periodo_Movimento <= 0) 
	{
		// Ainda não entramos nesta função de movimento. Não se mexe na matriz.
		
	} else if (Periodo_Movimento < this.span)
	{
		//Estamos a meio do movimento.
	
		//Reset à matriz de transformação
		mat4.identity(this.Matriz_Animation);
		
		//Afastar o objecto do centro, de forma a que esteja igual a um raio de distancia.
		var angulo_progresso = (this.startang*degToRad) + (Periodo_Movimento*this.delta);
		var dist_x = this.radius*Math.cos(angulo_progresso);
		var dist_y = 0;
		var dist_z = this.radius*Math.sin(angulo_progresso);
		mat4.translate(this.Matriz_Animation, this.Matriz_Animation, [dist_x, dist_y, dist_z]);
		//Mudar a animação tooda de forma a centrar no eixo do centro, à altura correcta
		mat4.translate(this.Matriz_Animation, this.Matriz_Animation, this.center);
		
			
		//Orientação em que o objecto olha é proporcional à direcção do movimento.
		if (this.rotang > 0)
			mat4.rotate(this.Matriz_Animation, this.Matriz_Animation, -angulo_progresso, [0,1,0]);
		else
			mat4.rotate(this.Matriz_Animation, this.Matriz_Animation, (-90+this.startang)*degToRad-angulo_progresso, [0,1,0]);	
		
	}
	else if (this.done == false) 
	{	
		//Posicionar o objecto no final da animação e retornar sempre essa matriz

		mat4.identity(this.Matriz_Animation);
		var angulo_progresso = (this.startang*degToRad) + (this.span*this.delta);
		var dist_x = this.radius*Math.cos(angulo_progresso);
		var dist_y = 0;
		var dist_z = this.radius*Math.sin(angulo_progresso);
		mat4.translate(this.Matriz_Animation, this.Matriz_Animation, [dist_x, dist_y, dist_z]);
		mat4.translate(this.Matriz_Animation, this.Matriz_Animation, this.center);
		if (this.rotang > 0)
			mat4.rotate(this.Matriz_Animation, this.Matriz_Animation, (-90+this.startang)*degToRad-angulo_progresso, [0,1,0]);
		else
			mat4.rotate(this.Matriz_Animation, this.Matriz_Animation, this.startang*degToRad-angulo_progresso, [0,1,0]);	
		
		this.done = true;
	}
	

}