import { Injectable } from '@angular/core';

@Injectable()
export class ActiveGameService {

    private  _self: string;
    sessionKey: 'scorecard_app_activeGame';

  constructor() {
      if (sessionStorage.getItem(this.sessionKey)){
          this._self = sessionStorage.getItem(this.sessionKey);
      }
      else { this._self = ''; }
  }

  get(){
      return this._self;
  }


  save(activeGameID){
      this._self = activeGameID;
      sessionStorage.setItem(this.sessionKey, this._self);
  }

}
