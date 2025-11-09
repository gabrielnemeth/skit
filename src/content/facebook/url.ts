import {BAD_PATH_PARTS, NON_PROFILE_SEGMENTS} from "./constants";

export function parseHandle(href: string): string | null {
    try {
        const u = new URL(href);
        if (u.hostname !== "www.facebook.com") return null;

        if (u.pathname === "/profile.php") {
            const id = u.searchParams.get("id");
            return id ? `id:${id}` : null;
        }

        const seg = u.pathname.split("/").filter(Boolean)[0];
        if (!seg || NON_PROFILE_SEGMENTS.has(seg) || seg.endsWith(".php")) return null;
        if (BAD_PATH_PARTS.some(p => u.pathname.includes(`/${p}/`))) return null;

        return seg;
    } catch {
        return null;
    }
}
