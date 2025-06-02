#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor; 

uniform sampler2D myMap;

void main()
{
    vec4 color = texture(myMap, vtexCoord);
    vec4 bg_color = vec4(0,0,0,1);

    fragColor = color * color.a + bg_color * (1.0 - color.a);
}