import { Component, OnInit } from '@angular/core';
import { THREAT_LIST } from 'src/app/models/mock-data';
import { ThreatListElement } from 'src/app/models/threat-list-element';


@Component({
    selector: 'app-engagement-list',
    templateUrl: './engagement-list.component.html',
    styleUrls: ['../dashboard/dashboard.component.css']
})
export class EngagementListComponent implements OnInit {

    engagementList: ThreatListElement[] = [];
    engagementListColumns: string[] = ['target', 'speed', 'class'];

    constructor() {
        Promise.resolve(THREAT_LIST)
            .then(list => this.engagementList = list)
            .catch(err => console.log('Error catched retrieving the Threat List: %s', err));
    }

    ngOnInit() {
    }
}
