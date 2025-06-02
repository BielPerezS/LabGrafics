#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;


uniform vec4 lightPosition;
uniform sampler2D colorMap, depthMap1, normalMap2;
uniform float R = 2;
uniform float time;
uniform float AO = 1.5;

uniform mat3 modelViewMatrix;

uniform int mode = 3;

void main()
{
    float f1;
    float f2;
    vec4 Color;
    if (mode >= 0){
        Color = texture(colorMap,vtexCoord);
        vec4 ColorDepth = texture(depthMap1,vtexCoord);
        float d = ColorDepth.x;    
        f1 = (1-d)*AO;
        if (mode == 1){
            Color = Color*f1;
        }

        vec3 N = texture(normalMap2,vtexCoord).xyz;
        N = (N-0.5f)*2;
        N = normalize(N);
        vec3 Lposition = vec3(sin(time),0,1);
        vec3 L = normalize(Lposition - vec3(vtexCoord,1));
        f2 = max(0.0,dot(N,L));
        if (mode == 2){
            Color = Color*f2;
        }
        
        if (mode == 3)
        {
            Color = Color*f1*f2;
        }
    }
    fragColor = Color;
}
