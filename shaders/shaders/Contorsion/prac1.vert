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

uniform float time;

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = texCoord;
    float angle = (vertex.y - 0.5) * 0.5 * sin(time);
    mat3 contort = mat3(1, 0, 0,
                        0, cos(angle), -sin(angle),
                        0, sin(angle), cos(angle));
    vec3 rotated_vertex = contort * vertex;
    gl_Position = modelViewProjectionMatrix * (vec4(rotated_vertex, 1.0));
}
