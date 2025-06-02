#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

const vec4 colors[5] = vec4[5] (
                        vec4(1.0,0.0,0.0,1.0), //red
                        vec4(1.0,1.0,0.0,1.0), //yellow
                        vec4(0.0,1.0,0.0,1.0), //green
                        vec4(0.0,1.0,1.0,1.0), //cian
                        vec4(0.0,0.0,1.0,1.0));//blue

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;

void main()
{
    vec3 N = normalize(normalMatrix * normal);

    //creem cinc secicons (cuatre linies == 5 particions)
    float interval = (boundingBoxMax.y-boundingBoxMin.y)/4;
 
    //calculme a quin interval pertany el vertex
    float position = (vertex.y - boundingBoxMin.y)/interval;
 
    //traduccio de la posicio a un enter per acces al vector de colors despres
    int i = int(position);

    //degradat entre el color actual i el seguent
    frontColor = mix(colors[i], colors[i+1], fract(position));

    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
