#version 330 core

in vec4 frontColor;
out vec4 fragColor;
uniform sampler2D colorMap;
in vec2 vtexCoord;
float slice = 1.f/30.f;
uniform float time;

void main()
{   
    //obtenim en quin frame estem
    int frame = int(time/slice);
    float s,t; 
    //fem que començin en 0,0
    s = vtexCoord.s / 8.f;
    t = vtexCoord.t / 6.f + 5/6.f;

    float x = s;
    float y = t;

    //un cop estem en el fram 8 es loopeja la x (degut a 1/8.f) Nice!
    x += frame * 1/8.f;
    //mateix que abans pero cada cop que ha fet loop movem (1/6) (loopeja en 6)
    y -= (frame/8)/6.f;

    //mixear el alfa con blanco
    vec3 White = vec3(1,1,1);
    vec4 exp = frontColor*texture(colorMap,vec2(x,y));

    fragColor = vec4(mix(White,exp.rgb,exp.a),1);
}
