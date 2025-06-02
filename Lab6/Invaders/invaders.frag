#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
uniform sampler2D colorMap;

void main() {
    //Deixem texC en de forma que representi la cuadricula (amb size) que volem
    vec2 texC = vtexCoord * 4;

    //Aqui calculem la cuadricula (com ho tenim en 4x4 texutres)
    //Rang es [0-4] i volem [0-15] => mutiplicar x 4 i fer modul 16

    int X = int(texC.s*4) % (16);
    int Y = int(texC.t*4) % (16);
    float s,t;

    //FORMULA :  estem  (selector)     (estabilizador)
    //          texC.s + i * 1 / 4.f - X*1/4.f;

    if (Y == 13){
        s = texC.s + 0 * 1 / 4.f - X*1/4.f;
        t = texC.t + 1 * 1 / 4.f - Y*1/4.f;
        fragColor = texture(colorMap,vec2(s,t));
    }
    else 
        fragColor = texture(colorMap,texC);
}
