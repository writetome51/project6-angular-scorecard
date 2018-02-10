import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Game} from '../interfaces/Game.interface';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GameService {

    private _activeGame: Observable<any>;


    constructor(private _db: AngularFirestore) {
    }


    get(gameId: string): Observable<any> {
        return this._db.collection('games').doc(gameId).valueChanges();
        // You can call .subscribe() on the returned Observable, for instance:
        //    .subscribe((response) => {
        //       this._activeGame = response;
        //   console.log(response.player1);
        // });
    }


    getAll(functionThatManipulatesResponse){
        this._getAllAsObservableWithMetadata().subscribe(functionThatManipulatesResponse);
    }


    private _getAllAsObservableWithMetadata(): Observable<any> {
        return this._db.collection('games').snapshotChanges();
    }


    getGameID(gameDocument){
        return gameDocument.payload.doc.id;
    }


    add(playerNames: string[]) {
        let gameId = this.getDatetime();
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


    getDatetime(): string{
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let hour = d.getHours();
        let mins = d.getMinutes();
        let secs = d.getSeconds();
        return year + '-' + month + '-' + day + '_' + hour + mins + secs;
    }



}
