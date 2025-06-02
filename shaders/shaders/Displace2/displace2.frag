#version 330 core

in vec3 fvertex;

uniform sampler2D heightMap;
uniform float smoothness = 25.0;
uniform float epsilon = 1.f/128.f;

uniform mat3 normalMatrix;

out vec4 FragColor;

void main()
{

    vec2 st1 = 0.49 * fvertex.xy + vec2(0.5f);
    vec2 st2 = st1 + vec2(epsilon, 0.0);
    vec2 st3 = st1 + vec2(0.0, epsilon);

    //vec2 st3 = (0.49 * vec2(fvertex.x, fvertex.y + epsilon)) + vec2(0.5f);

    float dx = texture(heightMap, st1).r - texture(heightMap, st2).r;
    float dy = texture(heightMap, st1).r - texture(heightMap, st3).r;
    
    vec2 G = vec2(dx/epsilon, dy/epsilon);
    vec3 fnormal = normalize(vec3(-G, smoothness));
    vec3 N = (normalMatrix * fnormal);
    FragColor = vec4(N.z);
}