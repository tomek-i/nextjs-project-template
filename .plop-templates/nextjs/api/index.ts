export const api = {
  description: "⚛ nextjs api",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "API route",
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/app/api/{{pascalCase name}}/route.ts",
      templateFile: "./templates/route.hbs",
    },
    {
      type: "add",
      path: "src/app/api/{{pascalCase name}}/[{{pascalCase name}}Id]/route.ts",
      templateFile: "./templates/id.hbs",
    },
  ],
}
