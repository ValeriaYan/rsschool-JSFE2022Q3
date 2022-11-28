export default class Elem {
    constructor(tag, parent, classList) {
        this.newElem = document.createElement(tag);
        if(classList) {
            this.newElem.className = classList;
        }
        parent.append(this.newElem);
    }

    get elem() {
        return this.newElem;
    }
}