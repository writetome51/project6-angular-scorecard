import { Injectable } from '@angular/core';
import {Player} from '../Player.interface';

@Injectable()

export class PlayersService {

    players: Player[] = [];

  constructor() { }

}
