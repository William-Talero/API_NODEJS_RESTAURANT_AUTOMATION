import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ChatGPT API",
      version: "1.0.0",
      description: "ChatGPT API",
    },
    servers: [
      {
        url: process.env.URL,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app: any, port: any) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(specs));
  app.get("/api-docs.json", (req: any, res: any) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
  console.log(`Swagger initialized on port ${port}`);
};

export default swaggerDocs;
