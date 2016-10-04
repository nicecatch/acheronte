class ReloadMaker extends BaseMaker {
    constructor() {
        super('reload', ReloaderElement, false)
    }

    handle_response (respnsone) {
        // reloader doesn't need this
    }
}