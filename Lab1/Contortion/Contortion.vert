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
    //Definicio de A
    float A = (vertex.y -0.5)*sin(time);
    //Condicio de zones on aplicar la rotacio
    if (vertex.y < 0.5) {
        A = 0.0;
    }
    //Definicio de matriu de rotacio respecte l'eix X
    mat3 RotacioEiX = mat3(
        vec3(1.0, 0.0       , 0.0),
        vec3(0.0, cos(A)    , -sin(A)),
        vec3(0.0, sin(A)    , cos(A))
    );
    //Apliquem traslacio dita per enunciat
    vec3 vertexRotat = RotacioEiX * (vertex - vec3(0,1,0)) + vec3(0,1,0);


    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0);
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertexRotat, 1.0);
}
