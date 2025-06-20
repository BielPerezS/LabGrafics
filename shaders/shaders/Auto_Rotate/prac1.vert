#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

const float pi = 3.141592;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float speed = 0.5;
uniform float time;

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = texCoord;
    float angle = speed * time;
    mat3 rotateY = mat3(cos(angle), 0, sin(angle),
                    0, 1, 0,
                    -sin(angle), 0, cos(angle));
    vec3 rotated_vertex = rotateY * vertex;
    gl_Position = modelViewProjectionMatrix * (vec4(rotated_vertex, 1.0));
}
