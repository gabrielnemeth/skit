import {MARK} from "./constants";

const injectBadgeStyle = (() => {
    let added = false;
    return () => {
        if (added) return;
        added = true;
        const style = document.createElement("style");
        style.textContent = `
      .fbh_handle {
        font-size: .85em;
        opacity: .75;
      }
    `;
        document.documentElement.appendChild(style);
    };
})();

export function injectHandleBadge(a: HTMLAnchorElement, handle: string) {
    injectBadgeStyle();
    const badge = document.createElement("span");
    badge.className = "fbh_handle";
    badge.textContent = ` (@${handle})`;
    a.after(badge);
    // mark as injected so we don't re-process
    a.setAttribute(MARK, "1");
}

export function cleanupBadges() {
    document.querySelectorAll("span.fbh_handle").forEach(n => n.remove());
}
