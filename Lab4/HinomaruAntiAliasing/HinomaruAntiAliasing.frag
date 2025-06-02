#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform float radi = 0.2;

void main()
{

    //le cordenades (0,0) començen abaix a l'esquerra fins a adalt a dreta (1,1), 
    // pertant el centre es a (0.5,0.5)
    float distance = distance(vtexCoord, vec2(0.5f,0.5f));

    // de 0.2 a 0.3 es el gradient que es fa servir per fer l'anti-aliasing
    float c = smoothstep(0.2,0.3,distance);

    if (distance < radi)
        fragColor = vec4(1, 0, 0, 1);
    else 
        // el color de la part exterior es fa difus amb el color de la part interior
        fragColor = mix(vec4(1,0,0,0),vec4(1),c);
}
