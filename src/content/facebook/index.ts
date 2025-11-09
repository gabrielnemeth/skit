import {Controller} from "./controller";
import {ENABLE_KEY} from "./constants";
import {getSync, onSyncChanged} from "@/shared/storage";

const ctrl = new Controller();

async function applySetting(enabled: boolean) {
    if (enabled) ctrl.connect();
    else ctrl.disconnect(true);
}

async function boot() {
    if (!chrome?.storage?.sync) {
        ctrl.connect();
        return;
    }

    const vals = await getSync({[ENABLE_KEY]: true as boolean});
    await applySetting(Boolean(vals[ENABLE_KEY]));
    onSyncChanged(ENABLE_KEY, v => applySetting(Boolean(v)));
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
} else {
    boot();
}
