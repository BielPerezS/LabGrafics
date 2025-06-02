#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform bool classic = true;
uniform float radi = 0.2;
const float PI = 3.141592;

void main()
{

    //le cordenades (0,0) començen abaix a l'esquerra fins a adalt a dreta (1,1), 
    // pertant el centre es a (0.5,0.5)
    float distance = distance(vtexCoord, vec2(0.5f,0.5f));

    if (distance < radi)
        fragColor = vec4(1, 0, 0, 1);
    else 
        fragColor = vec4(0.90, 0.90, 0.90, 1); 

    if (classic){
        vec2 u = vec2(vtexCoord.x - 0.5, vtexCoord.y - 0.5);
        float angle = atan(u.t, u.s);
        
        if (mod(angle/(PI/16) + 0.5,2) < 1)
            fragColor = vec4(1, 0, 0, 1);
    }

}
