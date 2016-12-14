#include "stdafx.h"

#include "json.hpp"
#include "configmanager.hpp"
#include "registrymanager.hpp"
#include "ProcessManager.hpp"

#include <fstream>

using namespace std;

const int SIZE_LENGTH = 4;

int main() 
{
	if (_setmode(_fileno(stdin), _O_BINARY) + _setmode(_fileno(stdout), _O_BINARY) < 0)
	{
		// cannot set stdin or stoud to binary, exit with error
		// required as stated by chrome extension documentation
		return 1;
	}

	fstream file;
	file.open("file.txt", ios::trunc);

	ProcessManager pm;

	while (1)
	{	
		// the first 4 bytes represent the length of the message
		unsigned int length = 0;

		cin.read((char *)&length, SIZE_LENGTH);

		if (length == 0 || length == UINT_MAX)
		{
			return 0;
		}

		//read the json-message
		string msg = "";
		for (unsigned int i = 0; i < length; i++)
		{
			msg += (char)getchar();
		}

		json::JSON parsed_message_json = json::JSON::Load(msg), response_message_json;

		if ((parsed_message_json["type"]).ToString().compare("get_config") == 0)
		{
			ConfigManager configManager;
			if (configManager.getResult() == ERROR_SUCCESS)
			{
				// Get buttons configuration
				string cl = configManager.getButtonsConfig();
				response_message_json["buttons"] = json::JSON::Load(cl);

				// Get whitelist configuration
				cl = configManager.getWhiteListConfig();
				response_message_json["whitelist"] = json::JSON::Load(cl);

				// Get hostname
				response_message_json["hostname"] = configManager.getHostName();

			}
			else
			{
				
				response_message_json["error"] = "Cannot open configuration";
			}
		}
		else if ((parsed_message_json["type"]).ToString().compare("execute_command") == 0)
		{
			string command = (parsed_message_json["command"]).ToString();

			char * command_char = new char[command.length() + 1];
			strcpy(command_char, command.c_str());
			response_message_json["response"] = pm.StartProcess(command_char, parsed_message_json["async"].ToBool());
			file << response_message_json["response"] << endl;
			delete[] command_char;

		}		

		// send back values that identify request
		// tabId identifies the tab that has sent the message
		response_message_json["tabId"] = parsed_message_json["tabId"];
		
		// name identifies the button
		response_message_json["name"] = parsed_message_json["name"];

		// type is either get_config or execute_command
		response_message_json["type"] = parsed_message_json["type"];

		string message_to_send = response_message_json.dump(0,"");

		//mystream << message_to_send << endl << response_message_json << endl;
		
		unsigned int len = message_to_send.length();

		// send back the length as 4 bytes
		std::cout.write((char*)&len, 4);
		// send message 
		std::cout.write(message_to_send.c_str(), len);
	}
	file.close();
	return 0;
}