export default function Badge({on}: {on: boolean}) {
    return (
        <span
            className={[
                "ml-2 inline-flex items-center rounded-lg px-2 py-0.5 text-xs",
                on ? "bg-brand-500/15 text-brand-300" : "bg-white/5 text-text-muted",
            ].join(" ")}
        >
            {on ? "On" : "Off"}
        </span>
    );
}
