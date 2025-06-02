#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;
uniform sampler2D colormap;



void main()
{
    // 6 es la anchura
    // 1 la amplada

    //Quadricula
    float n = 15;
    //Lo pasamos a mida Cuadricula
    vec2 normalizedCoord = vec2(vtexCoord.x * n / 6, vtexCoord.y * n);
    vec2 GridCoord = normalizedCoord;

    // ESTO ES LO IMPORTANTE (lo demas es pico pala)    --------------------------------------------------------
    
    //Calculo Para Seleccionar figura
    int indice = int(normalizedCoord.x*6)%6;
    float Ghost = (normalizedCoord.x) -indice*1/6.f;
    float Pacman = (normalizedCoord.x + 1/6.f) -indice*1/6.f;
    float Nothing = (normalizedCoord.x + 2/6.f) -indice*1/6.f;
    float Wall = (normalizedCoord.x + 3/6.f) -indice*1/6.f;
    float Curve = (normalizedCoord.x + 4/6.f) -indice*1/6.f;
    float Point = (normalizedCoord.x + 5/6.f) -indice*1/6.f;

    //Calculo Para Seleccionar figura Girada 90grados
    vec2 texCoordVertical = vec2(GridCoord.y/6,GridCoord.x*6);
    float inverseIndice = int(texCoordVertical.x*6)%6;
    float IGhost = (texCoordVertical.x) -inverseIndice*1/6.f;
    float IPacman = (texCoordVertical.x + 1/6.f) -inverseIndice*1/6.f;
    float INothing = (texCoordVertical.x + 2/6.f) -inverseIndice*1/6.f;
    float IWall = (texCoordVertical.x + 3/6.f) -inverseIndice*1/6.f;
    float ICurve = (texCoordVertical.x + 4/6.f) -inverseIndice*1/6.f;
    float IPoint = (texCoordVertical.x + 5/6.f) -inverseIndice*1/6.f;

    //Para refernciar X de 0-14 de en particiones de 6
    int X = int(GridCoord.x * 6);
    int Y = int(GridCoord.y);

    //INVERSION EJE Y = Pasar a Negativo y ajustar (Ver línea 60 i 93 Ejemplos)  (que si mira pa la izquierda ahora mire pa la derecha)
    //      InversionEjeY (<-) = ->        


    //INVERSION EJE X = Pasar a Negativo eje Y's

    // AQUI ACABA LO IMPORTANTE -------------------------------------------------------------------------------


    //Para determinar que sprite pintamos
    vec2 Selected;
    
    //Lados
    if (X == 0 && Y == 14){
        Selected = vec2(ICurve,-texCoordVertical.y);
    }
    else if (X == 0 && Y == 0){
        //OJO INVERSION EJE Y : Pasar a Negativo y ajustar
        // Curve este en la posicion [4/6], al hacer -Curve estamos en Pacman [1/6] (ns porque si xd (comprovar djeando -Curve y ya))
        // entonces hemos de sumar-le [3/6] para llegar a [4/6] en el dominio de las invertidas EJE Y
        Selected = vec2(3/6.f - Curve, -GridCoord.y);

    }
     else if (X == 14 && Y == 0){
        Selected = vec2(Curve,-GridCoord.y);
    }
    else if (X == 14 && Y == 14){
        Selected = vec2(Curve,GridCoord.y);
    }

    //Paredes Horizontales Lados
    else if (Y > 13 || Y < 1)  {
        // Mismo desplazamiento para bordes verticales
        Selected = vec2(Wall, GridCoord.y);
    }
    //Paredes Verticales Lados
    else if (X > 13 || X < 1) {
        // Aplicamos una rotación de 90 grados
        Selected = vec2(IWall, texCoordVertical.y);
    }

    //Paredes escenario Veritcales
    else if(X%2 == 0 && Y != 7 && Y != 1 && Y != 13){
        Selected = vec2(IWall, texCoordVertical.y);
    }

    //Pintar Usuarios
    else if (Y == 1){
        if (X == 4)
            //Aqui nos deja -Pacman nos deja en [4/6] en mundo inverso, asi que si le restamos 3/6 llegaremos a [1/6] del pacman en el mundo inverso
            Selected = vec2(-3/6.f-Pacman,GridCoord.y);
        else if (X == 5 ||X == 1)
            Selected = vec2(Ghost,GridCoord.y);
        else 
            Selected = vec2(Point,GridCoord.y);
    }
    //Lo demas son bolas
    else 
        Selected = vec2(Point,GridCoord.y);

    fragColor = texture(colormap, Selected);
}
