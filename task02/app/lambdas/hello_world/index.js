export const handler = async (event) => {
    console.log("Hello from Lambda");

    // Extract the request path and HTTP method
    const path = event.rawPath || event.path;
    const method = event.requestContext?.http?.method || event.httpMethod;

    // Handle /hello GET request
    if (path === "/hello" && method === "GET") {
        return createSuccessResponse();
    }

    // Handle all other requests with a 400 Bad Request error
    return createErrorResponse(`Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`);
};

// Success Response (200 OK)
const createSuccessResponse = () => ({
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        statusCode: 200,
        message: "Hello from Lambda",
    }),
});

// Error Response (400 Bad Request)
const createErrorResponse = (message) => ({
    statusCode: 400,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        statusCode: 400,
        message: message,
    }),
});
