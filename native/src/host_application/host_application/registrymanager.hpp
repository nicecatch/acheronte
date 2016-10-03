#pragma once

#include <string>
#include <windows.h>

using namespace std;

#define SIZE_DEEFAULT 2048

class RegistryManager {
public:
	RegistryManager();
	LONG OpenKey(HKEY openKey, LPCSTR regkey);
	LONG GetValue(LPCSTR keyName, string &returnValue);

private:
	HKEY hKey;
	DWORD szsize;
};