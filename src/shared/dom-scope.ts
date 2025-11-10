import {DIALOG_SCOPE_SELECTOR, MAIN_SCOPE_SELECTOR} from "../content/facebook/constants";

export function getMainScope(): HTMLElement | null {
    return document.querySelector(MAIN_SCOPE_SELECTOR);
}

export function getDialogScope(): HTMLElement | null {
    return document.querySelector(DIALOG_SCOPE_SELECTOR);
}
