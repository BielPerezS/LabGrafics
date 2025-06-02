#version 330 core

in vec4 frontColor;
out vec4 fragColor;
uniform sampler2D heightMap;

in vec2 vtexCoord;
uniform float smoothness = 25.0;
uniform mat4 modelViewMatrix;


void main()
{
    //Calcul del gradient


    //variacio de X
    float epsilon = 1.0/128.0f;

    //Forward derivate necesitem el Right i Up per X i Y
    vec2 Right  =    vec2(vtexCoord.x + epsilon ,    vtexCoord.y);
    vec2 Up     =    vec2(vtexCoord.x   ,   vtexCoord.y + epsilon);
    
    // f() == a fer texture().(component que volem) 
    //Els dos primers son f(x+epsilon)

    float fxRight   = texture(heightMap , Right ).r;
    float fyUp      = texture(heightMap , Up    ).r;
    // f(x)
    float fCurrent  = texture(heightMap , vtexCoord).r;

    //derivades

    float dx = (fxRight-fCurrent)/epsilon;
    float dy = (fyUp-fCurrent)/epsilon;

    //Gradient
    vec2 Gradient = vec2(   (dx)  ,   (dy)  );

    vec3 N = normalize(vec3(-Gradient.x,-Gradient.y,smoothness));
    //Per pasar a EyeSpace important posar  0
    vec4 NeyeSpace = modelViewMatrix*vec4(N,0);

    //si volem mode blanc i negre
        fragColor = vec4(NeyeSpace.z);
    //si volem amb els colors originals de la textura
        fragColor = vec4(NeyeSpace.z)*texture(heightMap,vtexCoord);

}
