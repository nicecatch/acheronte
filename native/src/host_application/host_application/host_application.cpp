// host_application.cpp : definisce il punto di ingresso dell'applicazione console.
//
#include <iostream>
#include <string>

#include "stdafx.h"

using namespace std;

const int SIZE_LENGTH = 4;

int main() {
	string oneLine = "";

	while (1) {
		unsigned int length = 0;

		//read message length
		for (int i = 0; i < SIZE_LENGTH; i++)
		{
			unsigned int read_char = getchar();
			length |= (read_char << i * 8);
		}

		//read the json-message
		string msg = "";
		for (int i = 0; i < length; i++)
		{
			msg += getchar();
		}

		string message = "{\"text\":\"This is a response message\"}";
		// Collect the length of the message
		unsigned int len = message.length();

		// Now we can output our message
		if (msg == "{\"text\":\"#STOP#\"}") {
			message = "{\"text\":\"EXITING...\"}";
			len = message.length();

			cout << char(len >> 0)
				<< char(len >> 8)
				<< char(len >> 16)
				<< char(len >> 24);

			cout << message;
			break;
		}

		len = length;
		cout << char(len >> 0)
			<< char(len >> 8)
			<< char(len >> 16)
			<< char(len >> 24);

		cout << msg << flush;
	}

	return 0;
}
