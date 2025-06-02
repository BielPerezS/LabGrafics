#version 330 core

in vec4 gfrontColor;
out vec4 fragColor;
in vec2 gtexCoord;

void main()
{
    fragColor = gfrontColor;
    float s = gtexCoord.x;
    float t = gtexCoord.y;
    if (fragColor == vec4(1,1,0,0)){
        if (s >= 2 && s < 3){
            if (t <= 6 && t >= 1)
                fragColor = vec4(0); 
        }

        else if (s >= 3 && s < 4){
            if (t <= 4 && t >= 3)
                fragColor = vec4(0);
            else if (t >= 5 && t <= 6)
                fragColor = vec4(0);
        }

        else if (s >= 4 && s < 5){
            if (t >= 5 && t <= 6)
                fragColor = vec4(0);
        }
    }
}
