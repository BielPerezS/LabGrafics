#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

out vec3 inN;
out vec3 inV;
out vec3 inP;
out vec2 fraccCoord;

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    
    inN = normalize(normalMatrix * normal);
    inP = (modelViewMatrix * vec4(vertex, 1)).xyz;
    inV = -inP;
    
    vtexCoord = texCoord;

    fraccCoord = vec2(fract(texCoord.x),fract(texCoord.y));

    frontColor = vec4(color,1.0) * N.z;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
