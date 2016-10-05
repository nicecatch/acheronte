#pragma once

#include <string>
#include <windows.h>

using namespace std;

#define SIZE_DEEFAULT 1024

class RegistryManager {
public:
	RegistryManager();
	LONG OpenKey(HKEY openKey, LPCSTR regkey);
	LONG GetValue(LPCSTR keyName, string &returnValue, int buf_size);

private:
	HKEY hKey;
	DWORD szsize;
};