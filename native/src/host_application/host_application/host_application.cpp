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

// Lib for reading and parsing json
#include <json.hpp>

#include "stdafx.h"

using namespace std;

const int SIZE_LENGTH = 4;

int main() {

	//ofstream myfile;
	//myfile.open("example.txt", ios::out | ios::trunc);
	// Set "stdin" to have binary mode:

	//myfile << "Overwritten\n";



	//#endif

	string oneLine = "";

	//while (1) {
	int result;

#ifdef WIN32
	result = _setmode(_fileno(stdin), _O_BINARY);
	result += _setmode(_fileno(stdout), _O_BINARY);
	if (result < 0)
	{
		// cannot set stdin or stoud to binary, exit with error
		return 1;
	}
#endif

	unsigned int length = 0;

	//read message length
	for (int i = 0; i < SIZE_LENGTH; i++)
	{
		unsigned int read_char = getchar();
		//myfile << "Version 2. Char " << i << ": " << read_char << "\n";

		length = length | (read_char << i * 8);
		//myfile << "Length at char " << i << ": " << length << "\n";
	}
	//myfile << "Total length " << length << "\n" ;

	if (length == 0)
	{
		return 0;
	}

	//read the json-message
	string msg = "";
	for (unsigned int i = 0; i < length; i++)
	{
		msg += (char) getchar();
		//myfile << msg << "\n";
	}
		
	//myfile << msg;
		
	json::JSON parsed_message_json = json::JSON::Load(msg);
	json::JSON response_message_json;
	string command = (parsed_message_json["text"]).ToString();
	//myfile << command << endl;
	system(command.c_str());

	//response_message_json["tabid"] = parsed_message_json["tabid"];
	//response_message_json["text"] = "thanks for feeding";
	//	
	//string message_to_send = response_message_json.ToString();
	//unsigned int len = message_to_send.length();
	//cout << char(len >> 0)
	//	<< char(len >> 8)
	//	<< char(len >> 16)
	//	<< char(len >> 24);


	//myfile << message_to_send << endl;
	//cout << message_to_send << flush;

	//myfile.close();
	return 0;
}
