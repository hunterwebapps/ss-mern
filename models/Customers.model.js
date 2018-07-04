class CustomerModel {
    constructor() {

    }



    toJSON() {
        return {

        } = this;
    }

    static fromJSON(obj) {
        return new this(obj);
    }
}
