#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor; 

uniform sampler2D myMap;

void main()
{
    fragColor = frontColor * texture(myMap, vtexCoord);
}