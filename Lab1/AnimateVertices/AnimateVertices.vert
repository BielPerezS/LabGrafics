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
uniform float amplitude = 0.1;
uniform float freq = 0.5;

float PI = 3.14159265359;

void main()
{
    
    vec3 N = normalize(normalMatrix * normal);

    //Calcul de la distancai a moures sinusoidalment
    float D = amplitude*sin(2.0*PI*freq*time);

    //En direccio de la normal
    vec3 MovedVertex = vertex + normal*D;
    
    frontColor = vec4(vec3(N.z),1.0);
    
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(MovedVertex,1.0);
}