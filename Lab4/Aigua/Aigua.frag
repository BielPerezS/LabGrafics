#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform float time;
uniform sampler2D fons;
uniform sampler2D noise1;

in vec2 vtexCoord;

void main()
{

    vec2 noiseTxtCoord = vec2(vtexCoord.s+0.08*time,vtexCoord.t+0.07*time);
    vec4 textureFons = texture(noise1,noiseTxtCoord);
    
    vec2 calc = vec2(textureFons.r*0.03,textureFons.g*-0.005);
    vec2 NewVtexCoord = vtexCoord + calc;

    vec4 aigua = texture(fons,NewVtexCoord);
    fragColor = aigua;
}
