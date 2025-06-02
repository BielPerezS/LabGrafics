#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;
out vec2 gtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform float size = 0.07;
uniform float depth = -0.01;


void makesquare(vec3 C)
{
	gfrontColor = vec4(1,1,0,0);
	
	gtexCoord = vec2(0,0); gl_Position = vec4(C.x - size, C.y - size, C.z + depth, 1.0);
	EmitVertex();

	gtexCoord = vec2(7,0); gl_Position = vec4(C.x + size, C.y - size, C.z + depth, 1.0);
	EmitVertex();

	gtexCoord = vec2(0,7); gl_Position = vec4(C.x - size, C.y + size, C.z + depth, 1.0);
	EmitVertex();

	gtexCoord = vec2(7,7); gl_Position = vec4(C.x + size, C.y + size, C.z + depth, 1.0);
	EmitVertex();

	EndPrimitive();
}

void main( void )
{
	// Per a cada triangle 
	vec4 C = (gl_in[0].gl_Position + gl_in[1].gl_Position + gl_in[2].gl_Position) / 3.0;
	vec4 Cclip = (modelViewProjectionMatrix* C);
	vec3 Cndc = Cclip.xyz / Cclip.w;
	makesquare(Cndc);
	for( int i = 0 ; i < 3  ; i++ )
	{
		gfrontColor = vfrontColor[i];
		vec4 Clip = (modelViewProjectionMatrix * gl_in[i].gl_Position);
		vec3 ClipNdc = Clip.xyz / Clip.w;
		gl_Position = vec4(ClipNdc, 1.0);
		EmitVertex();
	}
    EndPrimitive();
}
