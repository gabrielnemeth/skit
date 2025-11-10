export const ENABLE_KEY = "fbh_enabled";
export const MARK = "data-fbh-injected";
export const ALLOWED_HOSTS = new Set(["facebook.com", "www.facebook.com", "m.facebook.com"]);
export const MAIN_SCOPE_SELECTOR = "div[role='main']";
export const DIALOG_SCOPE_SELECTOR = "div[role='dialog']";
export const LINK_SELECTOR = "a[href^='https://www.facebook.com/']";
export const RESERVED_FIRST_SEGMENTS = new Set([
    "pages",
    "groups",
    "events",
    "watch",
    "marketplace",
    "gaming",
    "reel",
    "reels",
    "stories",
    "help",
    "legal",
    "privacy",
    "policies",
    "settings",
    "business",
    "ads",
    "plugins",
    "directory",
    "login",
    "logout",
    "home.php",
]);
