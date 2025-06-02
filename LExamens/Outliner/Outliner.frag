#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 VertexRotat;
in vec3 NRotat;

uniform int mode = 3;

void main()
{
    float Z = NRotat.z;
    if (mode == 0)
        fragColor = vec4(Z);
    else if (mode == 1){
        vec4 Color;
        if (Z > 0.4)
            Color = vec4(1);
        else 
            Color = vec4(0);
        fragColor = vec4(Color.r,Color.g,Color.b*0.9,Color.a);
    }
    else if (mode == 2){
        vec3 V = normalize(VertexRotat);
        float VdotN = dot(V,NRotat);
        vec4 Color;
        if (VdotN > 0.4)
            Color = vec4(1);
        else
            Color = vec4(0);

        fragColor = vec4(Color.r*0.8,Color.g,Color.b,Color.a);
    }
    else {
        vec3 V = normalize(VertexRotat);
        float VdotN = dot(V,NRotat);
        vec4 Color;
        if (VdotN > 0.95)
            fragColor = vec4(1,1,1,1);
        else if (VdotN > 0.4)
            fragColor = vec4(1*0.8,1,1,1);
        else 
            fragColor = vec4(0);

        

    }

}
