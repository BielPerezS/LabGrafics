#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 24) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform mat3 normalMatrix;
uniform mat4 modelViewProjectionMatrix;

uniform float time;

const vec4 GREY = vec4(0.8, 0.8, 0.8, 1);

void CubeVertex(bool a, bool b, bool c){
    float x = gl_PrimitiveIDIn & 1;
    float y = (gl_PrimitiveIDIn & 2) >> 1;
    float z = (gl_PrimitiveIDIn & 4) >> 2;
    vec3 center = vec3(x, y, z);
	
	vec3 R = vec3(0,0,0);
	if(a) R.x = 0.5; else R.x = -0.5;
	if(b) R.y = 0.5; else R.y = -0.5;
	if(c) R.z = 0.5; else R.z = -0.5;

	gl_Position = modelViewProjectionMatrix * vec4(center + R, 1.0);
	EmitVertex();
}

void main()
{
    if (gl_PrimitiveIDIn < 8)
    {
        //front 
        gfrontColor = GREY * (normalMatrix * vec3(0,0,1)).z;
        CubeVertex(false,false,true); 
        CubeVertex(true,false,true);
        CubeVertex(false,true,true); 
        CubeVertex(true,true,true); 
        EndPrimitive();

        //back 
        gfrontColor = GREY * (normalMatrix * vec3(0,0,-1)).z;
        CubeVertex(false,true,false); 
        CubeVertex(true,true,false); 
        CubeVertex(false,false,false); 
        CubeVertex(true,false,false);
        EndPrimitive();

        //left
        gfrontColor = GREY * (normalMatrix * vec3(-1,0,0)).z;
        CubeVertex(false,false,false); 
        CubeVertex(false,false,true); 
        CubeVertex(false,true,false); 
        CubeVertex(false,true,true);
        EndPrimitive();

        //rigth
        gfrontColor = GREY * (normalMatrix * vec3(1,0,0)).z;
        CubeVertex(true,true,false); 
        CubeVertex(true,true,true); 
        CubeVertex(true,false,false); 
        CubeVertex(true,false,true);
        EndPrimitive();

        //top
        gfrontColor = GREY * (normalMatrix * vec3(0,1,0)).z;
        CubeVertex(false,true,true); 
        CubeVertex(true,true,true); 
        CubeVertex(false,true,false); 
        CubeVertex(true,true,false);
        EndPrimitive();

        //bottom
        gfrontColor = GREY * (normalMatrix * vec3(0,-1,0)).z;
        CubeVertex(true,false,false); 
        CubeVertex(true,false,true); 
        CubeVertex(false,false,false); 
        CubeVertex(false,false,true);
        EndPrimitive();
    }

}