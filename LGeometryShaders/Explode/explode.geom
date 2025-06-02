#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

uniform mat4 modelViewProjectionMatrix;

in vec4 vfrontColor[];
in vec3 vnormal[];
out vec4 gfrontColor;

uniform float time;
const float speed = 0.5f;

void main( void )
{
	// Per a cada triangle

	vec3 normalavg = (vnormal[0] + vnormal[1] + vnormal[2]) / 3.0;
	vec3 displace = speed * time * normalize(normalavg);
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vfrontColor[i];
		vec4 NewP = (gl_in[i].gl_Position + vec4(displace, 0.0));
		gl_Position = modelViewProjectionMatrix * NewP;
		EmitVertex();
	}
    EndPrimitive();
}
