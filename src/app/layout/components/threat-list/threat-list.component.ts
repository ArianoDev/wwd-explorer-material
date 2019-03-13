import { Component, OnInit } from '@angular/core';
import { THREAT_LIST } from 'src/app/models/mock-data';
import { ThreatListElement } from 'src/app/models/threat-list-element';


@Component({
    selector: 'app-threat-list',
    templateUrl: './threat-list.component.html',
    styleUrls: ['../dashboard/dashboard.component.css']
})
export class ThreatListComponent implements OnInit {

    threatList: ThreatListElement[] = [];
    threatListColumns: string[] = ['target', 'speed', 'class'];

    constructor() {
        Promise.resolve(THREAT_LIST)
            .then(list => this.threatList = list)
            .catch(err => console.log('Error catched retrieving the Threat List: %s', err));
    }

    ngOnInit() {
    }
}
