import {Injectable, OnInit} from '@angular/core';
import {Player} from '../Player.interface';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()

export class PlayersService {

    private _players: Player[] = [];
    private _player: Player;


    constructor(private _angularFirestore: AngularFirestore) {
        this._angularFirestore.collection('games')
            .valueChanges()
            .subscribe(items => {
                this._players = items;
                console.log('items', items);
            });
    }


    get players(): Player[] {
        if (!this._players || this._players.length === 0){

        }
    }

    private _setPlayers(value: Player[]){

    }


}
