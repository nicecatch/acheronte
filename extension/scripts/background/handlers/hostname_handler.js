class HostnameHandler extends BaseHandler {
    constructor() {
        super('hostname')
    }

    callback_from_extension(params) {

        var hostname = {
            name: "hostname",
            hostname: configManager.get_hostname()
        }
        chrome.tabs.sendMessage(params.sender.tab.id, hostname);

    }
}