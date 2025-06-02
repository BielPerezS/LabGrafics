#version 330 core

uniform sampler2D myMap;

in flat int textureOn;
in vec2 gtexCoord;
in vec4 gfrontColor;
out vec4 fragColor;

void main()
{
    if (textureOn) fragColor = texture(myMap, gtexCoord);
    fragColor = gfrontColor;
}