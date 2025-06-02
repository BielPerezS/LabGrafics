#version 330 core

in vec4 frontColor;
out vec4 fragColor;

void main()
{
    // en el vertex posem en abs el color sino mal!
    gl_FragDepth = 1 - gl_FragCoord.z;
    //
    fragColor = frontColor;
}