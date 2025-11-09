import React from "react";

export default function useChromeToggle(key: string, fallback = false) {
    const [value, setValue] = React.useState<boolean>(fallback);
    const [loaded, setLoaded] = React.useState(false);
    const [savedFlash, setSavedFlash] = React.useState<null | "saved" | "error">(null);

    React.useEffect(() => {
        chrome.storage.local.get(key, res => {
            setValue(Boolean(res[key] ?? fallback));
            setLoaded(true);
        });
    }, [key, fallback]);

    const save = React.useCallback(
        async (next: boolean) => {
            try {
                await chrome.storage.local.set({[key]: next});
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
