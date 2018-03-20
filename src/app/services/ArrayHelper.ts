import {Injectable} from '@angular/core';

@Injectable()

export class ArrayHelperService {

    private _self: any[];

    constructor(array) {
        this._self = array;
    }


    removeNonAdjacent(items){
        items.forEach((item) => {
            this.removeItem(item);
        });
        return this._self;
    }


    removeItem(item){
        if (this.itemExists(item)){
            let index = this._self.indexOf(item);
            this._self.splice(index, 1);
        }
        return this._self;
    }


    Array.prototype.removeAdjacentItemsStartingWith = function(item, numToRemove){
        if (this.itemExists(item)){
            var index = this.indexOf(item);
            this.splice(index, numToRemove);
        }
        return this;
    };


    Array.prototype.itemExists = function(item){
        return (this.indexOf(item) > -1);
    };

// remember to remove those prototype additions at program's end.


}

