import {Component} from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    title = 'app';
    playerLimitReached = false;
    tellUserPlayerLimitReached = false;


/******************
    addPlayer() {
        if ( ! this.playerLimitReached) {
            this.players.push( {name: '', strokes: []} );
        }
        else { this.tellUserPlayerLimitReached = true; }

        if (this.players.length === 4) {
            this.playerLimitReached = true;
        }
    }



    updateTeesAndCells(){
      //  loadCurrentCourseIndex();
      //  loadCurrentCourseHref();
      //  loadCourse(currentCourseHref);
    }


    validateCellAndUpdateRow(input) {
        if (isNaN(input.value)) {
            input.value = 0;
        }

       // let player = this.getPlayer($(this));
      //  this.updateStrokeTotals(player);
    }
 ********/

/************
    updateStrokeTotals(player) {
        loadPlayerStrokes(player);
        fillTotalCell(player + '-cell-out', playerStrokes[player], [0, 9]);
        fillTotalCell(player + '-cell-in', playerStrokes[player], [0, 9]);
        var arr = [Number($('#' + player + '-cell-out').text()),
            Number($('#' + player + '-cell-in').text())];
        fillTotalCell(player + '-cell-total', arr, [0, arr.length]);
    }


    getPlayer(obj) {
        let id = this.getCellID(obj);
        return this.playerNameInID(id);
    }


    getCellID(obj) {
        let parent = obj.closest('.strokes-input-cell');
        return parent.attr('id');
    }


    playerNameInID(id) {
        let parts = id.split('-');
        let player = parts[0];
        return player;
    }
**********/

}
