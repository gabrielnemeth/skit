import {injectIfEligible} from "./scan";

export type Disposer = () => void;

// Observe DOM mutations, e.g. on user scrolling or content loading
export function observeDom(onChange: () => void): Disposer {
    const mo = new MutationObserver(muts => {
        let heavy = false;
        for (const m of muts) {
            if (m.type === "childList") {
                for (const n of m.addedNodes) {
                    if (n instanceof Element) {
                        if (n.matches && n.matches('a[href^="https://www.facebook.com/"]'))
                            injectIfEligible(n);
                        else heavy = true;
                    }
                }
            } else if (m.type === "attributes") {
                const t = m.target;
                if (t instanceof Element && t.matches('a[href^="https://www.facebook.com/"]'))
                    injectIfEligible(t);
            }
        }
        if (heavy) onChange();
    });

    mo.observe(document.body, {
        childList: true,
        subtree: true,
        attributeFilter: ["href", "role", "tabindex"],
    });
    return () => mo.disconnect();
}

// Observe SPA navigation by monkey-patching history API and listening to popstate
export function observeSpa(onUrlChange: () => void): Disposer {
    let last = location.href;
    const check = () => {
        if (location.href !== last) {
            last = location.href;
            onUrlChange();
        }
    };

    const pop = () => onUrlChange();
    window.addEventListener("popstate", pop);

    const push = history.pushState;
    history.pushState = function (...args) {
        const r = push.apply(this, args as any);
        onUrlChange();
        return r;
    };

    const timer = setInterval(check, 1000);

    return () => {
        window.removeEventListener("popstate", pop);
        history.pushState = push;
        clearInterval(timer);
    };
}
