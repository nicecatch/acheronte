#pragma once

#include <string>
#include <windows.h>

using namespace std;

#define SIZE_DEEFAULT 512

class RegistryManager {
public:
	RegistryManager();
	LONG OpenKey(HKEY openKey, LPCSTR regkey);
	LONG GetValue(LPCSTR keyName, string &returnValue);

private:
	HKEY hKey;
	BYTE data[SIZE_DEEFAULT];
	DWORD szsize;
};