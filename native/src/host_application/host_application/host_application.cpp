// host_application.cpp : definisce il punto di ingresso dell'applicazione console.
// Lib for reading Chrome data
#include <iostream>
#include <string>

//#ifdef WIN32
// Lib to set stdin to binary
#include <fcntl.h>
#include <io.h>
//#endif

// Lib for writing console debugging output
#include <fstream>

// Lib for _popen
#include <stdio.h>
#include <Windows.h>
#include <process.h>

// Lib for reading and parsing json
#include <json.hpp>


#include <limits.h>

#include "stdafx.h"

using namespace std;

const int SIZE_LENGTH = 4;

int main() 
{
	
	if (_setmode(_fileno(stdin), _O_BINARY) + _setmode(_fileno(stdout), _O_BINARY) < 0)
	{
		// cannot set stdin or stoud to binary, exit with error
		return 1;
	}

	while (1)
	{
		unsigned int length = 0;

		cin.read((char *)&length, SIZE_LENGTH);

		////read message length
		//for (int i = 0; i < SIZE_LENGTH; i++)
		//{
		//	
		//	unsigned int read_char = getchar();
		//	length = length | (read_char << i * 8);
		//}

		if (length == 0)
		{
			return 0;
		}
		else if (length == ULONG_MAX)
		{
			continue;
		}

		//read the json-message
		string msg = "";
		for (unsigned int i = 0; i < length; i++)
		{
			msg += (char)getchar();
		}

		json::JSON parsed_message_json = json::JSON::Load(msg), response_message_json;
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

		// send back values that identify request
		response_message_json["tabId"] = parsed_message_json["tabId"];
		response_message_json["requestType"] = parsed_message_json["requestType"];

		string message_to_send = response_message_json.dump(1, "");
		unsigned int len = message_to_send.length();

		cout.write((char*)&len, 4);
		cout.write(message_to_send.c_str(), len);
	}

	return 0;
}
