#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform sampler2D jungla;
uniform vec2 viewport;

in vec2 vtexCoord;
in vec3 vertexModel;
uniform vec2 mousePosition;
uniform float magnific = 3;

vec4 blurImage( in vec2 coords )
{
    float Pi = 6.28318530718; // Pi*2
    float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
    float Quality = 8.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
    float Size = 10.0; // BLUR SIZE (Radius)
   
    vec2 Radius = Size/viewport;

    vec4 Color = texture(jungla, coords);
    for( float d=0.0; d<Pi; d+=Pi/Directions)
    {
        float cd = cos(d);
        float sd = sin(d);
		for(float i=1.0/Quality; i<=1.0; i+=1.0/Quality)
        {
			Color += texture(jungla, coords+vec2(cd,sd)*Radius*i);		
        }
    }
    
    // Output to screen
    Color /= Quality * Directions - 15.0;
    return  Color;
}


/*
        vec2 mouse = mousePosition/viewport;

        vec2 dir = mouse - vtexCoord;
        float distToMouse = distance(vtexCoord,mouse);
        float distP = distToMouse/magnific;

        vec2 final = vtexCoord + normalize(dir)*distP;
*/

vec4 Black = vec4(0);
void main()
{   

    //Hola soy un psicopata y lo he hecho todo en coordenadas de pixel :D

    //coordenades de textVertex a pixel
    vec2 pixelVertex = vtexCoord*viewport;
    //centro de los ciruclos a 80 pixeles de distancia del raton
    float d1  = distance(vec2(pixelVertex.x+80,pixelVertex.y),mousePosition);
    float d2  = distance(vec2(pixelVertex.x-80,pixelVertex.y),mousePosition);
    
    //si estmos dentro del circulo
    if (d1 < 100 || d2 < 100){

        //Linea de direccion entre el pixel que valoramos i el raton para "aislar" P de dist(P,ratoli)
        vec2 dir = mousePosition - pixelVertex;
        //enunciado
        float distFMouse = distance(mousePosition,pixelVertex);
        float distP = distFMouse/magnific;
        vec2 P = normalize(dir)*distP;
        vec2 final = (pixelVertex + P)/viewport;

        fragColor = texture(jungla,final);
    }
    else if (d1 > 100 && d1 < 105)
        fragColor = Black;
    else if (d2 > 100 && d2 < 105)
        fragColor = Black;
    else 
        fragColor = blurImage(vtexCoord);
}
