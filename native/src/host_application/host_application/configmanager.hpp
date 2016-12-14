#pragma once

#define DEFAULT_ROOT_DOCKBAR_KEY HKEY_CURRENT_USER
#define DEFAULT_DOCKBAR_KEY "Software\\Google\\Chrome\\NativeMessagingHosts\\it.tdt.host_application\\Dock"
#define DEFAULT_DOCKBAR_BUTTONS "buttons.settings"
#define DEFAULT_DOCKBAR_WHITELIST "whitelist.settings"
#define MAX_KEYS 100

#include <list>
#include "registrymanager.hpp"
using namespace std;

class ConfigManager {

public:
	ConfigManager();
	LONG getResult() const;
	string getButtonsConfig();
	string getWhiteListConfig();
	string getHostName();
private:
	RegistryManager registryManager;
	LONG call_result;
	void getValue(LPCSTR keyName, string & data, int buf_size);
	string getConfig(LPCSTR keyName);
};