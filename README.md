# Full Screen Helper
This is just a simple Chrome Extension that aims to help navigation when running Chrome on Kiosk mode with tablet/phone devices.

## Capability
This extension can show a little dockbar injected inside HTML pages to provide some functionality controlled by windows registry

####Available buttons/features:
*    Reload buttons
*    Battery power indicator
*    Wifi signal strength indicator
*    Button to redirect page to a fixed address
*    Program opener

Also it provides:
*    Autireload on loading page error (dns, connection etc etc)


## Install
This extension uses Chrome nativeMessaging support to open external files and retrieve wifi signal strength

####Step 1:
Compile host_application - under native/ - with a C++11 compiler

####Step 2 (Optional ?):
Deploy to Chrome Developer Dashboard your own extension located under extension/

You can skip this step if you are willingly to use my published extension, but no warranty on future updates

####Step 3:
Deploy these files in a fixed directory:
*    native/
    *    manifest.json
    *    wifi.ps1
and host_application.exe

Substitute inside manifest.json the full path to host_application.exe and the extension ID you are using

####Step 4:
Deploy native/register_application.reg subtituting the path to manifest.json your deployed in previous step

####Step 5:
Add configuration inside machine registry as explained below

####Step 6:
Install extension through Chrome Store or force install policy and restart Chrome


## Registry configuration
    An example can be found under native/create_configuration.reg
Quite self explanatory:
*Values must be REG_SZ inside the registry
*type: 0 is for external application
*Only 1 'link' can be used
*Don't overlap names

### Tested on
Windows 10 x64
Chrome 54.0.2840.50

### Links
[Chrome Web Store](https://chrome.google.com/webstore/detail/hjlojijobopljleofgaodpjaimjkjbjn "Chrome Web Store")
[GitHub](https://github.com/nicecatch/acheronte "GitHub")

### Future
*    Add settings page

