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

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
    
    //normalitzar les dades a com esta el viewport
    //si fessim servir vertex.y en comptes de gl_Position.y, el gradient seria fixe en l'objecte
    vec3 vertexNDC = gl_Position.xyz / gl_Position.w;

    //importatnt posar .f    (tenim valors de 0 - 2) i volem 4 intervals
    float interval = 2.f/4.f;

    // normalitzerm els valor [-1,1] per a que siguie de [0,2]  per aixo +1
    float position = (vertexNDC.y+1) /interval;
    int i = int(position);

    //degradat entre el color actual i el seguent
    frontColor = mix(colors[i], colors[i+1], fract(position));

    vtexCoord = texCoord;
    
}
