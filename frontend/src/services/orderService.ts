import type { OrderPageResponse } from "../types/components";

// * Api Url
const BASE_URL = "http://localhost:8080/api/orders";

/**
 * Fetches a paginated list of orders from the Spring Boot API.
 * @param page The requested page number (0-indexed).
 * @param size The number of items per page.
 * @param sort The sorting criteria (e.g., 'username,asc').
 * @returns A promise that resolves to the structured UserPageResponse.
 * @throws An error if the network request fails or the response status is not OK.
 */

export async function fetchAllOrders(
    page: number = 0,
    size: number = 10,
    sort: string = "id,asc",
    status: string ,
    paymentMethod: string, 
    searchTerm: string
): Promise<OrderPageResponse> {
    const url = new URL(BASE_URL);

    url.searchParams.append("page", page.toString());
    url.searchParams.append("size", size.toString());
    url.searchParams.append("sort", sort);

    if (status) {
        url.searchParams.append('status', status);
    }
    if (paymentMethod) {
        url.searchParams.append('paymentMethod' , paymentMethod);
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
        const data: OrderPageResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error during user fetch:", error);
        // Throw a specific error or return a default response for the UI layer
        throw error;
    }
}

export async function getOrdersCount() {

    const url = BASE_URL + "/count" ; 

    try {
        const response = await fetch(url);

        if (!response.ok) {
             // Throw an error with details from the API response if possible
            const errorBody = await response.json();
            throw new Error(
                `HTTP Error ${response.status}: ${errorBody.message || "Unknown error"}`
            );
        }

        const length: number = await response.json(); 
        console.log("Length : " + length);
        return length;
    }
    catch (error) {
        console.error("Error during user fetch:", error);
        // Throw a specific error or return a default response for the UI layer
        throw error;
    }
}