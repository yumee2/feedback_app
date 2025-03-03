const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API documentation for my feedback app",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
        ],
    },
    apis: ["./src/users/*.ts", "./src/upvotes/*.ts", "./src/boards/*.ts", "./src/feedback-posts/*.ts"], // Adjust this path based on your project structure
};
export default swaggerOptions;
