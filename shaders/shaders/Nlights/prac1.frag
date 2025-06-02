#version 330 core

in vec3 fvertex;
in vec3 fnormal;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

out vec4 FragColor;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform vec4 lightPosition; // (sempre estarà en eye space)
uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

uniform int n = 1;

const float pi = 3.141592;

vec3 Ambient() {
  return lightAmbient.xyz * matAmbient.xyz;
}

vec3 Difus (vec3 NormSCO, vec3 L, vec3 colFocus)
{
  vec3 colRes = vec3(0);
  if (dot (L, NormSCO) > 0)
    colRes = colFocus * matDiffuse.xyz * dot (L, NormSCO);
  return (colRes);
}

vec3 Especular (vec3 NormSCO, vec3 L, vec3 vertSCO, vec3 colFocus)
{
  vec3 colRes = vec3 (0);
  if ((dot(NormSCO,L) < 0) || (matShininess == 0))
    return colRes;  // no hi ha component especular
  vec3 R = reflect(-L, NormSCO); // equival a: 2.0*dot(NormSCO,L)*NormSCO - L;
  vec3 V = normalize(-vertSCO); // perquè la càmera està a (0,0,0) en SCO

  if (dot(R, V) < 0)
    return colRes;  // no hi ha component especular
  return colFocus * matSpecular.xyz * pow(max(0.0, dot(R, V)), matShininess);
}

void main()
{
    vec3 N = normalize(normalMatrix * fnormal);
    vec4 vertSCO = viewMatrix * vec4(fvertex, 1.0);
    vec3 fcolor = Ambient();
    float w = 2 * pi / n;
    for (int i = 0; i < n; ++i) {
        vec3 L = normalize((lightPosition.xyz) - vertSCO.xyz);
        mat3 A = mat3(cos(w*i), 0.0, sin(w*i),
              0.0,  1.0, 0.0,
              -sin(w*i), 0.0, -cos(w*i));
        L = A * L;
        fcolor += Difus(N, L, lightDiffuse.xyz) / sqrt(n)
          + Especular(N, L, vertSCO.xyz, lightSpecular.xyz);
    }
      
    frontColor = vec4(fcolor.xyz, 1.0);
}