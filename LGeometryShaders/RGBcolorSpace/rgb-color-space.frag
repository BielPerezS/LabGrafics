#version 330 core

in vec4 gfrontColor;
out vec4 fragColor;
in float fmode;
in vec2 gtexCoord;

void main()
{
    fragColor = gfrontColor;
    if (fmode >= 2){
        float s = gtexCoord.x;
        float t = gtexCoord.y;
        if (s >= 0.95 || s <= 0.05 || t >= 0.95 || t <= 0.05) {
            fragColor = vec4(0);
    }
}
}
