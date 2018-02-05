import {Injectable} from '@angular/core';
import {Player} from '../Player.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class PlayersService {

    private _players: Player[] = [];
    private _player: Player;

    constructor(private _http: HttpClient) {
    }

    get players() {
        // retrieve Player[] from db.
    }

    set players(value: Player[]) {
        // save value in db.
    }

    get player(){}

}
