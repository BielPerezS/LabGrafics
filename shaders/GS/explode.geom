#version 330 core

layout (triangles) in;
layout (triangle_strip, max_vertices=3) out;

uniform mat4 modelViewProjectionMatrix;

in vec3 gnormal[];  
in vec3 gcolor[];
in vec3 gvertex[];

out vec3 normal;
out vec3 color;
out vec3 vertex;

uniform float time;

uniform float speed = 1.2;

void main()
{   
    vec3 average_normal = (gnormal[0] + gnormal[1] + gnormal[2]) / 3.0;
    for (int i = 0; i < 3; i++)
    {
        normal = gnormal[i];
        color = gcolor[i];
        vertex = gvertex[i];
        vertex = vertex + average_normal * time * speed;
        gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
        EmitVertex();
    }
    EndPrimitive();
}
 