# Full Screen Helper
This is just a simple Chrome Extension that aims to help navigation when running Chrome on Kiosk mode with tablet/phone devices.

## Capabilities
This extension can show a little dockbar injected inside HTML pages to provide some functionality controlled by windows registry

####Available buttons/features:
*    Reload buttons
*    Battery power indicator
*    Wifi signal strength indicator
*    Button to redirect page to a fixed address
*    Program opener
*    Collapse button
*    Zoom buttons

Also it provides:
*    Autoreload on loading page error (dns, connection etc etc)
*    Allow access only to a set of websites defined throught a whitelist


## Install
This extension uses Chrome nativeMessaging support for opening external files and retrieving wifi signal strength

#### Step 1:
Compile host_application - under native/ - with a C++11 compiler

#### Step 2 (Optional ?):
Deploy to Chrome Developer Dashboard your own extension located under extension/

You can skip this step if you are willingly to use my published extension, but there is no warranty on future updates

#### Step 3:
Deploy these files in a fixed directory:
*    native/
    *    manifest.json
    *    wifi.ps1

and host_application.exe

Substitute inside manifest.json the full path to host_application.exe and the extension ID you are using

#### Step 4:
Deploy native/register_application.reg substituting the path to manifest.json you deployed in previous step

#### Step 5:
Add configuration inside machine registry as explained below

#### Step 5b
Define a whitelist of permitted sites (example can be found below). No or empty whitelist is considered as full access to sites 

#### Step 6:
Install extension through Chrome Store or force install policy and restart Chrome


## Registry configuration
    An example can be found inside native/create_configuration.reg

## Whitelist configuration
    An example can be found inside native/create_whitelist.reg

### Tested on
Windows 10 x64 + Chrome 56.0.2924.21 beta (64-bit)

### Links
[Chrome Web Store](https://chrome.google.com/webstore/detail/gbmeaocaejfnpefjcpjjnpdjbbnmobgn "Chrome Web Store")
[GitHub](https://github.com/nicecatch/acheronte "GitHub")

### Future
*    Add settings page

