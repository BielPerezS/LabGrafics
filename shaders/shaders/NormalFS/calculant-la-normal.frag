#version 330 core

in vec3 fvertex;

in vec4 frontColor;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

out vec4 FragColor;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightPosition; // (sempre estarà en eye space)
uniform vec4 matAmbient;
uniform vec4 matDiffuse;

void main()
{
    vec3 dx = dFdx(fvertex);
    vec3 dy = dFdy(fvertex);
    vec3 fnormal = normalize(cross(dx, dy));
    vec3 N = normalize(normalMatrix * fnormal);
    
    FragColor = vec4(frontColor.rgb * N.z, 1.0);
}