#include "registrymanager.hpp"

RegistryManager::RegistryManager() {
	hKey = 0;
	szsize = SIZE_DEEFAULT;
}

LONG RegistryManager::OpenKey(HKEY openKey, LPCSTR regkey) {

	return RegOpenKeyEx(openKey, regkey, 0, KEY_READ, &hKey);

}

LONG RegistryManager::GetValue(LPCSTR keyName, string &returnValue, int buf_size) {

	DWORD dwType;
	szsize = SIZE_DEEFAULT * buf_size;
	BYTE* data = new BYTE [szsize];

	LONG result = RegGetValue(hKey, NULL, keyName, KEY_WOW64_64KEY | RRF_RT_ANY, &dwType, data, &szsize);

	if (result == ERROR_SUCCESS)
	{
		returnValue = reinterpret_cast<char*>(data);
	}

	delete data;

	return result;
}