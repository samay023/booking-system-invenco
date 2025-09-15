import serverlessExpress from "@codegenie/serverless-express";
import app from "./main";

const handler = serverlessExpress({ app });

export { handler };
