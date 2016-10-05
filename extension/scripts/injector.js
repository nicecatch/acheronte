var dockbar = new Dockbar(document)
var router = new Router(dockbar)
var configManager = new ConfigManager(router, dockbar)

configManager.ask_config()