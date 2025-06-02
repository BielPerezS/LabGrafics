#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;
in vec3 Neye[];
uniform mat4 modelViewProjectionMatrix;
uniform bool culling = true;
out vec3 P[3];
out vec3 C;

void main( void )
{	
	vec3 Centre = (gl_in[0].gl_Position.xyz + gl_in[1].gl_Position.xyz + gl_in[2].gl_Position.xyz) / 3.0;
	int negZcount = 0;
	for( int i = 0 ; i < 3 ; i++ )
	{
		if (Neye[i].z < 0.0)
		{
			negZcount++;
		}
		gfrontColor = vfrontColor[i];
		gl_Position = modelViewProjectionMatrix * gl_in[i].gl_Position;
		P[i] = gl_in[i].gl_Position.xyz;
		EmitVertex();
	}
	if (negZcount < 3 && culling)
    	EndPrimitive();
}
