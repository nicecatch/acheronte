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

list<string> ConfigManager::getConfig() {

	int i = 0;

	list<string> elements;
	int buf_size = 1;
	// Max 100 key?
	for (i = 1; i <= MAX_KEYS; i++) {

		string keyName = to_string(i);
		LPCSTR buffer = keyName.c_str();

		string value;
		getValue(buffer, value, buf_size);
		if (call_result == ERROR_SUCCESS) {
			// key is retrieved, get next one
			elements.push_back(value);
			buf_size = 1;
		}
		else if (call_result == ERROR_MORE_DATA) {
			// needed more space to retrieve key
			i--;
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

	return elements;
}
