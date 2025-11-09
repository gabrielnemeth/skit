export async function getSync<T extends Record<string, unknown>>(defaults: T): Promise<T> {
    return new Promise<T>(res => chrome.storage.sync.get(defaults, v => res(v as T)));
}

export async function setSync(patch: Record<string, unknown>) {
    return chrome.storage.sync.set(patch);
}

export function onSyncChanged<K extends string>(key: K, handler: (value: unknown) => void) {
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "sync" && changes[key]) handler(changes[key].newValue);
    });
}
