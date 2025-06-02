#ifndef _MODELINFO1_H
#define _MODELINFO1_H

#include "plugin.h" 
#include <QPainter>

class ModelInfo1: public QObject, public Plugin
{
	Q_OBJECT
	Q_PLUGIN_METADATA(IID "Plugin") 
	Q_INTERFACES(Plugin)

  public:
	 void onPluginLoad();
	 void preFrame();
	 void postFrame();

	 void onObjectAdd();
	 void onSceneClear();
	 bool drawScene();
	 bool drawObject(int);

	 bool paintGL();

	 void keyPressEvent(QKeyEvent *);
	 void mouseMoveEvent(QMouseEvent *);
  private:
	// add private methods and attributes here

	void printOnViewer(const char*);

	int Nobjects;
	int Npoligons;
	int Nvertex;

    QPainter painter;

	int Ntriangles;
	double PercentatgeDePoligonsQueSonTriangles;
	char text [1000];
	char line [100];
};

#endif
