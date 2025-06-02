#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

const vec3 red = vec3(1.0, 0, 0);
const vec3 yellow = vec3(1.0, 1.0, 0);
const vec3 green = vec3(0, 1.0, 0);
const vec3 cian = vec3(0, 1.0, 1.0);
const vec3 blue = vec3(0, 0, 1.0);

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;

void main()
{
    float maxY = boundingBoxMax.y, minY = boundingBoxMin.y;
    vec3 N = normalize(normalMatrix * normal);
    float y = (modelViewProjectionMatrix * vec4(vertex, 1.0)).y * 1000;
    vec3 ry = mix(red, yellow, 4*(y - minY) / (maxY / minY));
    vtexCoord = texCoord; 
    gl_Position = modelViewProjectionMatrix * (vec4(vertex, 1.0));
    frontColor = vec4(ry.xyz, 1.0);
}
