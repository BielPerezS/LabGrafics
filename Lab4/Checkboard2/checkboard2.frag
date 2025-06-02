#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform float n = 8;

void main()
{
    const vec4 Black = vec4(0.0, 0.0, 0.0, 1.0);
    const vec4 Gray = vec4(0.8, 0.8, 0.8, 1.0);

    //Multiplicamos por 8 para tener donde caeria en el tablero
    int x = int(vtexCoord.x * n);
    int y = int(vtexCoord.y * n);       //recordemos que vtexCoord va de 0 a 1

    bool isXEven = (x % 2 == 0);
    bool isYEven = (y % 2 == 0);

    //En tablero de ajedrez si x & y tiene la misma paridad es blanco else negro
    if (isXEven == isYEven)
        fragColor = Gray;
    else
        fragColor = Black;
}
