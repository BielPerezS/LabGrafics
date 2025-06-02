#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 inN;
in vec3 inV;
in vec3 inP;


uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;


uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;

uniform vec4 lightPosition;



vec4 OldSchoolPhong(vec3 N,vec3 V, vec3 L){
    N = normalize(N);
    V = normalize(V);
    L = normalize(L);

    //Ambient
    vec4 Ambient = matAmbient*lightAmbient;
    
    //Diffuse
    float NdotL = max(0.0,dot(N,L));   //xq si es negatiu aleshores val 0
    vec4 Diffuse = matDiffuse*lightDiffuse*NdotL;

    //Specular 
    vec3 R = 2*NdotL*N - L;
    float RdotV = max(0.0,dot(R,V));
    vec4 Specular;
    if (NdotL >= 0)
    Specular = matSpecular*lightSpecular*pow(RdotV,matShininess);
    else 
    Specular = vec4(0.0,0.0,0.0,1.0);

    return Ambient + Diffuse + Specular;
}

void main()
{
    vec3 L = normalize(lightPosition.xyz - inP);
    fragColor = OldSchoolPhong(inN,inV,L);
}
