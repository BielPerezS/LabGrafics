#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;
out float fmode;

in vec2 vtexCoord[];
out vec2 gtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform int mode = 3;

uniform float cut = -0.25; 


float light(vec3 a, vec3 b, vec3 c) {
    vec3 normal = cross(b-a,c-a);
    return normalize(normalMatrix*normal).z;
}

    void makeface(vec3 a, vec3 b, vec3 c, vec3 d) {
    // Coordenades de textura: (u,v)
    gtexCoord = vec2(1.0, 1.0); gl_Position = modelViewProjectionMatrix * vec4(a, 1); EmitVertex();
    gtexCoord = vec2(0.0, 1.0); gl_Position = modelViewProjectionMatrix * vec4(b, 1); EmitVertex();
    gtexCoord = vec2(1.0, 0.0); gl_Position = modelViewProjectionMatrix * vec4(c, 1); EmitVertex();
    gtexCoord = vec2(0.0, 0.0); gl_Position = modelViewProjectionMatrix * vec4(d, 1); EmitVertex();
    EndPrimitive();
}



vec3 traslate(float a, float b, float c) {
    vec4 C = (gl_in[0].gl_Position+gl_in[1].gl_Position+gl_in[2].gl_Position) / 3.0;
//C = round(C/step)*step ;
    return vec3(C) + vec3(a,b,c);
}

void main( void )
{       
	float R = 0.08;
	fmode = mode;
	if (mode >= 1){
		vec4 C = (gl_in[0].gl_Position+gl_in[1].gl_Position+gl_in[2].gl_Position) / 3.0;
		gfrontColor = C;
		if (mode == 3){
			if (C.x < cut || C.y < cut || C.z < cut) {
				makeface(traslate(R,R,R), traslate(-R,R,R), traslate(R,-R,R), traslate(-R,-R,R)); // front face
				makeface(traslate(R,R,-R), traslate(R,-R,-R), traslate(-R,R,-R), traslate(-R,-R,-R)); // back face - mal
				makeface(traslate(-R,R,R), traslate(-R,R,-R), traslate(-R,-R,R), traslate(-R,-R,-R)); // left face 
				makeface(traslate(R,R,R), traslate(R,-R,R), traslate(R,R,-R), traslate(R,-R,-R)); // right face  - mal
				makeface(traslate(-R,-R,R), traslate(-R,-R,-R), traslate(R,-R,R), traslate(R,-R,-R)); // bottom face
				makeface(traslate(-R,R,R), traslate(R,R,R), traslate(-R,R,-R), traslate(R,R,-R)); // top face -mal
			}
			else {

			}
		}
		if (mode == 2){
			makeface(traslate(R,R,R), traslate(-R,R,R), traslate(R,-R,R), traslate(-R,-R,R)); // front face
			makeface(traslate(R,R,-R), traslate(R,-R,-R), traslate(-R,R,-R), traslate(-R,-R,-R)); // back face - mal
			makeface(traslate(-R,R,R), traslate(-R,R,-R), traslate(-R,-R,R), traslate(-R,-R,-R)); // left face 
			makeface(traslate(R,R,R), traslate(R,-R,R), traslate(R,R,-R), traslate(R,-R,-R)); // right face  - mal
			makeface(traslate(-R,-R,R), traslate(-R,-R,-R), traslate(R,-R,R), traslate(R,-R,-R)); // bottom face
			makeface(traslate(-R,R,R), traslate(R,R,R), traslate(-R,R,-R), traslate(R,R,-R)); // top face -mal
		}
	}
	}