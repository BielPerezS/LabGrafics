#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

const vec4 Orange = vec4(1,0.63,0,0);

bool es_rectangle (){
    float s = vtexCoord.s;
    float t = vtexCoord.t;
    return (    (s > 0.47 && s < 0.53)  &&
            (t > 0.75 && t < 0.9)  );
                 
}

void main()
{   
    float radi = 0.1;
    float dist = distance(vtexCoord,vec2(0.5,0.5));
    float dist2 = distance(vtexCoord,vec2(0.38,0.6));
    float dist3 = distance(vtexCoord,vec2(0.62,0.6));

    float c = smoothstep(0.0,0.6,dist);

    fragColor = mix(Orange,vec4(0),c);


    float radi2 = 0.3;

    if (dist < radi2){
        fragColor = vec4(0);
    }

    if (es_rectangle()){
        fragColor = vec4(0);
    }

    if (dist2 < 0.09){
        fragColor = mix(Orange,vec4(0),c);
    }

    if (dist3 < 0.09){
         fragColor = mix(Orange,vec4(0),c);
    }

    float dist4 = distance(vtexCoord,vec2(0.5,0.5));

    float dist5 = distance(vtexCoord,vec2(0.5,0.55));
    if (dist5 > 0.2 && dist4 < 0.2){
        fragColor = mix(Orange,vec4(0),c);
    }
}
