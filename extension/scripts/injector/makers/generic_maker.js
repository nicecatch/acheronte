class GenericMaker extends BaseMaker {
    constructor(params) {
        super(params.name, GenericElement, true)
        this._params = params
    }

    handle_response(parameters) {
        // not needed...
    }

    _initialize_element(page_document) {
        return new GenericElement(page_document, this._params)
    }
}