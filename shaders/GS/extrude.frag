#version 330 core

out vec4 fragColor;

in vec3 fnormal;

uniform mat3 normalMatrix;

void main()
{
    vec3 N = normalMatrix * fnormal;
    N = normalize(N);
    fragColor = vec4(vec3(N.z), 1.0);
}