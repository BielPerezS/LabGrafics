#version 330 core

layout (triangles) in;
layout (triangle_strip, max_vertices=18) out;

uniform mat4 modelViewProjectionMatrix;

in vec3 gnormal[];  
in vec3 gcolor[];
in vec3 gvertex[];

out vec3 fnormal;
out vec3 vertex;

uniform float d = 1;

uniform float speed = 1.2;

void main()
{   
    vec3 average_normal = (gnormal[0] + gnormal[1] + gnormal[2]) / 3.0;
    average_normal = normalize(average_normal);
    for (int i = 0; i < 3; i++)
    {
        fnormal = gnormal[i];
        vertex = gvertex[i];
        gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
        EmitVertex();
    }
    EndPrimitive();

    for (int i = 0; i < 3; i++)
    {
        vec3 edge1 = gvertex[(i + 1) % 3] - gvertex[i];
        vec3 edge2 = (gvertex[i] + average_normal * d) - gvertex[i];
        fnormal = normalize(cross(edge1, edge2));
        vertex = gvertex[i];
        gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
        EmitVertex();
        vertex = vertex + (average_normal * d);
        gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
        EmitVertex();
        vertex = gvertex[(i+1)%3];
        gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
        EmitVertex();
        vertex = vertex + (average_normal * d);
        gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
        EmitVertex();
        EndPrimitive();

    }

    for (int i = 0; i < 3; i++)
    {
        fnormal = gnormal[i];
        vertex = gvertex[i];
        vertex = vertex + (average_normal * d);
        gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
        EmitVertex();
    }
    EndPrimitive();
    
}
 