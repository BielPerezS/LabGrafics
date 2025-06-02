#include "skyplane.h"
#include "glwidget.h"

void Skyplane::onPluginLoad()
{
	// CARREGAR SHADERS
	GLWidget &g = *glwidget();
	g.makeCurrent();

	vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
	vs->compileSourceFile(glwidget()->getPluginPath()+"/../skyplane/sky.vert");

	fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
	fs->compileSourceFile(glwidget()->getPluginPath()+"/../skyplane/sky.frag");

	program = new QOpenGLShaderProgram(this);
	program->addShader(vs);
	program->addShader(fs);
	program->link();
	if (!program->isLinked()) cout << "Shader link error" << endl;
	
	//CARREGAR ALTRES SHADERS
	
	// Carregar shader, compile & link
	vs1 = new QOpenGLShader(QOpenGLShader::Vertex, this);
	vs1->compileSourceFile(glwidget()->getPluginPath()+"/../skyplane/mirror.vert");

	fs1 = new QOpenGLShader(QOpenGLShader::Fragment, this);
	fs1->compileSourceFile(glwidget()->getPluginPath()+"/../skyplane/mirror.frag");

	program1 = new QOpenGLShaderProgram(this);
	program1->addShader(vs1);
	program1->addShader(fs1);
	program1->link();
	if (!program1->isLinked()) cout << "Shader1 link error" << endl;

	//CARREGAR VAO / VBO
	
	float p1 = -1.f;
	float p2 =  1.f;
	float z  = 0.99999f; 
	createQuad( Point(p1, p1, z),
				Point(p1, p2, z),
				Point(p2, p1, z),
				Point(p2, p2, z) );
	
	//CARREGAR TEXTURA
	
	// Load Texture 1
	QImage img0(glwidget()->getPluginPath()+"/../../Textures/sky.jpg");
	QImage im0 = img0.convertToFormat(QImage::Format_ARGB32).rgbSwapped().mirrored();
	g.glActiveTexture(GL_TEXTURE0);
	g.glGenTextures( 1, &textureId0);
	g.glBindTexture(GL_TEXTURE_2D, textureId0);
	g.glTexImage2D( GL_TEXTURE_2D, 0, GL_RGB8, im0.width(), im0.height(), 0, GL_RGBA, GL_UNSIGNED_BYTE, im0.bits());
	// Generate mipmaps
	g.glGenerateMipmap(GL_TEXTURE_2D);

	// Use linear mipmap filtering
	g.glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
	g.glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

	// After setting min/mag filters:
	g.glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
	g.glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);

}

void Skyplane::createQuad(const Point& p0, const Point& p1, const Point& p2, const Point& p3)
{
	static bool created = false;
	GLWidget &g = *glwidget();
	g.makeCurrent();

	// 1. Create VBO Buffers
	if (!created)
	{
    	created = true;   	 

    	// Create & bind empty VAO
    	g.glGenVertexArrays(1, &VAO_rect);
    	g.glBindVertexArray(VAO_rect);

    	// Create VBO with (x,y,z) coordinates
    	float coords[] = { p0.x(), p0.y(), p0.z(), p1.x(), p1.y(), p1.z(), p2.x(), p2.y(), p2.z(), p3.x(), p3.y(), p3.z() };

    	GLuint VBO_coords;
    	g.glGenBuffers(1, &VBO_coords);
    	g.glBindBuffer(GL_ARRAY_BUFFER, VBO_coords);
    	g.glBufferData(GL_ARRAY_BUFFER, sizeof(coords), coords, GL_STATIC_DRAW);
    	g.glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0);
    	g.glEnableVertexAttribArray(0);
    	//glBindVertexArray(0);
   	 
    	GLuint indices[] = { 0, 1, 2, 3};

    	GLuint VBO_indices;
    	g.glGenBuffers(1, &VBO_indices);
    	g.glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, VBO_indices);
    	g.glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);

    	g.glBindVertexArray(0);
	}
}

void Skyplane::preFrame()
{

}

void Skyplane::postFrame()
{
	
}

void Skyplane::onObjectAdd()
{
	
}

bool Skyplane::drawScene()
{
	return false; // return true only if implemented
}

bool Skyplane::drawObject(int)
{
	return false; // return true only if implemented
}

bool Skyplane::paintGL()
{
    GLWidget &g = *glwidget();
    g.makeCurrent();
    g.glClear(GL_DEPTH_BUFFER_BIT | GL_COLOR_BUFFER_BIT);

    program->bind();
    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    
    // Scale the geometry
    /*QMatrix4x4 scaleMatrix;
    scaleMatrix.scale(0.5f); // Increase scale as needed
    MVP = scaleMatrix * MVP;*/

    QMatrix4x4 MV = camera()->viewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP);
    program->setUniformValue("modelViewMatrix", MV);
    program->setUniformValue("sampler0", 0);
	
	// bind textures
    g.glActiveTexture(GL_TEXTURE0);
    g.glBindTexture(GL_TEXTURE_2D, textureId0);
	
	//DIBUIXAR RECTANGLE
	g.glBindVertexArray(VAO_rect);
	g.glDrawElements(GL_TRIANGLE_STRIP, 4, GL_UNSIGNED_INT, (GLvoid*)0); //pintar amb indexos
	g.glBindVertexArray(0);
	
	//BIND SEGONS SHADERS
	
	program1->bind();
	MVP = camera()->projectionMatrix() * camera()->viewMatrix();
	MV = camera()->viewMatrix();
	program1->setUniformValue("modelViewProjectionMatrix", MVP);
	program1->setUniformValue("modelViewMatrix", MV);
	program1->setUniformValue("sampler0", 0);
	
	//DIBUIXAR ESCENA
	if (drawPlugin())
	drawPlugin()->drawScene();
	
	//DESACTIVAR SHADERS
	
	g.defaultProgram()->bind();
	 // unbind textures
    g.glActiveTexture(GL_TEXTURE0);
    g.glBindTexture(GL_TEXTURE_2D, 0);

	return true; // return true only if implemented
}

void Skyplane::keyPressEvent(QKeyEvent *)
{
	
}

void Skyplane::mouseMoveEvent(QMouseEvent *)
{
	
}

