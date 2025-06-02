#version 330 core

in vec4 frontColor;
out vec4 fragColor;
uniform float time;
in vec3 vertexNDC;

const vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);

void main()
{
    //Extra Default dura 2segons 
    //Modifica temps efecte de forma que 
    // TempsEfecte = Duracio*2 Segons
    float Duracio = 1;


    float x = vertexNDC.x;
    // x va de [-1, 1] => x va de [0, 2]
    float pos = x+1;
    //Per tant si ho posem menor al time just es 2segons
    if (pos*Duracio <= time)
    {
        fragColor = frontColor;
    }
    else 
    {
        fragColor = blue;
    }
}
