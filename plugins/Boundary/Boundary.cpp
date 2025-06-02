#include "Boundary.h"
#include "glwidget.h"

void Boundary::onPluginLoad()
{
	printObjectCharacteristics();
}
 
void Boundary::onObjectAdd()
{
	Nobjects ++;
	printObjectCharacteristics();
}

void Boundary::printObjectCharacteristics()
{
	int i = 0;
	for (auto current : scene() -> objects()) {
		cout << "Object " << i+1 << ":\n";
		edgedOnce(current);
		i++;
	}
}

void Boundary::edgedOnce(const Object &object)
{
    edgeCount.clear(); // Reinicialitzem el mapa per a cada objecte

    for (const Face &face : object.faces()) {
        int v0 = face.vertexIndex(0);
        int v1 = face.vertexIndex(1);
        int v2 = face.vertexIndex(2);

		// Assegurem que v0 i v1 son iguals que v1 i v0 es adir 
		// pair < min (v0, v1), max (v0, v1) > => < v0, v1 >
		// pair < min (v1, v0), max (v1, v0) > => < v0, v1 >
        std::pair<int, int> e0 = std::minmax(v0, v1);	
        std::pair<int, int> e1 = std::minmax(v1, v2);
        std::pair<int, int> e2 = std::minmax(v2, v0);

        edgeCount[e0]++;
        edgeCount[e1]++;
        edgeCount[e2]++;
    }

    int Nedges1 = 0;
    for (const auto &edge : edgeCount) {
        if (edge.second == 1) {
            Nedges1++;
        }
    }

    cout << "E = " << edgeCount.size() << "\n";
    cout << "Border = " << Nedges1 << "\n";
}

