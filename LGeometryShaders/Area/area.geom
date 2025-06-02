#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform mat4 modelViewMatrix;
uniform mat4 modelViewProjectionMatrix;

const vec4 RED=vec4(1,0,0,1);
const vec4 YELLOW=vec4(1,1,0,1);
const float areamax = 0.0005;

void main( void )
{
    // Transforma vértices al espacio de cámara
    vec3 V1 = (modelViewMatrix * gl_in[0].gl_Position).xyz;
    vec3 V2 = (modelViewMatrix * gl_in[1].gl_Position).xyz;
    vec3 V3 = (modelViewMatrix * gl_in[2].gl_Position).xyz;

    // Calcula área del triángulo
    vec3 U = V2 - V1;
    vec3 V = V3 - V1;
    float area = length(cross(U, V)) / 2.0;

	area /= areamax;
	
	float greenlvl = clamp(area , 0.0, 1.0);
	
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vec4(1, greenlvl, 0, 1);
		gl_Position = modelViewProjectionMatrix * gl_in[i].gl_Position;
		EmitVertex();
	}
    EndPrimitive();
}
