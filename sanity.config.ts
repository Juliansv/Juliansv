import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas"

const config = defineConfig({
    projectId: "61jam7ya",
    dataset: "production",
    title: "Portfolio personal",
    apiVersion: "2023-08-16",
    basePath: "/admin",
    plugins: [deskTool()],
    schema: { types: schemas }
})

export default config;