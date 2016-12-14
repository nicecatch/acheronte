#include "ProcessManager.hpp"
ProcessManager::ProcessManager()
{

}

string ProcessManager::StartProcess(char* cmd, bool async)
{
	//fstream myStream;
	//myStream.open("C:\\Users\\testtablet\\Desktop\\example.txt", ios::app | ios::out);
	unsigned int errorMode = SetErrorMode(SEM_NOOPENFILEERRORBOX | SEM_FAILCRITICALERRORS | SEM_NOGPFAULTERRORBOX);

	STARTUPINFO si;
	PROCESS_INFORMATION pi;

	HANDLE g_hChildStd_OUT_Rd = NULL;
	HANDLE g_hChildStd_OUT_Wr = NULL;

	ZeroMemory(&si, sizeof(si));
	si.cb = sizeof(si);
	ZeroMemory(&pi, sizeof(pi));

	bool success = false, handleInherited = false;
	int creationFlags = 0;

	if (!async) 
	{

		//myStream << "trying to open (not async): " << cmd << endl;

		SECURITY_ATTRIBUTES saAttr;

		saAttr.nLength = sizeof(SECURITY_ATTRIBUTES);
		saAttr.bInheritHandle = TRUE;
		saAttr.lpSecurityDescriptor = NULL;

		// Create a pipe for the child process's STDOUT. 
		CreatePipe(&g_hChildStd_OUT_Rd, &g_hChildStd_OUT_Wr, &saAttr, 0);

		// Ensure the read handle to the pipe for STDOUT is not inherited.
		SetHandleInformation(g_hChildStd_OUT_Rd, HANDLE_FLAG_INHERIT, 0);

		si.hStdError = g_hChildStd_OUT_Wr;
		si.hStdOutput = g_hChildStd_OUT_Wr;
		si.dwFlags |= STARTF_USESTDHANDLES;

		handleInherited = true;
		creationFlags = 0;
	}
	else
	{
		//myStream << "trying to open (async): " << cmd << endl;
		handleInherited = false;
		creationFlags = CREATE_NEW_PROCESS_GROUP;
	}

	success = CreateProcess(
		NULL,
		cmd,
		NULL,
		NULL,
		handleInherited,
		creationFlags,
		NULL,
		NULL,
		&si,
		&pi
	);

	if (!success)
	{
		//myStream << "Failed to open: " << GetLastError() << endl;
		return "";
	}

	string resp = "";

	if (!async)
	{
		CHAR chBuf[BUFSIZE];
		DWORD dwRead, exitCode;

		while(1)
		{
			GetExitCodeProcess(pi.hProcess, &exitCode);

			if (exitCode != STILL_ACTIVE)
			{
				CloseHandle(g_hChildStd_OUT_Wr);
				break;
			}
			Sleep(500);
		}

		while(ReadFile(g_hChildStd_OUT_Rd, chBuf, BUFSIZE, &dwRead, NULL) && dwRead != 0)
		{
			resp += chBuf;
		}

		CloseHandle(g_hChildStd_OUT_Rd);
	}

	CloseHandle(pi.hProcess);
	CloseHandle(pi.hThread);

	SetErrorMode(errorMode);

	return resp;
}