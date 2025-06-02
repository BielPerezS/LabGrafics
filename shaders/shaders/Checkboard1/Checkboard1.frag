#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor; 

int colorChess(float s, float t) {
    int is = s < 0 ? int(-s*8+1) : int(s*8);
    int it = t < 0 ? int(-t*8+1) : int(t*8);
    return 1 ^ ((is % 2) ^ (it % 2));
}

void main()
{
    fragColor = vec4(0.8) * colorChess(vtexCoord.s, vtexCoord.t);
}