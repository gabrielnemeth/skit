import {rafIdle} from "@/shared/dom";
import {cleanupBadges} from "./badge";
import {observeDom, observeSpa, Disposer} from "./observe";
import {scan} from "./scan";

export class Controller {
    private connected = false;
    private disposers: Disposer[] = [];
    private pending = false;

    connect() {
        if (this.connected) return;
        this.connected = true;

        // initial scan
        scan(document.body);

        // observers
        this.disposers.push(
            observeDom(() => this.scheduleScan()),
            observeSpa(() => this.scheduleScan())
        );
    }

    disconnect(clean = true) {
        if (!this.connected) return;
        this.disposers.forEach(d => d());
        this.disposers = [];
        this.connected = false;
        if (clean) cleanupBadges();
    }

    private scheduleScan() {
        if (this.pending) return;
        this.pending = true;
        rafIdle(() => {
            this.pending = false;
            scan(document.body);
        });
    }
}
