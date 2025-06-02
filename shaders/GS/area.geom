#version 330 core

layout (triangles) in;
layout (triangle_strip, max_vertices = 3) out;

uniform mat4 modelViewProjectionMatrix;
in vec3 gnormal[];

const float areamax = 0.0005;

out vec3 color;

void main()
{
    float area = length(cross(gl_in[0].gl_Position.xyz - gl_in[1].gl_Position.xyz, gl_in[1].gl_Position.xyz - gl_in[2].gl_Position.xyz)) / (areamax * 2);
    for (int i = 0; i < 3; i++)
    {
        
        color = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 1.0, 0.0), area);
        gl_Position = modelViewProjectionMatrix * gl_in[i].gl_Position;
        EmitVertex();
    }
    EndPrimitive();
}