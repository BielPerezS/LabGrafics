#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

bool in_permieter(float s,float t){
    return (    (s > 0.15 && s < 0.85) && 
                (t < 0.8) && (t > 0.2));
}

void main()
{
    float s = vtexCoord.s;
    float t = vtexCoord.t;
    //fondo
    fragColor = vec4(0.1,0.8,0.0,0);

    //rectangle groc
    if (in_permieter(s,t))
        fragColor = vec4(1,1,0,0);

    //cercle ajustat 
    float dist = distance(vec2(s*1.5,t),vec2(0.75,0.5));

    if (dist < 0.22)
        fragColor = vec4(0,0,0.8,0);


    //elpises i segmentacio
    float dist1 = distance(vec2(s/1.1,t/1.4),vec2(0.47,0.2 + 0.22));
    float dist2 = distance(vec2(s/1.1,t/1.4),vec2(0.47,0.18+ 0.22));
    

    if (dist1 > 0.15 && dist2 < 0.15)
        fragColor = vec4(1,1,0,0);
}
