#include "ModelInfo1.h"
#include "glwidget.h"
#include <stdio.h>
#include <cstring>
#include <string.h>

void ModelInfo1::onPluginLoad()
{
	Nobjects = 0;
	Npoligons = 0;
	Nvertex = 0;
	Ntriangles = 0;
}

void ModelInfo1::onSceneClear()
{
	Nobjects = 0;
	Npoligons = 0;
	Nvertex = 0;
	Ntriangles = 0;
}

void ModelInfo1::preFrame()
{
	
}

void ModelInfo1::printOnViewer(const char* str)
{
	QString out;
	QFont font;
	font.setPixelSize(15);
	painter.begin(glwidget());
	painter.setFont(font);
	int x = 15;

	int newLinePos = 0;
	int lineCounter = 1;

	for (int i = 0; str[i] != '\0'; ++i) {
		line[i-newLinePos] = str[i];
		if (str[i] == '\n') {
			++lineCounter;
			newLinePos = i;
			out = (QString) line;
			painter.drawText(x, 20*lineCounter, QString(out));  
			memset(line, ' ', 100);
		}
	}
	
	painter.end();
}

void ModelInfo1::postFrame()
{
	sprintf(text,
	"==========================================\n"
	"Num objects: %d \n"  
	"Num poligons: %d \n"
	"Num vertex: %d\n"
	"Percentatge de polígons que\nson triangles: %f% \n",
	Nobjects,
	Npoligons,
	Nvertex,
	(Ntriangles / (double) Npoligons) * 100);
	printOnViewer(text);
}

void ModelInfo1::onObjectAdd()
{
	++Nobjects;
	const Object& current = scene() -> objects()[Nobjects - 1];
	Npoligons += current.faces().size();
	for (auto face : current.faces()) {
		if(face.numVertices() == 3) ++Ntriangles;
		Nvertex += face.numVertices();
	}
}

bool ModelInfo1::drawScene()
{
	return false; // return true only if implemented
}

bool ModelInfo1::drawObject(int)
{
	return false; // return true only if implemented
}

bool ModelInfo1::paintGL()
{
	return false; // return true only if implemented
}

void ModelInfo1::keyPressEvent(QKeyEvent *)
{
	
}

void ModelInfo1::mouseMoveEvent(QMouseEvent *)
{
	
}
