export function extractUsernameFromEmail(email: string): string {
    const atIndex = email.indexOf('@');
    return atIndex !== -1 ? email.slice(0, atIndex) : email;
}