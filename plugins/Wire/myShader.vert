#version 330 core
layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
out vec4 frontColor;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
void main()
{
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(N.z);
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
