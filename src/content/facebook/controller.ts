import {rafIdle} from "@/shared/dom";
import {cleanupBadges} from "./badge";
import {observeDom, observeSpa, Disposer} from "./observe";
import {scan} from "./scan";
import {getDialogScope, getMainScope} from "@/shared/dom-scope";

export class Controller {
    private connected = false;
    private disposers: Disposer[] = [];
    private pending = false;

    connect() {
        if (this.connected) return;
        this.connected = true;
        this.scanScopes();

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
            this.scanScopes();
        });
    }

    private scanScopes() {
        const main = getMainScope();
        const dialog = getDialogScope();
        if (!main) return;
        scan(main);
        if (dialog) scan(dialog);
    }
}
