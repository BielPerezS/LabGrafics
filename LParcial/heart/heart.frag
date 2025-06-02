#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform int mode = 3;
uniform float time;

float aastep(float threshold, float x)
{
float width = 0.7*length(vec2(dFdx(x), dFdy(x)));
return smoothstep(threshold-width, threshold+width, x);
}

void main()
{
    fragColor = vec4(1);
    vec2 st = vtexCoord;

    if (mode > 2){
                st.s += (0.5 + abs(sin(time*2))*0.2) - 0.6;   
    }    

    if (mode >= 0){
        float dist1 = distance(st,vec2(0.35,0.6));
        float dist2 = distance(st,vec2(0.65,0.6));

        float dist3 = distance(st,vec2(0.5,0.13));
        if (dist1 < 0.225f || dist2 < 0.225f){
            fragColor = vec4(1,0,0,0);
        }

        vec2 dir = (vec2(0.25,0.25));
        vec2 actualdir =    (st);
        float dot = dot(dir,actualdir);
        float angle = acos(dot * length(dir)*length(actualdir));
        
        
        if (!(st.x*1.75 > st.y + 1) && st.x > 0.37 && st.y < 0.5)
            fragColor = vec4(1,0,0,0);
        if ((st.x < 0.5) && st.y < 0.5 && (st.x > st.y))
            fragColor = vec4(1,0,0,0);
        

     


        if (mode > 0){

            if (mode > 1){
                if ((dist1 < 0.225f || dist2 < 0.225f)){
                float d = max(1.1-dist2/0.75,0);
                fragColor = fragColor*d;
                }
                

                if (mode >= 2){
                float c = smoothstep(0.005,0.007,dist2);
                if (dist2 < 0.02){
                    fragColor = vec4(1);
                }
                else if (dist2 < 0.2)
                    fragColor = mix(vec4(1),fragColor,c);

                }
       
            }

        }
    }
 
}
