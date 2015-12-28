/**
 * Construtor da classe LinearAnimation.
 * 
 * @param id		String identificadora dese object
 * @param span 		tempo que a animação deve durar
 * @param timestart tempo desde o inicio de execução do programa em que a animação deve começar
 * @param type 		String que identifica qual o tipo de animação
 * @see #constructor_Movements(timestart)
 */
function LinearAnimation(id, span, timestart, type, ControlPoints, first){
	Animation.call(this,id,span,timestart,"linear");

	this.ControlPoints = ControlPoints;
	
	//Movements - Segmentos de animação. Uma para cada porção linear. 
	// Movement[] - Array com os valores de cada movimento
	// Movement_Amount - Numero de movements necessário
	// Movement_span - Tempo que demora cada movement
	this.Movements = [];
	this.Movement_Amount = this.ControlPoints.length - 1;
	this.Movement_span = this.span / this.Movement_Amount;
	
	//A função constroi os segmentos de animação
	this.constructor_Movements(timestart);
 	
	//Angulo que o objecto deve ficar a olhar.
	this.current_angle = 0;
	
};


LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

var degToRad = Math.PI / 180.0;

/**
 * Constroi elementos diferentes e sequenciais num array para segmentos de animação diferentes.
 * O tempo de inicio de um segmento é o final do segmento anterior
 * 
 * @param timestart		Tempo em que começam os movimentos da animação.
 * @see #calc_Angle(delta_x, delta_z)
 */
LinearAnimation.prototype.constructor_Movements = function(timestart)
{
	var latest_span_end = timestart;
	for (var i = 0; i < this.Movement_Amount; i++)
	{
		this.Movements[i] = {};	 
		//span 				- Se alguma vez Movements diferentes puderem ter spans diferentes... fica aqui.
		//time_begins 		- Momento em que começa este movimento
		//time_end 			- Momento em que termina este movimento
		//pos_inicial 		- Ponto de Controlo da posição Inicial
		//pos_final 		- Ponto de Controlo da posição Final
		//Matrix_deltas		- Matriz com a derivada do movimentos em cada eixo na ordem XYZ.
		//Matrix_distancias	- Matriz com as distâncias totais nos eixos. Para não haver erros no ultimo update num periodo qualquer.
		//Matrix_Traslation	- A Matriz que é aplicada nas trasnformações, é actualizada pelo update.
		//angle				- Orientação em XZ que o objecto deve olhar 
			//done			- Um booleano que é usado no updateMatrix para que não se façam muitas repetições inuteis de acções.
			
		this.Movements[i].span = this.Movement_span;
		this.Movements[i].time_begins = latest_span_end;
		this.Movements[i].time_ends = this.Movements[i].time_begins + this.Movements[i].span;
		latest_span_end += this.Movement_span;
		
		this.Movements[i].pos_inicial = this.ControlPoints[i];
		
		this.Movements[i].pos_final = this.ControlPoints[i+1];
		
		this.Movements[i].Matrix_distancias = []
		this.Movements[i].Matrix_distancias[0] = this.Movements[i].pos_final[0]-this.Movements[i].pos_inicial[0];	//x
		this.Movements[i].Matrix_distancias[1] = this.Movements[i].pos_final[1]-this.Movements[i].pos_inicial[1];	//y
		this.Movements[i].Matrix_distancias[2] = this.Movements[i].pos_final[2]-this.Movements[i].pos_inicial[2];	//z
		
		this.Movements[i].Matrix_deltas = [];
		this.Movements[i].Matrix_deltas[0] = this.Movements[i].Matrix_distancias[0] / this.Movements[i].span;	//x
		this.Movements[i].Matrix_deltas[1] = this.Movements[i].Matrix_distancias[1] / this.Movements[i].span;	//y
		this.Movements[i].Matrix_deltas[2] = this.Movements[i].Matrix_distancias[2] / this.Movements[i].span;	//z
		
		this.Movements[i].Matrix_Traslation = [0,0,0];
		
		
		this.Movements[i].angle = this.calc_Angle(this.Movements[i].Matrix_deltas[0], this.Movements[i].Matrix_deltas[2]);
		
		this.Movements[i].done = false;
	}

}

/**
 * Faz update A matriz de transformções que resolve o estado da animação para um determinado tempo dado.
 * 
 * @param Tempo_Mili		Tempo que passou (em milisegundos) desde o inicio da execução do programa.
 * @see #calc_Angle(delta_x, delta_z)
 */
LinearAnimation.prototype.updateMatrix = function(Tempo_Mili)
{
	var Tempo_Segundos = Tempo_Mili/1000;
		
	//Reset à matriz de transformação
	mat4.identity(this.Matriz_Animation);
	
	//Na eventualidade de o primeiro ponto de controlo não ser a origem, transporta-se o objecto para essa posição antes de começar.
	mat4.translate(this.Matriz_Animation, this.Matriz_Animation, this.ControlPoints[0]);

		for (var i = 0; i < this.Movement_Amount; i++)
		{
			
			//A decisão de como alterar a Matriz para cada Movement depende de se o tempo que passou já corresponde a esse Movement.
			var Periodo_Movimento = Tempo_Segundos - this.Movements[i].time_begins;			
			
			if (Periodo_Movimento <= 0) 
			{
				// Ainda não estamos neste momento. Não se mexe nas matrizes.
				;
			}
			else if (Periodo_Movimento < this.Movements[i].span)
			{
				this.Movements[i].Matrix_Traslation[0] = Periodo_Movimento * this.Movements[i].Matrix_deltas[0];
				this.Movements[i].Matrix_Traslation[1] = Periodo_Movimento * this.Movements[i].Matrix_deltas[1];
				this.Movements[i].Matrix_Traslation[2] = Periodo_Movimento * this.Movements[i].Matrix_deltas[2];
				
				//Entretanto escolhemos o angulo.
				if (this.Movements[i].angle != null)
					this.current_angle = this.Movements[i].angle;
				
			}
			else if (this.Movements[i].done == false) 
			{			
				//Já acabou este segmento do movimento, as distâncias na matriz devem ser máximas
				this.Movements[i].Matrix_Traslation[0] = this.Movements[i].Matrix_distancias[0];
				this.Movements[i].Matrix_Traslation[1] = this.Movements[i].Matrix_distancias[1];
				this.Movements[i].Matrix_Traslation[2] = this.Movements[i].Matrix_distancias[2];
				this.Movements[i].done = true;
							
				//console.log("A animação " + this.id + " terminou agora o segmento de movimento de indice " + i);
			}

			mat4.translate(this.Matriz_Animation, this.Matriz_Animation, this.Movements[i].Matrix_Traslation);
			
		}
		
		mat4.rotate(this.Matriz_Animation, this.Matriz_Animation, this.current_angle*degToRad, [0,1,0]);

		if (Tempo_Segundos > this.timeend)
		{
			this.done = true;
		}

}


/**
 * Devolve, para um determinado vector 2D com componentes XZ, o angulo em que um objecto deve ficar orientado 
 * 
 * @param delta_x		Componente em X.
 * @param delta_z		Componente em Z.
 */
LinearAnimation.prototype.calc_Angle = function(delta_x, delta_z) {
	if (delta_x == 0 && delta_z == 0)
		return 0;
	else if (delta_x == 0)
	{
		if (delta_z > 0)
			return 0;
		else
			return 180;	
	}
	else if (delta_z == 0)
	{
		if (delta_x > 0)
			return 90;
		else
			return -90;	
	} else
		return Math.atan2(delta_x,delta_z)/degToRad;
	

}
