#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 fraccCoord;


in vec3 inN;
in vec3 inV;
in vec3 inP;

uniform sampler2D colorMap;

uniform float time;

vec4 matDiffuse;
vec4 lightDiffuse;

uniform vec4 lightSpecular;

uniform vec4 matSpecular;

uniform float matShininess;
uniform vec4 lightPosition;



vec4 OldSchoolPhong(vec3 N,vec3 V, vec3 L,vec4 matSpecular,vec4 lightDiffuse){
    N = normalize(N);
    V = normalize(V);
    L = normalize(L);

    
    //Diffuse
    float NdotL = max(0.0,dot(N,L));   //xq si es negatiu aleshores val 0
    vec4 Diffuse = matDiffuse*lightDiffuse*NdotL;

    //Specular 
    vec3 R = 2*NdotL*N - L;
    float RdotV = max(0.0,dot(R,V));
    vec4 Specular;
    if (NdotL > 0)
    Specular = matSpecular*lightSpecular*pow(RdotV,matShininess);
    else 
    Specular = vec4(0.0,0.0,0.0,1.0);

    return Diffuse + Specular;
}

void main()
{
    if (int(time)%2 == 0)
        lightDiffuse = mix(vec4(0), vec4(0.8), fract(time));
    else
        lightDiffuse = mix(vec4(0.8), vec4(0.0), fract(time));

    
    int selectorTextX = (int(time/6))%12;
    int selectorTextY = (int(time/2))%3;
    
    vec2 texCoord = fraccCoord;
    texCoord.x = (texCoord.x/4.f -3/4.f + selectorTextX/4.f);
    texCoord.y = (texCoord.y/3.f - selectorTextY/3.f);
    matDiffuse = texture(colorMap,texCoord);


    //COPIADO DE Lighting4 todo lo de la luz

    vec3 L = normalize(lightPosition.xyz - inP);
    fragColor = OldSchoolPhong(inN,inV,L,matDiffuse,lightDiffuse);
}


