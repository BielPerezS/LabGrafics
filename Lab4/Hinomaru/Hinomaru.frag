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

    if (distance < radi)
        fragColor = vec4(1, 0, 0, 1);
    else 
        fragColor = vec4(0.9, 0.9, 0.9, 1); 

}
