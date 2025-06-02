#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

const float pi = 3.14159265359;

out vec3 VertexRotat;
out vec3 NRotat;

void main()
{

    vtexCoord = texCoord;

    float angle = -pi/2;
    vec3 NewVertex = vertex;
    mat3 RotateMatrix = mat3(
                        vec3(1  , 0   , 0),
                        vec3(0  , cos(angle) , -sin(angle)),
                        vec3(0  , sin(angle) , cos(angle))
    );
    NewVertex = RotateMatrix*NewVertex;
    
    vec3 N = normalize(normalMatrix * RotateMatrix * normal);
    frontColor = vec4(color,1.0) * N.z;

    NRotat = N;
    VertexRotat = (modelViewProjectionMatrix*vec4(NewVertex,1)).xyz;

    gl_Position = modelViewProjectionMatrix * vec4(NewVertex, 1.0);
}
