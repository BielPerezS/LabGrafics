#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 P;
uniform int mode = 3;
uniform sampler2D courtMap;
uniform sampler2D player1;


uniform vec2 p1 = vec2(-3,-8);
uniform vec2 p2 = vec2( 3,-8);
uniform vec2 p3 = vec2(-2, 2);
uniform vec2 p4 = vec2( 2, 2);

//Si X Y esta dins del cuadrat de costat 2
bool is_in_permieter(float X, float Y, float centreX, float centreY){

    return (    X < (centreX + 1) && X > (centreX - 1) && 
                Y < (centreY + 1) && Y > (centreY - 1)  );

}

void main()
{
    //Recordem
    //P.x [-5,5]
    //P.y [-10,10]

    

    //pasem a  [0,1]
    float s = (P.x/5.f + 1)/2.f;
    float t = (P.y/10.f + 1)/2.f;
    vec2 UsabelCoords = vec2 (s,t);
    
    fragColor = texture(courtMap,UsabelCoords);

    if (mode >= 1){
        //Court distance (RIP KURT)


        float X = (s)*10.f; // a [0,10]
        float Y = (t)*20.f; // a [0,20]

        // Ejemple X = 2.02 => floor(X) = 2 // int(X) hace lo mismo bruh
        // X - floor(X) = 2.02-2 = 0.02 (tal com ens demanaba l'enunciat :D)
        if ((X - int(X)) < 0.05 || (Y - floor(Y)) < 0.05)
            fragColor = vec4(vec3(fragColor.xyz)*1.2f,fragColor.z);

        //L'enunciat les dona en rang [-5,5] [-10,10], erm estic treballant en [0,10] [0,20] per comoditat aixi que les tradueixo
        //Traduim textures c kurt space [0,10] [0,20]
        vec2 NewP1 = vec2((p1.x+5)  ,  (p1.y+10));
        vec2 NewP2 = vec2((p2.x+5)  ,  (p2.y+10));
        vec2 NewP3 = vec2((p3.x+5)  ,  (p3.y+10));
        vec2 NewP4 = vec2((p4.x+5)  ,  (p4.y+10));

        if (mode == 2){
            
            float DP1 = distance(NewP1,vec2(X,Y));
            float DP2 = distance(NewP2,vec2(X,Y));
            float DP3 = distance(NewP3,vec2(X,Y));
            float DP4 = distance(NewP4,vec2(X,Y));
            

            if (DP1 <= 0.4f)
                fragColor = vec4(1);
            else if (DP1 > 0.4 && DP1 <= 0.5)
                fragColor = vec4(0);
            
            if (DP2 <= 0.4f)
                fragColor = vec4(1);
            else if (DP2 > 0.4 && DP2 <= 0.5)
                fragColor = vec4(0);
            
            if (DP3 <= 0.4f)
                fragColor = vec4(1);
            else if (DP3 > 0.4 && DP3 <= 0.5)
                fragColor = vec4(0);

            if (DP4 <= 0.4f)
                fragColor = vec4(1);
            else if (DP4 > 0.4 && DP4 <= 0.5)
                fragColor = vec4(0);

        }

        else if (mode == 3){

            if (is_in_permieter(X,Y,NewP1.x,NewP1.y)){
                // Si fas l'exemple ho veus
                // pasar a [0,1] //NewP1.x-1 es el minim del rectangle
                float newS = (X - NewP1.x-1)/2.f;
                float newT = (Y - NewP1.y-1)/2.f;
                vec4 PreColor;
                PreColor = texture(player1,vec2(newS,newT));
                if (PreColor.r > 0.5 || PreColor.b < 0.5)
                    fragColor = PreColor;
            }

            if (is_in_permieter(X,Y,NewP2.x,NewP2.y)){
                float newS = (X - NewP2.x-1)/2.f;
                float newT = (Y - NewP2.y-1)/2.f;
                vec4 PreColor;
                PreColor = texture(player1,vec2(newS,newT));
                if (PreColor.r > 0.5 || PreColor.b < 0.5)
                    fragColor = PreColor;
            }

            if (is_in_permieter(X,Y,NewP3.x,NewP3.y)){
                float newS = (X - NewP3.x-1)/2.f;
                float newT = (Y - NewP3.y-1)/2.f;
                vec4 PreColor;
                PreColor = texture(player1,vec2(newS,-newT));
                if (PreColor.r > 0.5 || PreColor.b < 0.5)
                    fragColor = PreColor;
            }

            if (is_in_permieter(X,Y,NewP4.x,NewP4.y)){
                float newS = (X - NewP4.x-1)/2.f;
                float newT = (Y - NewP4.y-1)/2.f;
                vec4 PreColor;
                PreColor = texture(player1,vec2(newS,-newT));
                if (PreColor.r > 0.5 || PreColor.b < 0.5)
                    fragColor = PreColor;
            }
        }
    }
}
