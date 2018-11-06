import {
    Component,
    OnInit,
    NgZone,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Renderer2
} from "@angular/core";
import * as Muuri from "muuri";

@Component({
    selector: "app-grid-demo",
    templateUrl: "./grid-demo.component.html",
    styleUrls: ["./grid-demo.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridDemoComponent implements OnInit {
    dashboardData: any[] = [];
    reportDataOne: any[] = [];
    reportDataTwo: any[] = [];
    reportDataFour: any[] = [];
    editGrid: Muuri;
    toolBoxGrids: Array<Muuri> = [];
    toolBox: any[] = [];
    nodeList: any[] = [];

    oneWidth = true;
    twoWidth = false;
    fourWidth = false;

    constructor(
        private zone: NgZone,
        private ref: ChangeDetectorRef,
        private render: Renderer2
    ) {
        this.dashboardData = this.generateData(50);
        this.reportDataOne = [
            { id: '6', title: 'Six', width: 1, height: 1, color: '#8a6d3b' },
            { id: '9', title: 'Nine', width: 1, height: 1, color: '#62cce0' },
            { id: '10', title: 'Ten', width: 1, height: 1, color: '#62cce0' }
        ];
        this.reportDataTwo = [
            { id: '1', title: 'One', width: 2, height: 2, color: '#62cce0' },
            { id: '3', title: 'Three', width: 2, height: 2, color: '#ff5e52' },
            { id: '4', title: 'Four', width: 2, height: 2, color: '#a94442' },
            { id: '8', title: 'Eight', width: 2, height: 2, color: '#f7456d' },
        ];
        this.reportDataFour = [
            { id: '2', title: 'Two', width: 4, height: 4, color: '#45b6f7' },
            { id: '7', title: 'Seven', width: 4, height: 4, color: '#7245f7' },
        ];
    }

    ngOnInit() {

        setTimeout(() => this.ref.markForCheck(), 1000);

    }

    ngAfterViewInit(): void {
        this.toolBox = Array.from(document.querySelectorAll('.grid-toolbox'));
        this.nodeList = Array.from(document.querySelectorAll('[id^=rp-]'));
        console.log(this.toolBox);
        console.log(this.nodeList);
        //初始化编辑框
        this.gridEditInit();
        this.gridSelectInit();
        //初始化工具框
    }

    showSize(width: number) {
        switch (width) {
            case 1:
                this.oneWidth = true;
                this.twoWidth = false;
                this.fourWidth = false;
                break;
            case 2:
                this.oneWidth = false;
                this.twoWidth = true;
                this.fourWidth = false;
                break;
            case 4:
                this.oneWidth = false;
                this.twoWidth = false;
                this.fourWidth = true;
                break;
        }
        this.ref.detectChanges();
        // this.ref.markForCheck();
        this.toolBoxGrids.forEach(grid => grid.refreshItems());
    }


    gridEditInit() {
        this.editGrid = new Muuri(".grid-edit", {
            items: '.item',
            layout: {
                fillGaps: true,
                horizontal: false,
                alignRight: false,
                alignBottom: false,
                rounding: false
            },
            layoutDuration: 400,
            layoutEasing: "ease",
            // layoutOnInit:false,
            dragEnabled: true,
            dragSortInterval: 50,
            dragReleaseDuration: 400,
            dragReleseEasing: "ease",
            dragContainer: null,
            dragStartPredicate: (item, event) => {
                // Prevent first item from being dragged. 
                let id = item.getElement().id;
                let idReg = /^rp-\d+$/
                if (idReg.test(id)) {
                    return false;
                }
                // For other items use the default drag start predicate.
                return Muuri.ItemDrag.defaultStartPredicate(item, event);
            },
            dragSort: () => [this.editGrid]
        });
        this.editGrid.refreshItems().layout();
        /* this.editGrid.on("layoutEnd", (items) => {
        }); */
        this.editGrid.on('dragReleaseEnd', (item, event) => {
            /* item.getElement().style.width = '';
            item.getElement().style.height = ''; */
            this.editGrid.refreshItems().layout();
        })

        // this.editGrid.on('receive',(data) => { 
        //     console.log(data);
        //     data.item.getElement().style.position = 'absolute';
        // })

        /* this.editGrid.on('dragStart', (item, event) => {
            this.nodeList.forEach(itm => {
                itm.style.display = 'block';
            })
        }); */
    }

    gridSelectInit() {
        this.toolBoxGrids = this.toolBox.map((box) => {
            let grid = new Muuri(box, {
                items: '.grid-toolbox-item',
                dragEnabled: true,
                layoutDuration: 400,
                layoutEasing: 'ease',
                dragSortInterval: 50,
                dragReleaseDuration: 400,
                dragReleaseEasing: 'ease',
                dragContainer: null,
                dragSort: () => [this.editGrid]
            })
                .on('dragReleaseEnd', (item, event) => {
                    this.toolBoxGrids.forEach(grid => grid.refreshItems().layout());
                }) 
            return grid;
        })
    }

    saveLayout() {
        let ret = [];
        let items = this.editGrid.getItems();
        ret = items.reduce((pre, cur) => [...pre, cur.getElement().id], []);
        console.log(ret);
    }

    generateData(count) {
        let ret = [];
        for (let i = 0; i < count; i++) {
            ret.push({ id: `rp-${i}`, title: '', width: 1, height: 1, color: 'rgba(176, 226, 255,.5)' })
        }
        return ret;
    }


    calcSize(w, h, type?: string) {
        let bsw = 12.5,
            bsh = type ? 50 : 100,
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


    ngOnDestroy(): void {
        this.editGrid.destroy();
        this.toolBoxGrids.forEach((_) => _.destroy());
    }
}
