#version 330 core

in vec4 gfrontColor;
out vec4 fragColor;

in vec3 P;
in vec3 C;
uniform float size = 0.02;
uniform bool opaque = true;

void main()
{
    if (distance(P,C) < size*2){
        fragColor = gfrontColor;
    }
    else{
        if (opaque)
            discard;
        else
            fragColor = vec4(1);
    }
}
