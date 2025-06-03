#version 330 core

layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec2 vtexCoord[];
in vec4 vfrontColor[];
out vec4 gfrontColor;
out vec2 gtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform float time;
vec3 centres[8] = vec3[](vec3(-1, -1, -1), vec3(+1, -1, -1), vec3(-1, +1, -1),
						vec3(+1, +1, -1), vec3(-1, -1, +1), vec3(+1, -1, +1),
						vec3(-1, +1, +1), vec3(+1, +1, +1));

void makeface(vec3 a, vec3 b, vec3 c, vec3 d, bool rotate, vec4 color, vec2 ta, vec2 tb, vec2 tc, vec2 td) 
{
	mat4 rotaZ;
	if (rotate) {
		float angle = time;  // Adjust rotation speed as needed
		rotaZ = mat4(	cos(angle), -sin(angle), 0.0, 0.0,
						sin(angle), cos(angle), 0.0, 0.0,
						0.0, 		0.0, 		1.0, 0.0,
						0.0, 		0.0, 		0.0, 1.0);
		} 
	else {
		rotaZ = mat4(1.0);
	}

	gfrontColor = color;
	gtexCoord = vec2(0,0);
	gl_Position = modelViewProjectionMatrix * rotaZ * vec4(a, 1);
	EmitVertex();
	gtexCoord = vec2(0,1);
	gl_Position = modelViewProjectionMatrix * rotaZ * vec4(b, 1);
	EmitVertex();
	gtexCoord = vec2(1,0);
	gl_Position = modelViewProjectionMatrix * rotaZ * vec4(c, 1);
	EmitVertex();
	gtexCoord = vec2(1,1);
	gl_Position = modelViewProjectionMatrix * rotaZ * vec4(d, 1);
	EmitVertex();
	EndPrimitive();
}

void main(void) {
	if (gl_PrimitiveIDIn < 8) {
	float R = 1.0;
	vec3 center = centres[gl_PrimitiveIDIn];

	vec3 v0 = center + vec3(R, R, R);
	vec3 v1 = center + vec3(-R, R, R);
	vec3 v2 = center + vec3(R, -R, R);
	vec3 v3 = center + vec3(-R, -R, R);
	vec3 v4 = center + vec3(R, R, -R);
	vec3 v5 = center + vec3(R, -R, -R);
	vec3 v6 = center + vec3(-R, R, -R);
	vec3 v7 = center + vec3(-R, -R, -R);

	vec4 orange = 	vec4(1.0, 0.6, 0.0, 1.0);
	vec4 green = 	vec4(0.0, 1.0, 0.0, 1.0);
	vec4 white = 	vec4(1.0, 1.0, 1.0, 1.0);
	vec4 red = 		vec4(1.0, 0.0, 0.0, 1.0);
	vec4 blue = 	vec4(0.0, 0.0, 1.0, 1.0);
	vec4 yellow = 	vec4(1.0, 1.0, 0.0, 1.0);

	if (gl_PrimitiveIDIn < 4) {
		makeface(v0, v1, v2, v3, false, yellow,	vec2(1, 1),	vec2(0, 1),	vec2(1, 0),	vec2(0, 0));  // front
		makeface(v4, v5, v6, v7, false, white,	vec2(1, 1),	vec2(1, 0),	vec2(0, 1),	vec2(0, 0));  // back
		makeface(v1, v6, v3, v7, false, green,	vec2(1, 1),	vec2(1, 0),	vec2(0, 1),	vec2(0, 0));  // left
		makeface(v0, v2, v4, v5, false, blue,	vec2(1, 1),	vec2(1, 0),	vec2(0, 1),	vec2(0, 0));  // right
		makeface(v3, v7, v2, v5, false, orange,	vec2(1, 1),	vec2(1, 0),	vec2(0, 1),	vec2(0, 0));  // bottom
		makeface(v1, v0, v6, v4, false, red,	vec2(1, 1),	vec2(1, 0),	vec2(0, 1),	vec2(0, 0));  // top
	} 
	else {
		makeface(v0, v1, v2, v3, true, yellow, 	vec2(1, 1), 	vec2(0, 1), 	vec2(1, 0), 	vec2(0, 0));  // front
		makeface(v4, v5, v6, v7, true, white, 	vec2(1, 1), 	vec2(1, 0), 	vec2(0, 1), 	vec2(0, 0));  // back
		makeface(v1, v6, v3, v7, true, green, 	vec2(1, 1), 	vec2(1, 0), 	vec2(0, 1), 	vec2(0, 0));  // left
		makeface(v0, v2, v4, v5, true, blue, 	vec2(1, 1), 	vec2(1, 0), 	vec2(0, 1), 	vec2(0, 0));  // right
		makeface(v3, v7, v2, v5, true, orange, 	vec2(1, 1), 	vec2(1, 0), 	vec2(0, 1), 	vec2(0, 0));  // bottom
		makeface(v1, v0, v6, v4, true, red, 	vec2(1, 1), 	vec2(1, 0), 	vec2(0, 1), 	vec2(0, 0));  // top
		}
	}
}