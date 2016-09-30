var dockbar = Dockbar(document)
var router = Router()
var configManager = ConfigManager(router, dockbar)

configManager.ask_config()