import {
    Component,
    OnInit,
    NgZone,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from "@angular/core";
import * as Muuri from "muuri";

@Component({
    selector: "app-grid-demo",
    templateUrl: "./grid-demo.component.html",
    styleUrls: ["./grid-demo.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridDemoComponent implements OnInit {
    data: Array<any> = [
        { id: "1", title: "One", width: 1, height: 1 },
        { id: "2", title: "Two", width: 2, height: 2 },
        { id: "3", title: "Three", width: 1, height: 1 },
        { id: "4", title: "Four", width: 1, height: 1 },
        { id: "5", title: "Five", width: 1, height: 1 },
        { id: "6", title: "Six", width: 1, height: 0.5 },
        { id: "7", title: "Seven", width: 0.5, height: 0.5 },
        { id: "8", title: "Eight", width: 1, height: 0.5 },
        { id: "9", title: "Nine", width: 0.5, height: 0.5 },
        { id: "10", title: "ten", width: 1, height: 0.5 }
	];
	retId:string[] = [];

    constructor(private zone: NgZone, private ref: ChangeDetectorRef) {}

    ngOnInit() {
        setTimeout(() => this.gridInit());
        // setTimeout(() => this.ref.markForCheck(),1000);
    }

    gridInit() {
        const grid = new Muuri(".grid", {
			items:'.item',
            layout: {
                fillGaps: true,
                horizontal: false,
                alignRight: false,
                alignBottom: false,
                rounding: false
            },
            item: ".item",
            layoutDuration: 400,
            layoutEasing: "ease",
            dragEnabled: true,
            dragSortInterval: 50,
            dragContainer: document.body,
            dragReleaseDuration: 400,
            dragReleseEasing: "ease"
        });
        grid.refreshItems().layout();
        grid.on("layoutEnd", (items) => {
			console.log(items);
			this.ref.markForCheck();
			this.ref.detectChanges();
			console.log(this.data);
			this.retId = [];
			items.forEach(el => { 
				console.log(el.getElement().id);
				let id = el.getElement().id;
				this.retId.push(id);
				console.log(this.retId);
			})
        });
	}
	

    calcSize(w, h) {
        console.log(w, h);
        let bsw = 25,
            bsh = 100,
            offset = 10,
            rw,
            rh;
        rw = `calc(${bsw * w}% - ${offset}px)`;
        // rw = `${bsw * w}%`;
        // rh = `calc(${bsw * w}%)`;
        rh = `${bsh * h + (h - 1) * offset}px`;
        // rh = `${bsh * h}px`;
        return { width: rw, height: rh };
    }
}
