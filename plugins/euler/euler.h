#ifndef _EULER_H
#define _EULER_H

#include "plugin.h" 
#include <set>
#include <vector>
#include <string>
#include <iostream>
using namespace std;

class Euler: public QObject, public Plugin
{
	Q_OBJECT
	Q_PLUGIN_METADATA(IID "Plugin") 
	Q_INTERFACES(Plugin)

  public:
	 void onPluginLoad();
	 void onObjectAdd();
	 void printObjectCharacteristics();
  private:
	// add private methods and attributes here
	int Nobjects = 0;
};

#endif
