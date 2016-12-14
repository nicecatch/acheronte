#pragma once

#include <Windows.h>
#include <string>
#include <fstream>

using namespace std;

#define BUFSIZE 4096 

class ProcessManager {
public:
	ProcessManager();
	string StartProcess(char *, bool);
};