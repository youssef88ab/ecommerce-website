export function showRole(role: string) {
    return role.split('_')[1];
}

export function showRegistrationDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}