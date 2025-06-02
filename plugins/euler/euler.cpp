#include "euler.h"
#include "glwidget.h"

void Euler::onPluginLoad()
{
	printObjectCharacteristics();
}
 
void Euler::onObjectAdd()
{
	Nobjects ++;
	printObjectCharacteristics();
}

void Euler::printObjectCharacteristics()
{
	int i = 0;
	for (auto current : scene() -> objects()) {
		cout << "Object " << i+1 << ":\n";
		int F = current.faces().size();
		int V = current.vertices().size();
		int E = 3*F / 2;
		cout << "F = " << F << "\n";
		cout << "V = " << V << "\n";
		cout << "E = " << E << "\n";
		cout << "X = " << F + V - E << "\n";
		i++;
	}
}
