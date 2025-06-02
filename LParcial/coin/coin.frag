#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 inN;
in vec3 inV;
in vec3 inP;


uniform vec4 lightPosition;



const vec3 golden = vec3(1.0, 0.84, 0.0);
float shininess = 5.0;

in vec2 vtexCoord;



vec4 OldSchoolPhong(vec3 N,vec3 V, vec3 L){
    N = normalize(N);
    V = normalize(V);
    L = normalize(L);

    //Ambient
    vec4 Ambient = vec4(0.2,0.2,0.2,0.2);
    
    //Diffuse
    float NdotL = max(0.0,dot(N,L));   //xq si es negatiu aleshores val 0
    vec4 Diffuse = vec4(golden,0.0)*vec4(0.7,0.7,0.7,0.7)*NdotL;

    //Specular 
    vec3 R = 2*NdotL*N - L;
    float RdotV = max(0.0,dot(R,V));
    vec4 Specular;

    if (vtexCoord.s >= 0.5)
        shininess = shininess*0.5;
    if (NdotL >= 0)
    Specular = vec4(1)*vec4(1)*pow(RdotV,shininess);
    else 
    Specular = vec4(0.0,0.0,0.0,1.0);

    return Ambient + Diffuse + Specular;
}

void main()
{
    vec3 L = normalize(vec3(-1,-1,-1) - inP);
    fragColor = OldSchoolPhong(inN,inV,L);
}
