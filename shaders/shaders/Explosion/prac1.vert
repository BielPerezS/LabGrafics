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
    frontColor = vec4(color,1.0);
    vec2 frame = texCoord * vec2(10 / 80.f, 10 / 60.f);
    int id = int(time*30);
    float x = (id % 8) / 8.f;
    float y = (5.f - ((id/8) % 6)) / 6.f; 
    vec2 frame2 = vec2(frame.x + x, frame.y + y);
    vtexCoord = frame2;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}