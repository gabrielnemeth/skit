import {qsa} from "@/shared/dom";
import {MARK} from "./constants";
import {parseHandle} from "./url";
import {looksLikePersonNameAnchor} from "./guards";
import {injectHandleBadge} from "./badge";

const FB_LINK_SEL = 'a[href^="https://www.facebook.com/"]';

export function injectIfEligible(a: Element) {
    if (!(a instanceof HTMLAnchorElement)) return;
    if (!looksLikePersonNameAnchor(a)) return;

    const handle = parseHandle(a.href);
    if (!handle) {
        // mark as skip to avoid re-checking
        a.setAttribute(MARK, "skip");
        return;
    }

    injectHandleBadge(a, handle);
}

export function scan(root: ParentNode) {
    qsa<HTMLAnchorElement>(root, FB_LINK_SEL).forEach(injectIfEligible);
}
