#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec3 fvertex;
out vec3 fnormal;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;


void main()
{
    vec3 N = normalize(normalMatrix * normal);
    fvertex = vertex;
    fnormal = normal;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * (vec4(vertex, 1.0));
}
