#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;


uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;

uniform vec4 lightPosition;


vec4 OldSchoolPhong(vec3 N,vec3 V, vec3 L){
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
    vtexCoord = texCoord;
    
    //Calcul dels vectors normals i de la posicio del vertex
    vec3 N = normalize(normalMatrix*normal);
    vec3 P = (modelViewMatrix * vec4(vertex, 1)).xyz;
    vec3 V = -P;
    vec3 L = normalize(lightPosition.xyz - P);

    frontColor = OldSchoolPhong(N,V,L);
    gl_Position = modelViewProjectionMatrix *vec4(vertex, 1.0);
}
