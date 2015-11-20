
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D HeightMap;
uniform float normScale;


/*
void main() {
	//Original
	vec3 offset=vec3(0.0,0.0,0.0);
	vTextureCoord = aTextureCoord;
	if (texture2D(HeightMap, vec2(0.0,0.1)+vTextureCoord).b > 0.5)
		offset=aVertexNormal*normScale*0.2;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

*/


void main() {
	vTextureCoord = aTextureCoord;
	vec4 colormap = texture2D(HeightMap, aTextureCoord);
	vec3 offset=vec3(0.0,0.0,0.0);    

	offset.y += colormap.g*normScale;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}