#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;

out vec2 vtexCoord;
out vec4 frontColor;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

void main()
{
    frontColor = vec4(color,1.0);
    float M = max(max(abs(vertex.x), abs(vertex.y)), abs(vertex.z));
    vec3 v = vertex / M;
    gl_Position = modelViewProjectionMatrix * vec4(v, 1.0);
}