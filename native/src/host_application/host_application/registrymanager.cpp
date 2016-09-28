#include "registrymanager.hpp"

RegistryManager::RegistryManager() {
	hKey = 0;
	szsize = SIZE_DEEFAULT;
}

LONG RegistryManager::OpenKey(HKEY openKey, LPCSTR regkey) {

	return RegOpenKeyEx(openKey, regkey, 0, KEY_READ, &hKey);

}

LONG RegistryManager::GetValue(LPCSTR keyName, string &returnValue) {

	DWORD dwType;
	//wchar_t value_get[SIZE_DEEFAULT];
	//LPCTSTR ciaociao;
	//LONG result = RegGetValue(hKey, keyName, NULL, &dwType, data, &szsize);
	//LPCWSTR key_name = L"Software\\Google\\Chrome\\NativeMessagingHosts\\it.tdt.host_application\\Dock";
	LONG result = RegGetValue(hKey, NULL, keyName, RRF_RT_ANY, &dwType, data, &szsize);

	//int output_size = MultiByteToWideChar(CP_ACP, 0, &data, -1, NULL, 0);
	//assert(0<output_size);
	//wchar_t *converted_buf = new wchar_t[output_size];
	//int size = MultiByteToWideChar(CP_ACP, 0, value, -1, converted_buf, output_size);

	//assert(output_size == size);
	if (result == ERROR_SUCCESS)
	{
		returnValue = reinterpret_cast<char*>(data);
	}

	return result;
}