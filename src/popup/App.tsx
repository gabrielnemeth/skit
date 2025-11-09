import Badge from "@/components/Badge";
import Card from "@/components/Card";
import Switch from "@/components/Switch";
import useChromeToggle from "@/hooks/useChromeToggle";
import "./App.css";

const KEY = "fbHandlesEnabled";

export default function App() {
    const {value: enabled, loaded, save, savedFlash} = useChromeToggle(KEY);

    return (
        <main className="min-w-[320px] max-w-[420px] p-4 bg-bg text-text select-none">
            <header className="mb-4 flex justify-between items-start">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold tracking-tight">Social Kit</h1>
                    <span className="text-[11px] text-text-muted">
                        v<span id="ver">{chrome.runtime.getManifest().version}</span>
                    </span>
                </div>
                <div className="text-[11px] text-text-muted">
                    {savedFlash === "saved" && <span className="text-brand-300">Saved ✓</span>}
                    {savedFlash === "error" && <span className="text-red-300">Save failed</span>}
                </div>
            </header>

            {/* Section: Facebook handles */}
            <Card>
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                        <span className="text-base font-bold">@</span>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-base font-semibold">
                                Facebook handles <Badge on={enabled} />
                            </h2>

                            <div className="ml-2">
                                <Switch
                                    checked={!!enabled}
                                    onChange={v => save(v)}
                                    label="Toggle Facebook handles"
                                />
                            </div>
                        </div>

                        <p className="mt-1 text-sm text-text-muted">
                            Display Facebook <span className="font-semibold">@handles</span> next to
                            names. Your setting is saved automatically.
                        </p>

                        {!loaded && <div className="mt-3 text-xs text-text-muted/70">Loading…</div>}
                    </div>
                </div>
            </Card>
        </main>
    );
}
