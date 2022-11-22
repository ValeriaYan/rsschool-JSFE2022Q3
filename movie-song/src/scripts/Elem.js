export default class Elem {
    constructor(tag, className, parent) {
        this.newElem = document.createElement(tag);
        this.newElem.className = className;
        if(parent) {
            parent.append(this.newElem);
        }
    }

    getElem() {
        return this.newElem;
    }
}