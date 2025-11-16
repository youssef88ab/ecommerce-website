import type { User, UserPageResponse } from "../types/components";

// * Api Url
const BASE_URL = "http://localhost:8080/api/users";

/**
 * Fetches a paginated list of users from the Spring Boot API.
 * @param page The requested page number (0-indexed).
 * @param size The number of items per page.
 * @param sort The sorting criteria (e.g., 'username,asc').
 * @returns A promise that resolves to the structured UserPageResponse.
 * @throws An error if the network request fails or the response status is not OK.
 */

export async function fetchAllUsers(
    page: number = 0,
    size: number = 10,
    sort: string = "id,asc",
    gender: string ,
    role: string,
    searchTerm: string
): Promise<UserPageResponse> {
    const url = new URL(BASE_URL);

    url.searchParams.append("page", page.toString());
    url.searchParams.append("size", size.toString());
    url.searchParams.append("sort", sort);

    if (gender) {
        url.searchParams.append('gender', gender);
    }
    if (role) {
        url.searchParams.append('role', role); 
    }
    if (searchTerm) {
        url.searchParams.append('search', searchTerm); 
    }

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

/**
 * Get User by ID from backend API.
 * @param id the id of User.
 * @returns A promise that resolves to the structured UserPageResponse.
 * @throws An error if the network request fails or the response status is not OK.
 */

export async function getUserById(id: number) : Promise<User> {
    const url = `${BASE_URL}/${id}`;

    // * get Order from backend 
    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            // Throw an error with details from the api response if possible 
            const errorBody = await response.json();
            throw new Error(
                `HTTP ERROR ${response.status}: ${errorBody.message || "Unknown error"}`
            );
        }

        // Cast the parsed JSON response to our defined interface 
        const data: User = await response.json();
        return data;
    }

    catch (error) {
        console.error("Error during user fetch:", error);
        // Throw a specific error or return a default response for the UI layer
        throw error;
    }
}

/**
 * Get Count of users 
 * @param from the start date 
 * @param to the end date
 * @returns A number of counts 
 * @throws An error if the network request fails or the response status is not OK.
 */ 

export async function getUsersCount(
    from?: string , 
    to?: string
) : Promise<number> {
    const url = new URL(`${BASE_URL}/count`);

    if (from) url.searchParams.append("from", from);
    if (to) url.searchParams.append("to", to);

    try {
        const response = await fetch(url);

        if (!response.ok) {
             // Throw an error with details from the API response if possible
            const errorBody = await response.json();
            throw new Error(
                `HTTP Error ${response.status}: ${errorBody.message || "Unknown error"}`
            );
        }

        const data: number = await response.json(); 
        return data;
    }
    catch (error) {
        console.error("Error during user fetch:", error);
        // Throw a specific error or return a default response for the UI layer
        throw error;
    }
}

/** Get Count of users who orders 
 * @returns number of counts 
 * @throws An error if the network request fails or the response status is not OK.
 */

export async function getUsersWhOrdered() : Promise<number> {
    const url = new URL(`${BASE_URL}/users-who-ordered`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
             // Throw an error with details from the API response if possible
            const errorBody = await response.json();
            throw new Error(
                `HTTP Error ${response.status}: ${errorBody.message || "Unknown error"}`
            );
        }

        const data: number = await response.json(); 
        return data;
    }
    catch (error) {
        console.error("Error during user fetch:", error);
        // Throw a specific error or return a default response for the UI layer
        throw error;
    }
}

/** Get Totalspent of user by is 
 * @param id id of user 
 * @returns total spent of user 
 * @throws An error if the network request fails or the response status is not OK.
 */

export async function getTotalSpentByUserid(id: number) : Promise<number> {
    const url = new URL(`${BASE_URL}/totalspent/${id}`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
             // Throw an error with details from the API response if possible
            const errorBody = await response.json();
            throw new Error(
                `HTTP Error ${response.status}: ${errorBody.message || "Unknown error"}`
            );
        }

        const data: number = await response.json(); 
        return data;
    }
    catch (error) {
        console.error("Error during user fetch:", error);
        // Throw a specific error or return a default response for the UI layer
        throw error;
    }
}