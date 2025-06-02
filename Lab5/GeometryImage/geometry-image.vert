#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform sampler2D positionMap;
uniform sampler2D normalMap1;
uniform int mode = 3;


uniform mat4 modelViewMatrix;


uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;


uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;

uniform vec4 lightPosition;


vec4 OldSchoolPhong(vec3 N,vec3 V, vec3 L,vec3 P){
    P = normalize(P);
    N = normalize(N);
    V = normalize(V); //esta es la que 100% se ha de poner
    L = normalize(L); 
    
    //Ambient-----------------------------------------------------------------------------------------------------
    vec4 Ambient = matAmbient*lightAmbient;
    //------------------------------------------------------------------------------------------------------------
    
    //Diffuse-----------------------------------------------------------------------------------------------------
    float NdotL = max(0.0,dot(N,L));   //xq si es negatiu aleshores val 0
    vec4 Diffuse;
        //Setting de mode
            if (mode == 2)
                Diffuse = (matDiffuse)*lightDiffuse*NdotL;
            else 
                Diffuse = vec4(P,0)*lightDiffuse*NdotL;
    //------------------------------------------------------------------------------------------------------------


    //Specular ---------------------------------------------------------------------------------------------------
    vec3 R = 2*NdotL*N - L;
    float RdotV = max(0.0,dot(R,V));
    vec4 Specular;
    if (NdotL >= 0)
    Specular = matSpecular*lightSpecular*pow(RdotV,matShininess);
    else 
    Specular = vec4(0.0,0.0,0.0,1.0);
    //-------------------------------------------------------------------------------------------------------------


    //SumaFinal----------------------------------------------------------------------------------------------------
    return Ambient + Diffuse + Specular;
}

void main()
{

    //Formula per cambiar de rang es [a,b]
        //1.Pasarles a [0,1]
        //2. st = a + st*(b-a)

    vec2 st;
    //Pasar coordenades a rang [0.004,0.996]-----------------------------------------------------------------------
        //[-1,1]
        st = vertex.xy;
        //[0,1]
        st = (st+1)/2;
        //[0.004,0.996]  
        st = 0.004 + st*(0.996-0.004);
    //-------------------------------------------------------------------------------------------------------------


    // Valors(r,g,b) de la primera textura son el nou vertex P-----------------------------------------------------
    vec3 P = texture(positionMap,st).rgb;
    //-------------------------------------------------------------------------------------------------------------


    // Valors (r,g,b) de la segona textura son N-------------------------------------------------------------------
    vec3 N_0a1 = texture(normalMap1,st).rgb;
    //Pasar de [0,1]------->[-1,1]
    vec3 Ndef = -1 + 2*N_0a1;
    //Pasar a EyeSpace
    vec3 N = normalize(normalMatrix * Ndef);
    //-------------------------------------------------------------------------------------------------------------

    //Valorar Mode
    if (mode == 0)
        frontColor =vec4(P,1);
    
    if (mode == 1)
        frontColor =vec4(P,1)*vec4(N.z);

    if (mode == 2 || mode == 3)
    {
        vec3 auxP = (modelViewMatrix*vec4(P,1)).xyz; // Seria P per del lighting2.vert
        vec3 V = -auxP;
        vec3 L = normalize(lightPosition.xyz-auxP);
        frontColor = OldSchoolPhong(N,V,L,P);
    }

    // P es el nou vertex
    gl_Position = modelViewProjectionMatrix *vec4(P,1);
}
