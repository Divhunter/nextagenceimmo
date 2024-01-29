export function isValidaUrl(url) {
    const parsed = new URL(url)
    return ['https:', 'http:'].includes(parsed.protocol)
}