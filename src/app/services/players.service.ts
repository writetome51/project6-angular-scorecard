import {Injectable} from '@angular/core';
import {Player} from '../Player.interface';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()

export class PlayersService {

    private _players: Player[] = [];
    private _player: Player;

    constructor(private _angularFirestore: AngularFirestore) {
    }

    private _getPlayers(): Player[] {
        if (!this._players || this._players.length === 0){
            this._angularFirestore.collection('games')
                .valueChanges()
                .subscribe(items => {
                    this.items = items;
                    console.log('items', items);
                });;
        }
    }

    private _setPlayers(value: Player[]){

    }


}
