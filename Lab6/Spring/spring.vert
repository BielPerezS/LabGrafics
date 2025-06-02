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
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(N.z);

    vec3 NewVertex;
    
    float mod = mod(time,3.5);

    //Fase1
    if (mod < 0.5){
        float exp = pow(mod/0.5,3);
        NewVertex = mix(vec3(0,0,0),vertex,exp);
    }
    //Fase2
    else {
        NewVertex = mix(vertex,vec3(0,0,0),(mod-0.5)/3);
    }

    gl_Position = modelViewProjectionMatrix * vec4(NewVertex, 1.0);
}
