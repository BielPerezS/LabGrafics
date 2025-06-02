#version 330 core

out vec4 fragColor;

in vec3 gfrontColor;

void main()
{
    fragColor = vec4(gfrontColor, 1.0);
}