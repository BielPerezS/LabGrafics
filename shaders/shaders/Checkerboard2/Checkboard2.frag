#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor; 

uniform float n = 8;

int colorChess(float s, float t) {
    int is = s < 0 ? int(-s*n+1) : int(s*n);
    int it = t < 0 ? int(-t*n+1) : int(t*n);
    return 1 ^ ((is % 2) ^ (it % 2));
}

void main()
{
    fragColor = vec4(0.8) * colorChess(vtexCoord.s, vtexCoord.t);
}