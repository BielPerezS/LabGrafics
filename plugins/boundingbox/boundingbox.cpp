#include "boundingbox.h"
#include "glwidget.h"


void Boundingbox::linkShaders()
{
	program = new QOpenGLShaderProgram(glwidget());
	
	vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
	vs->compileSourceFile("drawBoundingBox.vert");
	cout << "VS log:" << vs->log().toStdString() << endl;
	
	fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
	fs->compileSourceFile("drawBoundingBox.frag");
	cout << "FS log:" << fs->log().toStdString() << endl;
	
	program->addShader(vs);
	program->addShader(fs);
	program->link();
	
	cout << "Link log:" << program->log().toStdString() << endl;
}

void Boundingbox::drawBox(GLWidget &widget, const Box &box)
{
	const Point & translate = box.min();
	const Point & scale = box.max() - box.min();
	program->bind();
	QMatrix4x4 MVP = widget.camera()->projectionMatrix() * widget.camera()->viewMatrix();
	program->setUniformValue("modelViewProjectionMatrix", MVP);
	program->setUniformValue("translate", translate);
	program->setUniformValue("scale", scale);
	widget.glBindVertexArray(boxVAO);
	widget.glDrawArrays(GL_TRIANGLE_STRIP, 0, 14);
	widget.glBindVertexArray(0);
}

void Boundingbox::createBox(GLWidget &widget)
{
	widget.glGenVertexArrays(1, &boxVAO);
	widget.glBindVertexArray(boxVAO);
	float coordinates[] = {
		1, 1, 0,	 0, 1, 0,
		1, 0, 0,	 0, 0, 0,
		0, 0, 1,	 0, 1, 0,
		0, 1, 1,	 1, 1, 0,
		1, 1, 1,	 1, 0, 0,
		1, 0, 1,	 0, 0, 1,
		1, 1, 1,	 0, 1, 1
	};
	GLuint VBO_coordinates;
	widget.glGenBuffers(1, &VBO_coordinates);
	widget.glBindBuffer(GL_ARRAY_BUFFER, VBO_coordinates);
	widget.glBufferData(GL_ARRAY_BUFFER, sizeof(coordinates), coordinates, GL_STATIC_DRAW);
	widget.glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0);
	widget.glEnableVertexAttribArray(0);
	widget.glBindVertexArray(0);

}
void Boundingbox::onPluginLoad()
{
	GLWidget & widget = * glwidget();
	widget.makeCurrent();
	createBox(widget);
	linkShaders();
	for (Object & object : widget.scene()->objects())
		object.computeBoundingBox();
}

void Boundingbox::preFrame()
{
	
}

void Boundingbox::postFrame()
{
	GLWidget & widget = * glwidget();
	widget.makeCurrent();
	GLint polygonMode;
	widget.glGetIntegerv(GL_POLYGON_MODE, &polygonMode);
	widget.glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);
	for (Object & object : widget.scene()->objects())
		drawBox(widget, object.boundingBox());
	widget.glPolygonMode(GL_FRONT_AND_BACK, polygonMode);
}

void Boundingbox::onObjectAdd()
{
	
}

bool Boundingbox::drawScene()
{
	return false; // return true only if implemented
}

bool Boundingbox::drawObject(int)
{
	return false; // return true only if implemented
}

bool Boundingbox::paintGL()
{
	return false; // return true only if implemented
}

void Boundingbox::keyPressEvent(QKeyEvent *)
{
	
}

void Boundingbox::mouseMoveEvent(QMouseEvent *)
{
	
}

