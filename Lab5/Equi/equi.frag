#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 vertexObject;
const float PI = 3.141592;
uniform sampler2D panorama;


void main()
{
    float Phi = asin(vertexObject.y);
    float Theta = atan(vertexObject.x,vertexObject.z);

    float s = Theta/(2*PI);
    float t = Phi/PI + 0.5;
    
    fragColor = texture(panorama,vec2(s,t));
}
