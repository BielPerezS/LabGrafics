#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform sampler2D colorMap;
in vec2 vtexCoord;

void main()
{
    vec2 texC = vec2(vtexCoord.x,vtexCoord.y*7);

    // [0,1] => [0,8]
    int X = (int(texC.x*7))%7;
    int Y = (int(texC.y)%7);

    float s,t;

    if (Y == 0 && X == 1){
        s = texC.x + 5 * 1 / 7.f - X*1/7.f; 
        t = texC.y;
        fragColor = texture(colorMap,vec2(s,t));
    }
    else if ((Y <= 1) && X == 2){
        s = texC.x + 3 * 1 / 7.f - X*1/7.f; 
        t = texC.y;
        fragColor = texture(colorMap,vec2(s,t));
    }
    else if(Y == 1 && X > 2){
        s = texC.x + 2 * 1 / 7.f - X*1/7.f; 
        t = texC.y;
        fragColor = texture(colorMap,vec2(s,t));
    }
    else if(Y == 2 && X == 4){
        s = texC.x; 
        t = texC.y + -2;
        fragColor = texture(colorMap,vec2(t/7,s*7));
    }
    else if ((Y <= 4 && Y >= 1) && X == 6){
        s = texC.x + 3 * 1 / 7.f - X*1/7.f; 
        t = texC.y;
        fragColor = texture(colorMap,vec2(s,t));
    }
    else if (Y == 4 && X != 7){
        s = texC.x + 2 * 1 / 7.f - X*1/7.f; 
        t = texC.y;
        fragColor = texture(colorMap,vec2(s,t));
    }
    else if (Y == 5 && X == 2){
        s = -texC.x - 1 * 1 / 7.f - X*1/7.f; 
        t = texC.y;
        fragColor = texture(colorMap,vec2(s,t));
    }
    else if (Y == 5 && X == 0){
        s = texC.x + 4 * 1 / 7.f - X*1/7.f; 
        t = texC.y;
        fragColor = texture(colorMap,vec2(s,t));
    }
    else if(Y == 5 && X == 3){
        s = texC.x; 
        t = texC.y + 2;
        fragColor = texture(colorMap,vec2(t/7,s*7));
    }
    else
    fragColor = vec4(0); 

}
