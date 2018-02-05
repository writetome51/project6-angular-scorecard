import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Game} from '../Game.interface';
import {Player} from '../Player.interface';

@Injectable()
export class GameService {

    public activeGame: AngularFirestoreDocument<Game>;


    constructor(private _db: AngularFirestore) {
    }


    add(gameId: string, playerNames: string[]){
        let players = {};
        for (let i = 0, thisPlayer: string; i < playerNames.length; ++i){
            thisPlayer = 'player' + (i + 1);
            players[thisPlayer] = {name: playerNames[i], strokes: []};
        }
        this._db.collection('games').doc(gameId).set(players);
    }


    modify(game: Game){
        this.activeGame.set(game);
    }


    get(gameId): AngularFirestoreDocument<Game>{
        this.activeGame = this._db.collection('games').doc(gameId);
        return this.activeGame;
    }

}
