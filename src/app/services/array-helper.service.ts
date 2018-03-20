import {Injectable} from '@angular/core';

@Injectable()

export class ArrayHelperService {

    private _self: any[];

    constructor() {
    }


    set(array) {
        this._self = array;
        return this;
    }


    removeNonAdjacent(items) {
        items.forEach((item) => {
            this.removeFirst(item);
        });
        return this;
    }


    removeFirst(item) {
        if (this.itemExists(item)) {
            let index = this._self.indexOf(item);
            this._self.splice(index, 1);
        }
        return this;
    }


    removeAllOf(item) {
        for (let i = 0; i < this._self.length; ++i){
            if (this.itemExists(item)){
                this.removeFirst(item);
            }
            else break;
        }
        return this;
    }


    removeAdjacentStartingWith(item, numToRemove) {
        if (this.itemExists(item)) {
            let index = this._self.indexOf(item);
            this._self.splice(index, numToRemove);
        }
        return this;
    }


    itemExists(item) {
        return (this._self.indexOf(item) > -1);
    }


}

