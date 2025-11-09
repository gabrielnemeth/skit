export default function Switch({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={[
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none",
                checked ? "bg-brand-500 hover:bg-brand-600" : "bg-white/10 hover:bg-white/20",
                "ring-1 ring-inset ring-black/10 focus-visible:ring-2 focus-visible:ring-brand-500",
            ].join(" ")}
        >
            <span
                className={[
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
                    checked ? "translate-x-5" : "translate-x-1",
                ].join(" ")}
            />
        </button>
    );
}
