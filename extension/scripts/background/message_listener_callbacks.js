class MessageListenerCallbacks {
    constructor(name, self, callback_from_extension, callback_from_native){
        this.name = name
        this.self = self
        this.callback_from_extension = callback_from_extension
        this.callback_from_native = callback_from_native
    }
}