#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform sampler2D colorMap;
in vec2 vtexCoord;

void main()
{
    vec2 texC = vec2(vtexCoord.x*6/10.f,vtexCoord.y);

    int X = int(texC.x*10)%6;

    float s,t;

    vec4 color;


    if (X == 0){
        s = texC.x +  4 / 10.f - X*1/10.f;
        t = texC.y;
        color = texture(colorMap,vec2(s,t));
    }
    else if (X == 1){
        s = texC.x +  6 / 10.f - X*1/10.f;
        t = texC.y;
        color = texture(colorMap,vec2(s,t));
    }
    else if (X == 2){
        s = texC.x +  1 / 10.f - X*1/10.f;
        t = texC.y;
        color = texture(colorMap,vec2(s,t));
    }
    else if (X == 3){
        s = texC.x +  2 / 10.f - X*1/10.f;
        t = texC.y;
        color = texture(colorMap,vec2(s,t));
    }
    else if (X == 4){
        s = texC.x +  3 / 10.f - X*1/10.f;
        t = texC.y;
        color = texture(colorMap,vec2(s,t));
    }
    else {
        s = texC.x +  4 / 10.f - X*1/10.f;
        t = texC.y;
        color = texture(colorMap,vec2(s,t));
    }


    if (color.a < 0.5)
        discard;
    else 
        fragColor = vec4(0,0,1,0);
}
