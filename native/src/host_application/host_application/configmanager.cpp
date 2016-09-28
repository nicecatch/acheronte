#include "configmanager.hpp"

ConfigManager::ConfigManager() {
	call_result = registryManager.OpenKey(DEFAULT_ROOT_DOCKBAR_KEY, DEFAULT_DOCKBAR_KEY);
}

void ConfigManager::getValue(LPCSTR keyName, string &data) {
	call_result = registryManager.GetValue(keyName, data);
}

LONG ConfigManager::getResult() const {
	return call_result;
}

list<string> ConfigManager::getConfig() {

	int i = 0;

	list<string> elements;
	// Max 100 key?
	for (i = 1; i <= MAX_KEYS; i++) {

		string keyName = to_string(i);
		LPCSTR buffer = keyName.c_str();

		string value;
		getValue(buffer, value);
		if (call_result != ERROR_SUCCESS) {
			break;
		}
		elements.push_back(value);
	}

	return elements;
}
