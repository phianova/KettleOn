export function absoluteUrl(path: string) {
    if (typeof window !== "undefined") return path;
    if (process.env.NEXT_PUBLIC_SERVER_URL) return `https://${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
    return `http://localhost:3000${path}`;
}