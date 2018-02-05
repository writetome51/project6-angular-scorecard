import {Injectable} from '@angular/core';
import {Player} from '../Player.interface';
import {AngularFirestore} from 'angularfire2/firestore';
import {Game} from '../Game.interface';

@Injectable()
export class GameService {

    game: Game;

    constructor(private _angularFirestore: AngularFirestore) {
        this._angularFirestore.collection('games')
            .valueChanges()
            .subscribe(items => {
                this.games = items;
                console.log('games — ', items);
            });
    }


    add(gameId: string, playerNames: string[]){
        let playerData = {};
        for (let i = 0, thisPlayer:string; i < playerNames.length; ++i){
            thisPlayer = 'player' + (i + 1);
            playerData[thisPlayer] = {name: playerNames[i], strokes: []};
        }
        this._angularFirestore.collection('games').doc(gameId).set(playerData);
    }


    get(gameId){
        return this.games[gameId];
    }

}
