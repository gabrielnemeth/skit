import React from "react";

export default function useChromeToggle(key: string, fallback = false) {
    const [value, setValue] = React.useState<boolean>(fallback);
    const [loaded, setLoaded] = React.useState(false);
    const [savedFlash, setSavedFlash] = React.useState<null | "saved" | "error">(null);

    React.useEffect(() => {
        if (!chrome?.storage) return;
        chrome.storage.sync.get(key, async syncRes => {
            if (syncRes[key] !== undefined) {
                setValue(Boolean(syncRes[key]));
                setLoaded(true);
                return;
            }
        });
    }, [key, fallback]);

    const save = React.useCallback(
        async (next: boolean) => {
            try {
                await chrome.storage.sync.set({[key]: next});
                setValue(next);
                setSavedFlash("saved");
                setTimeout(() => setSavedFlash(null), 1200);
            } catch {
                setSavedFlash("error");
                setTimeout(() => setSavedFlash(null), 1800);
            }
        },
        [key]
    );

    return {value, loaded, save, savedFlash};
}
