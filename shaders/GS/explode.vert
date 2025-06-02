#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;

out vec3 gnormal;
out vec3 gcolor;
out vec3 gvertex;

void main()
{
    gnormal = normal;
    gcolor = color;
    gvertex = vertex;
    gl_Position = vec4(vertex, 1.0);
}