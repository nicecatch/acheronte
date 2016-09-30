class WifiHandler extends BaseHandler {
    constructor() {
        super('wifi', 'powershell -File wifi.ps1')
    }
}