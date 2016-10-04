class GenericMaker extends BaseMaker {
    constructor(name, params) {
        super(name, GenericElement, true)
        this._params = params
    }
}