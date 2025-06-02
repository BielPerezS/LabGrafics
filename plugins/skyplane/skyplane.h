#ifndef _SKYPLANE_H
#define _SKYPLANE_H

#include "plugin.h" 

class Skyplane: public QObject, public Plugin
{
	Q_OBJECT
	Q_PLUGIN_METADATA(IID "Plugin") 
	Q_INTERFACES(Plugin)

  public:
	 void onPluginLoad();
	 void preFrame();
	 void postFrame();

	 void onObjectAdd();
	 bool drawScene();
	 bool drawObject(int);

	 bool paintGL();

	 void keyPressEvent(QKeyEvent *);
	 void mouseMoveEvent(QMouseEvent *);
  private:
	// add private methods and attributes here
	QOpenGLShaderProgram* program;
	QOpenGLShader* vs;
	QOpenGLShader* fs; 
	QOpenGLShaderProgram* program1;
	QOpenGLShader* vs1;
	QOpenGLShader* fs1; 
	
	GLuint VAO_rect;
	void createQuad(const Point& p0, const Point& p1, const Point& p2, const Point& p3);
	
	GLuint textureId0;

};

#endif
