 #version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;

out vec3 inN;
out vec3 inV;
out vec3 inP;

uniform float time;
const float PI = 3.141592;
const float freq = 2;

void main()
{

    vec3 NewVertex = vertex;    
    float normTime = mod(time,3);
    if (normTime <= 1){

    NewVertex.y = NewVertex.y - 0.5*cos(PI*normTime*1.6)/2;

    float t = smoothstep(0,1,fract(normTime));
    float angle = 2*PI*t;
    mat3 rotY = mat3(vec3(cos(angle),0,sin(angle)),
                    vec3(0,1,0),
                    vec3(-sin(angle),0,cos(angle)));

    NewVertex = rotY*NewVertex;
    }
    inN = normalize(normalMatrix * normal);
    inP = (modelViewMatrix * vec4(NewVertex, 1)).xyz;
    inV = -inP;

    frontColor = vec4(color,1.0) * inN.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(NewVertex, 1.0);
}
