#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor; 

uniform float n = 0.2;
uniform bool classic;

const float pi = 3.14159265359;

float isInR(float R) {
    return distance(vtexCoord, vec2(0.5, 0.5)) < R ? 1 : 0;
}

float isRay(float angle) {
    vec2 u = vtexCoord - vec2(0.5, 0.5);
    float angle2 = atan(u.t, u.s);
    return mod(angle2/angle + 0.5, 2) < 1 ? 1 : 0;
}

void main()
{
    float paintRed = min(isInR(n) + (isRay(pi/16) * float(!classic)), 1);
    paintRed = 1 - paintRed;
    fragColor = vec4(1, vec2(1, 1) * paintRed, 1);
}