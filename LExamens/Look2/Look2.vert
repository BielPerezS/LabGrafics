#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float time;


void main()
{
    float angle = cos(time);


    
    vec3 N = normalize(normalMatrix * normal);
    vec3 NewVertex;
    vec3 NewNormal;
 
    vtexCoord = texCoord;



    vec3 P = vertex;
    mat3 
     = mat3(
        vec3(cos(angle), 0, sin(angle)),
        vec3(0,1,0),
        vec3(-sin(angle),0,cos(angle))
        );

    vec3 Pprima = rotY*P;
    if (P.y >= 1.45){
        //ha de variar entre 0 i 1
        float t = smoothstep(1.45,1.55,P.y);
        //interpolacio lineal










        NewVertex = mix(P,Pprima,t);

        vec3 normal2 = (rotY * normal);
    	vec3 N2 = mix(normal, normal2, t);
    	N = normalize(normalMatrix * N2);
        gl_Position = modelViewProjectionMatrix * vec4(NewVertex, 1.0);
        frontColor = vec4(N.z);
    }

    else {

    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
    frontColor = vec4(N.z);
    }
}
