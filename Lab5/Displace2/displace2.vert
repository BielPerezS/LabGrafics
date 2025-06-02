#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform sampler2D heightMap;
uniform float scale = 0.25;

out vec2 st;

void main()
{
    //Objectiu = Aplicar desplcament en direccio de la normal EN OBJECT SPACE


    //Calcul del desplaçament 
    
    //st ara son les nostres vtexCoord
    st = 0.49*vertex.xy + vec2(0.5);
    //per no confondrens amb els noms fem servir vtexCoord as usual (ja que estem redifint vtexCoord amb st)
    vtexCoord = st;

    //desplacament segons .r
    vec4 HeightField = texture(heightMap,vtexCoord);
    float R = (HeightField.r);
    float desplacament = R*scale;

    //La normal en object space es normal talcual
    vec3 NewVertex = vertex + normal*desplacament;

    gl_Position = modelViewProjectionMatrix * vec4(NewVertex, 1.0);
}
