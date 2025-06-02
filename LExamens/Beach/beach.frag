#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
in vec3 Neye;
uniform float time;

uniform sampler2D window; // interior
uniform sampler2D palm1; // palm-tree
uniform sampler2D background2; // dunes

void main()
{
    
    fragColor = frontColor;
    vec4 C = texture(window,vtexCoord);
    if (C.a == 1)
        fragColor = C;
    else {
        vec4 D = texture(palm1,vtexCoord + 0.25*Neye.xy + vec2(0.1*sin(2*time)*vtexCoord.t, 0));
        if (D.a >= 0.5)
            fragColor = D;
        else {
            fragColor = texture(background2,vtexCoord+0.5*Neye.xy);
        }
    }
}
