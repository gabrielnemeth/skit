import {qsa} from "@/shared/dom";
import {injectHandleBadge} from "./badge";
import {LINK_SELECTOR, MARK} from "./constants";
import {looksLikeNameAnchor} from "./guards";
import {parseHandle} from "./url";

export function injectIfEligible(el: Element) {
    if (!(el instanceof HTMLAnchorElement)) return;
    if (!looksLikeNameAnchor(el)) return;

    const handle = parseHandle(el.href);
    if (!handle) {
        el.setAttribute(MARK, "skip");
        return;
    }

    injectHandleBadge(el, handle);
}

export function scan(root: ParentNode) {
    qsa<HTMLAnchorElement>(root, LINK_SELECTOR).forEach(injectIfEligible);
}
