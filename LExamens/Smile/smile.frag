#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 N;
in vec2 vtexCoord;

void main()
{

    fragColor = vec4(0.7);
    float dist1 = distance(vtexCoord,vec2(0.5,0.5));
    if (dist1 < 0.49)
        fragColor = vec4(1,1,0,0);
    if (dist1 >= 0.49 && dist1 <= 0.5)
        fragColor = vec4(0);
    
    float dist2 = distance(vtexCoord,vec2(0.5,0.45));
    float dist3 = distance(vtexCoord,vec2(0.5,0.48));
    if (dist2 < 0.3 && dist3 > 0.3 && vtexCoord.y < 0.3)
        fragColor = vec4(0);
    
    float dist4 = distance(vtexCoord,vec2(0.25,0.3));
    float dist5 = distance(vtexCoord,vec2(0.75,0.3));
    if (dist4 < 0.03 ||dist5 < 0.03)
        fragColor = vec4(0);

    float dist6 = distance(vtexCoord,vec2(0.34,0.65) -0.1*N.xy);
    float dist7 = distance(vtexCoord,vec2(0.66,0.65) -0.1*N.xy);

    float dist8 = distance(vtexCoord,vec2(0.34,0.65));
    float dist9 = distance(vtexCoord,vec2(0.66,0.65));
    if (dist8 < 0.13  || dist9 < 0.13)
        fragColor = vec4(1);

    if (dist6 < 0.05 || dist7 < 0.05)
        fragColor = vec4(0);
}
