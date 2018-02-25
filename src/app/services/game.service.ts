import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Game} from '../interfaces/Game.interface';
import {Observable} from 'rxjs/Observable';
import {ActiveGameService} from './active-game.service';

@Injectable()
export class GameService {

    constructor(
        private _db: AngularFirestore,
        private _activeGame: ActiveGameService) {
    }


    get(gameId: string): Observable<any> {
        return this._db.collection('games').doc(gameId).valueChanges();
    }


    getAll(observer){
        this._getAllAsObservableWithMetadata().subscribe(observer);
    }


    private _getAllAsObservableWithMetadata(): Observable<any> {
        return this._db.collection('games').snapshotChanges();
    }


    getGameID(gameDocument){
        return gameDocument.payload.doc.id;
    }


    add(playerNames: string[]) {
        let gameId = this._getDatetime();
        this._activeGame.set(gameId);
        let players = this._preparePlayerObjects(playerNames, 1);
        this._db.collection('games').doc(gameId).set(players);
    }

    private _preparePlayerObjects(playerNames: string[], startingPlayerNumber): object{
        let players = {};

        for (let j = 0, thisPlayer: string;  j < playerNames.length;  ++j) {
            thisPlayer = 'player' + startingPlayerNumber;
            players[thisPlayer] = {name: playerNames[j], strokes: []};
            ++startingPlayerNumber;
        }
        return players;
    }


    addMorePlayers(playerNames, startingPlayerNumber){
        let newPlayers = this._preparePlayerObjects(playerNames, startingPlayerNumber);
        this._db.collection('games')
            .doc(this._activeGame.get()).update(newPlayers);
        //  get a reference to the firestore document in games collection.
        //  gameReference.update(game);
    }


    private _getDatetime(): string{
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
