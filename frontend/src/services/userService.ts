import type { User } from "../types/components";

// * Api Url
const BASE_URL = "http://localhost:8080/api/users";

// Define the Pageable Metadata structure
export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface UserPageResponse {
    content: User[]; // The array of users
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}

/**
 * Fetches a paginated list of users from the Spring Boot API.
 * @param page The requested page number (0-indexed).
 * @param size The number of items per page.
 * @param sort The sorting criteria (e.g., 'username,asc').
 * @returns A promise that resolves to the structured UserPageResponse.
 * @returns A promise that resolves to an array of User objects.
 * @throws An error if the network request fails or the response status is not OK.
 */

export async function fetchAllUsers(
    page: number = 0,
    size: number = 10,
    sort: string = "id,asc"
): Promise<UserPageResponse> {
    const url = new URL(BASE_URL);

    url.searchParams.append("page", page.toString());
    url.searchParams.append("size", size.toString());
    url.searchParams.append("sort", sort);

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            // Throw an error with details from the API response if possible
            const errorBody = await response.json();
            throw new Error(
                `HTTP Error ${response.status}: ${errorBody.message || "Unknown error"}`
            );
        }

        // Cast the parsed JSON response to our defined interface
        const data: UserPageResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error during user fetch:", error);
        // Throw a specific error or return a default response for the UI layer
        throw error;
    }
}
