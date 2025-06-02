#version 330 core

in vec4 gfrontColor;
out vec4 fragColor;

in vec3 P[3];
in vec3 C;
uniform float size = 0.02;

void main()
{
    bool inside = true;
    for (int i = 0; i < 3; i++){
        if (distance(P[i], C) < size) {
            fragColor = gfrontColor;
        }
    }
}
