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
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
    

    vec4 NewVertex;
    float escala = 0.5+abs(sin(time));

    //Aixi tambe funciona aunk tecnicamente o estic fent en Clip Space *_*
    //NewVertex = modelViewProjectionMatrix * vec4(vertex, 1.0);
    //NewVertex = vec4(NewVertex.x*escala, NewVertex.y*escala, NewVertex.z, NewVertex.w);
 
    //Perspective division => NDC
    vec3 vertexNDC = gl_Position.xyz / gl_Position.w;
    NewVertex = vec4(vertexNDC.x*escala, vertexNDC.y*escala, vertexNDC.z, 1.0);

    frontColor = vec4(color,1.0) * N.z;
    gl_Position = NewVertex;
}
