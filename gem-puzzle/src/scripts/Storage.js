export default class Storage {
    constructor() {
        this.save = {};
        this.tableResults = [];
    }

    saveGame(stats, arrayCells) {
        this.save['stats'] = JSON.stringify(stats);
        this.save['arrayCells'] = arrayCells;
        localStorage.setItem('save', JSON.stringify(this.save));
    }

    getSave() {
        return JSON.parse(localStorage.getItem('save'));
    }

    saveResult(stats, size) {
        let result = {
            'size': size,
            'stats': stats,
        }
        if(localStorage.getItem('tableResults')) {
            this.tableResults = JSON.parse(localStorage.getItem('tableResults'));
        }
        this.tableResults.push(result);
        this.sortResult();
        while(this.tableResults.length > 10) {
            this.tableResults.pop();
        }
        localStorage.setItem('tableResults', JSON.stringify(this.tableResults));
    }

    sortResult() {
        this.tableResults.sort((a, b) => {
            if(a['size'] == b['size'] && +a['stats']['movements'] <= +b['stats']['movements']) {
                return -1;
            }
            if(a['size'] == b['size'] && +a['stats']['movements'] > +b['stats']['movements']) {
                return 1;
            }
            if(a['size'] > b['size']) {
                return -1;
            }
            if(a['size'] <= b['size']) {
                return 1;
            }
        })

        console.log(this.tableResults)
    }

    getTableResults() {
        if(!localStorage.getItem('tableResults')) {
            return [];
        }
        return JSON.parse(localStorage.getItem('tableResults'));
    }

}