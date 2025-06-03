#version 330 core
in vec4 gfrontColor;
out vec4 fragColor;
in vec2 gtexCoord;


void main()
{
    float s = gtexCoord.x;
    float t = gtexCoord.y;
    if (s < 0.05 || s > 0.95 || t < 0.05 || t > 0.95) {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black border
    } else {
    fragColor = gfrontColor;
    }
}
