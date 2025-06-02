#version 330 core

in vec4 frontColor;
out vec4 fragColor;
uniform int mode = 2; 

void main()
{
    fragColor = frontColor;
    float N = fragColor.r;
    if (mode >= 1) {
        if (mode == 2){
            int x = int(gl_FragCoord.x);
            int y = int(gl_FragCoord.y);
            
            if (x % 2 == 0 && y % 2 == 0) {
                N -= 0.5;
            }

            else if (x % 2 == 0 && y % 2 == 1) {
                N += 0.25;
            }

            else if (x % 2 == 1 && y % 2 == 1) {
                N -= 0.25;
            }
        }

        if (N < 0.5)
            fragColor = vec4(0.0);
        else
            fragColor = vec4(1.0);

    }
}
