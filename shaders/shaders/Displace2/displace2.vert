#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec3 fvertex;

uniform sampler2D heightMap;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float scale = 0.05;

void main()
{
    vec2 st = 0.49 * vertex.xy + vec2(0.5f);
    float displacement = texture(heightMap, st).r;
    vec3 dvertex = vertex + displacement * normal * scale;
    gl_Position = modelViewProjectionMatrix * vec4(dvertex, 1.0);    
    fvertex = vertex;
}