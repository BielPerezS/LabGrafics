#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

const vec4 Blanc = vec4(1);
const vec4 Negre = vec4(0);
const vec4 Gris = vec4(0.8);
const vec4 Pell = vec4(1.0,0.8,0.6,0.0);

uniform int mode = 2;

void main()
{
    float s = vtexCoord.x;
    float t = vtexCoord.y;

    fragColor = Gris;
    if (mode >= 0){
        float dist = distance(vtexCoord,vec2(0.5,0.4));
        float dist1 = distance(vtexCoord,vec2(0.8,0.75));
        float dist2 = distance(vtexCoord,vec2(0.2,0.75));
        if (dist < 0.3)    
            fragColor = Negre;
        if (dist1 < 0.2 || dist2 < 0.2)
            fragColor = Negre;


        if (mode >= 1){
            float v1 = length(vec2(vtexCoord.x,vtexCoord.y*2) - vec2(0.5,0.6));
            if (v1 < 0.25)
                fragColor = Pell;
            float v2 = length(vec2(vtexCoord.x*2,vtexCoord.y) - vec2(0.9,0.45));
            if (v2 < 0.2)
                fragColor = Pell;
            float v3 = length(vec2(vtexCoord.x*2,vtexCoord.y) - vec2(1.1,0.45));
            if (v3 < 0.2)
                fragColor = Pell;

            if (mode == 2){
                float v4 = length(vec2(vtexCoord.x*2,vtexCoord.y) - vec2(0.9,0.45));
                if (v4 < 0.125)
                    fragColor = Blanc;
                float v5 = length(vec2(vtexCoord.x*2,vtexCoord.y) - vec2(1.1,0.45));
                if (v5 < 0.125)
                    fragColor = Blanc;

                float v6 = length(vec2(vtexCoord.x*2,vtexCoord.y) - vec2(0.93,0.43));
                if (v6 < 0.125/2.f)
                    fragColor = Negre;
                float v7 = length(vec2(vtexCoord.x*2,vtexCoord.y) - vec2(1.07,0.43));
                if (v7 < 0.125/2.f)
                    fragColor = Negre;
            }

        }
    }


}
