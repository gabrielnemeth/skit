import {qsa} from "@/shared/dom";
import {MARK} from "./constants";
import {parseHandle} from "./url";
import {looksLikeNameAnchor} from "./guards";
import {injectHandleBadge} from "./badge";

const FB_LINK_SEL = 'a[href^="https://www.facebook.com/"]';

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
    qsa<HTMLAnchorElement>(root, FB_LINK_SEL).forEach(injectIfEligible);
}
