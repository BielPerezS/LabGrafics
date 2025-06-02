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

uniform float scale = 0.8;
uniform vec3 V = vec3(2, 2, 0);

uniform float time;

float triangleWave(float x) {
    return abs(mod(x, 2) - 1.0);
}

void main()
{
    vec3 N = normalize(normalMatrix * normal); 
    vec3 t = vec3(triangleWave(time / 1.618), triangleWave(time), 0);
    vec3 bounceVertex = scale * (vertex + (V * t));
    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * (vec4(bounceVertex, 1.0));
}
