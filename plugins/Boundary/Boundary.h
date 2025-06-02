#ifndef _BOUNDARY_H
#define _BOUNDARY_H

#include "plugin.h" 
#include <set>
#include <vector>
#include <string>
#include <iostream>
#include <map>
using namespace std;

class Boundary: public QObject, public Plugin
{
	Q_OBJECT
	Q_PLUGIN_METADATA(IID "Plugin") 
	Q_INTERFACES(Plugin)

  public:
	 void onPluginLoad();
	 void onObjectAdd();
	 void printObjectCharacteristics();
	 void edgedOnce(const Object &object);
  private:
	// add private methods and attributes here
	int Nobjects = 0;
	map <pair<int,int>,int> edgeCount; // map to count edges
};

#endif
