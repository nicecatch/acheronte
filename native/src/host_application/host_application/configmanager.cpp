#include "configmanager.hpp"

ConfigManager::ConfigManager() {
	call_result = registryManager.OpenKey(DEFAULT_ROOT_DOCKBAR_KEY, DEFAULT_DOCKBAR_KEY);
}

void ConfigManager::getValue(LPCSTR keyName, string &data, int buf_size = 1) {
	call_result = registryManager.GetValue(keyName, data, buf_size);
}

LONG ConfigManager::getResult() const {
	return call_result;
}

string ConfigManager::getConfig() 
{

	string config;
	int buf_size = 1;

	while (buf_size < 20) // cap ?
	{
		getValue(DEFAULT_DOCKBAR_VALUE, config, buf_size);

		if (call_result == ERROR_SUCCESS) {
			// key is retrieved
			break;
		}
		else if (call_result == ERROR_MORE_DATA) {
			// needed more space to retrieve key
			buf_size++;
		}
		else
		{
			/*
				Probably, the error is FILE_NOT_FOUND.
				Anyway, if it is something different from SUCCESS or MORE_DATA stop the cycle
			*/
			break;
		}
	}

	return config;
}

string ConfigManager::getHostName()
{
	TCHAR buffer[256];
	DWORD dwSize = sizeof(buffer);
	GetComputerNameEx(COMPUTER_NAME_FORMAT::ComputerNameNetBIOS, buffer, &dwSize);

	return buffer;
}