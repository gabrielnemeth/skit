import {ALLOWED_HOSTS, RESERVED_FIRST_SEGMENTS} from "./constants";

export function parseHandle(href: string): string | null {
    let u: URL;
    try {
        u = new URL(href);
    } catch {
        return null;
    }
    if (!ALLOWED_HOSTS.has(u.hostname)) return null;

    // Explicit allowance for profile.php?id=...
    if (u.pathname === "/profile.php") {
        const id = u.searchParams.get("id");
        return id ? `id:${id}` : null;
    }

    // Normalize path segments; ignore empty ones (trailing slash, double slash)
    const parts = u.pathname.split("/").filter(Boolean);

    // Must be exactly one segment, e.g. /username
    if (parts.length !== 1) return null;

    const slug = parts[0];

    // Exclude known system roots and *.php slugs
    if (RESERVED_FIRST_SEGMENTS.has(slug) || slug.endsWith(".php")) return null;

    // reject slugs ending with "-123456..." (place/page ID pattern)
    if (/-\d{5,}$/.test(slug)) return null;

    // Accept username/page slug as the handle
    return slug;
}
