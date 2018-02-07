import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Game} from '../interfaces/Game.interface';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GameService {

    private _activeGame: Observable<any>;


    constructor(private _db: AngularFirestore) {
    }


    add(gameId: string, playerNames: string[]) {
        let players = {};
        for (let i = 0, thisPlayer: string; i < playerNames.length; ++i) {
            thisPlayer = 'player' + (i + 1);
            players[thisPlayer] = {name: playerNames[i], strokes: []};
        }
        this._db.collection('games').doc(gameId).set(players);
    }


    modify(game: Game): any {
        //  get a reference to the firestore document in games collection.
        //  gameReference.update(game);
    }


    get(gameId: string): Observable<any> {
        return this._db.collection('games').doc(gameId).valueChanges();
        // You can call .subscribe() on the returned Observable, for instance:
        //    .subscribe((response) => {
        //       this._activeGame = response;
        //   console.log(response.player1);
        // });
    }


    getAll(): Observable<any> {
        return this._db.collection('games').valueChanges();
    }

}
