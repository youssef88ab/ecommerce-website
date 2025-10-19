import type { User } from "../types/components";

// * Api Url 
const apiUrl = 'http://localhost:8080/api/users';

/**
 * Fetches all users from the backend API.
 * @returns A promise that resolves to an array of User objects.
 * @throws An error if the network request fails or the response status is not OK.
 */
export async function fetchAllUsers(): Promise<User[]> {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // Throwing an error ensures the calling component can catch it
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // The response data is typed as User[] before being returned
        const data: User[] = await response.json();
        return data;
    } catch (error) {
        // Log the error for debugging and re-throw a clearer message
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch user data.");
    }
}