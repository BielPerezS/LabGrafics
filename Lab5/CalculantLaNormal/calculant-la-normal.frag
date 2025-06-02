#version 330 core

in vec4 frontColor;
out vec4 fragColor;

//Observador
in vec3 vertexEyeSpace;


//Necesitem vertex en vertexEyeSpace
//Fem les derivades parcials per a x i y
//producte vectorial (cross)
//normalitzem :D
//Hem obtingut la normal N  

void main()
{
    vec3 dx = dFdx(vertexEyeSpace);
    vec3 dy = dFdy(vertexEyeSpace);
    vec3 N = normalize(cross(dx,dy));
    fragColor = frontColor*N.z;
}
