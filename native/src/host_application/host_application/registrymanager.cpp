#include "registrymanager.hpp"

RegistryManager::RegistryManager() {
	hKey = 0;
}

LONG RegistryManager::OpenKey(HKEY openKey, LPCSTR regkey) {

	return RegOpenKeyEx(openKey, regkey, 0, KEY_READ, &hKey);

}

LONG RegistryManager::GetValue(LPCSTR keyName, string &returnValue, int buf_size) {

	DWORD dwType;
	DWORD size = SIZE_DEEFAULT * buf_size;
	BYTE* data = new BYTE [size];

	LONG result = RegGetValue(hKey, NULL, keyName, KEY_WOW64_64KEY | RRF_RT_ANY, &dwType, data, &size);

	if (result == ERROR_SUCCESS)
	{
		returnValue = reinterpret_cast<char*>(data);
	}

	delete[] data;

	return result;
}