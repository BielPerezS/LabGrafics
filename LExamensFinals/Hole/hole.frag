#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
uniform sampler2D colormap;
uniform int N = 5;
uniform float R = 0.2;
void main()
{
    fragColor = texture(colormap, vtexCoord);
    float s = vtexCoord.x;
    float t = vtexCoord.y;
    if (N == 1){
        if (distance(vec2(s, t), vec2(0.5, 0.5)) < R) {
            fragColor = texture(colormap, vtexCoord*2.5 + vec2(+0.25, +0.25));
        }
    }
    // Good enough
    if (N > 1){
        if (distance(vec2(s, t), vec2(0.5, 0.5)) < R) {
            fragColor = texture(colormap, vtexCoord*2.5 + vec2(+0.25, +0.25));
        }
        if (N >= 2){
        if (distance(vec2(s, t), vec2(0.5, 0.5)) < R/2.5) {
            fragColor = texture(colormap, vtexCoord*6 + vec2(-0.5, -0.5));
        }
        }
        if (N >= 3){
        if (distance(vec2(s, t), vec2(0.5, 0.5)) < R/6) {
            fragColor = texture(colormap, vtexCoord*12 + vec2(+0.5, -0.5));
        }
        }
        if (N >= 4){
        if (distance(vec2(s, t), vec2(0.5, 0.5)) < R/12) {
            fragColor = texture(colormap, vtexCoord*24 + vec2(-0.5, +0.5));
        }
        }
        if (N >= 5){
        if (distance(vec2(s, t), vec2(0.5, 0.5)) < R/24) {
            fragColor = texture(colormap, vtexCoord*48 + vec2(-0.5, +0.5));
        }
        }
    }
}
