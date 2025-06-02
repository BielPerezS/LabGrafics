#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform vec3 boundingBoxMin; // cantonada mínima de la capsa englobant
uniform vec3 boundingBoxMax; // cantonada màxima de la capsa englobant

uniform float time;
const float PI = 3.1416;

float punt(float x) {
	return (boundingBoxMax.y - boundingBoxMin.y)*x + boundingBoxMin.y;
}

void main() {
    vec3 N = normalize(normalMatrix * normal), V = vertex;
    frontColor = vec4(0.8) * N.z;
    vtexCoord = texCoord;
    vec3 NewVertex = vertex;
    float RT = punt(0.35);
	float RD = punt(0.65);
    
    //queda mes limpio encomptes de RT :P
    if (vertex.y <= punt(0.5)) {
		float TT1 = punt(0.5);
		float TT2 = punt(0.05);
	//                 angel      oscila en base temps + offset
		float angle = PI/4.0 * sin(time + 0.0);
		mat3 RotX = mat3(
			vec3(1,0,0),
			vec3(0,cos(angle),sin(angle)),
			vec3(0,-sin(angle),cos(angle))
		);

		float factor = smoothstep(TT2,TT1,vertex.y);
		vec3 vertexRotat100 = RotX*vertex;
		NewVertex = mix(vertexRotat100,vertex,factor);
	}
    //queda mes limpio encomptes de RD :P
	else if (vertex.y >= punt(0.55)) {
        float TD1 = punt(0.55);
		float TD2 = punt(0.75);
	//                 angel      oscila en base temps + offset
		float angle = PI/32.0 * sin(time + 0.25);
		mat3 RotX = mat3(
			vec3(1,0,0),
			vec3(0,cos(angle),sin(angle)),
			vec3(0,-sin(angle),cos(angle))
		);

		float factor = smoothstep(TD1,TD2,vertex.y);
		vec3 vertexRotat100 = RotX*vertex;
		NewVertex = mix(vertex,vertexRotat100,factor);

	}
    
    gl_Position = modelViewProjectionMatrix * vec4(NewVertex, 1.0);
}