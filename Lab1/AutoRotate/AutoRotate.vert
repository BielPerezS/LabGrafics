#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float speed = 0.5;
uniform float time;

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    
    //Definicio de matriu de rotacio respecte l'eix Y
    mat3 RotateMatrix = mat3(
                        vec3(cos(speed * time)  , 0.0     , sin(speed * time)),
                        vec3(0.0                , 1.0     , 0.0),
                        vec3(-sin(speed * time) , 0.0     , cos(speed * time))
    );
    frontColor = vec4(color,1.0);
    vtexCoord = texCoord;
    //                                          Aqui es on apliquem la rotacio
    gl_Position = modelViewProjectionMatrix * vec4(RotateMatrix * vertex, 1.0);
}
