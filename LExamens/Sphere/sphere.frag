#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;


uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;

uniform vec4 lightPosition;



uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;
uniform int mode = 2;




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

    float s = vtexCoord.s;
    float t = vtexCoord.t;
    if (mode >= 0){
        float dist = distance(vtexCoord,vec2(0.0,0.0));
        if (dist <= 1){
            fragColor = vec4(0);
            if (mode >= 1){
                vec3 P = vec3(s,t,pow(1-s*s-t*t,1/2.f));
                vec3 N = P;
                fragColor = vec4(N.z);
                if (mode == 2){
                    vec3 Neye = normalize(normalMatrix*N);
                    vec3 Peye = (modelViewMatrix * vec4(P, 1)).xyz;
                    vec3 V = -Peye;
                    vec3 L = normalize(lightPosition.xyz - Peye);
                    fragColor = OldSchoolPhong(Neye,V,L);
                }
            }
        
        }
        else 
            discard;
    }

}
