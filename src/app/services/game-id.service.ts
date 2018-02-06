import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class GameIdService {

    private _IDs: string[];
    private _self: string;

    constructor(private _db: AngularFirestore) {}

}
