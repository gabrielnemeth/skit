export default function Card({children}: {children: React.ReactNode}) {
    return (
        <div className="rounded-2xl bg-bg-subtle/90 border border-white/5 shadow-card p-4">
            {children}
        </div>
    );
}
