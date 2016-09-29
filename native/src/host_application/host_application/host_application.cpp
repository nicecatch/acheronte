// host_application.cpp : definisce il punto di ingresso dell'applicazione console.

#include "stdafx.h"

#include "json.hpp"
#include "configmanager.hpp"
#include "registrymanager.hpp"

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

	while (1)
	{	
		// the first 4 bytes represent the length of the message
		unsigned int length = 0;

		cin.read((char *)&length, SIZE_LENGTH);

		if (length == 0)
		{
			// Useful?
			return 0;
		}
		else if (length == ULONG_MAX)
		{
			// if they are all '1's chrome has no message to send (fake read)
			continue;
		}

		//read the json-message
		string msg = "";
		for (unsigned int i = 0; i < length; i++)
		{
			msg += (char)getchar();
		}

		json::JSON parsed_message_json = json::JSON::Load(msg), response_message_json;

		if ((parsed_message_json["type"]).ToString().compare("get_config"))
		{
			ConfigManager configManager;
			if (configManager.getResult() == ERROR_SUCCESS)
			{
				json::JSON list_configuration = json::Array();
				list<string> cl = configManager.getConfig();
				for (string n : cl)
				{
					list_configuration.append(json::JSON::Load(n));
				}
				response_message_json["response"] = list_configuration;
			}
			else
			{
				response_message_json["error"] = "Cannot open configuration";
			}
		}
		else if ((parsed_message_json["type"]).ToString().compare("execute_command"))
		{
			string command = (parsed_message_json["text"]).ToString();

			FILE* pipeFile;

			if ((pipeFile = _popen(command.c_str(), "r")) == NULL)
			{
				response_message_json["error"] = "Cannot open pipe";
			}
			else
			{
				char buffer_array[1024];
				string response;

				while (!feof(pipeFile))
				{
					if (fgets(buffer_array, 1024, pipeFile) != NULL)
						response += buffer_array;
				}

				response_message_json["response"] = response;
			}
		}		

		// send back values that identify request
		// tabId identifies the tab that has sent the message
		response_message_json["tabId"] = parsed_message_json["tabId"];
		
		// requestType identifies the button (it's the value <name> )
		response_message_json["requestType"] = parsed_message_json["requestType"];

		string message_to_send = response_message_json.dump(1, "");
		unsigned int len = message_to_send.length();

		// send back the length as 4 bytes
		cout.write((char*)&len, 4);
		// send message 
		cout.write(message_to_send.c_str(), len);
	}

	return 0;
}
