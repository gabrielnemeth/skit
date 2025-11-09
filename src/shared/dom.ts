export const qsa = <T extends Element>(root: ParentNode, sel: string) =>
    Array.from(root.querySelectorAll<T>(sel));

export const rafIdle = (cb: () => void) =>
    (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(cb)
        : requestAnimationFrame(() => cb());
