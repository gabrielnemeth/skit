import {MARK} from "./constants";

export function looksLikeNameAnchor(a: HTMLAnchorElement): boolean {
    if (!a || a.hasAttribute(MARK)) return false;

    // common FB containers
    if (
        a.closest(
            '[data-ad-rendering-role="profile_name"], [data-ad-rendering-role="comment_author_name"]'
        )
    )
        return true;

    if (a.getAttribute("role") === "presentation" && a.getAttribute("tabindex") === "-1") return true;

    const txt = (a.textContent || "").trim();
    if (!txt || txt.length < 2) return false;
    if (/^https?:\/\//i.test(txt)) return false;
    if (!/[A-Za-zÀ-ž]/.test(txt)) return false;

    return true;
}
