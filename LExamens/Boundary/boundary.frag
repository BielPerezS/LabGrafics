#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 Peye;
in vec3 Neye;

uniform float edge0 = 0.35;
uniform float edge1 = 0.4;

void main()
{
    vec3 V = normalize(Peye);
    
    float NdotnegativeV = dot(Neye,-V);
    
    float c = NdotnegativeV / (length (V) * length(Neye));

    if (c > edge1)
        fragColor = vec4(1);
    else if (c > edge0) {
        fragColor = vec4(0);
    }
    else {
        float valor = smoothstep(0,1,(c-0.35)*20);
        fragColor = vec4(valor);
    }

    //ho puedes hacer esto y ya esta... pero bueno lo mio era mas talcual el enunciado...
    //fragColor = vec4(smoothstep(edge0, edge1, c));
}
