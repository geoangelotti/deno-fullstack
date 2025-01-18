import { Hono } from "@hono/hono";
import data from './data.json' with { type: "json" };

const app = new Hono();
Deno.serve(app.fetch);

app.get("/", (c) => {
  return c.text("Welcome to the dinosaur world!");
});

app.get("/api/dinosaurs", (c) => {
	return c.json(data);
});

app.get("/api/dinosaurs/:dinosaur", (c) => {
	if (!c.req.param("dinosaur")) {
		return c.text("No dinosaur name provided.");
	}
	const dinosaur = data.find((d) => d.name.toLocaleLowerCase() === c.req.param("dinosaur").toLocaleLowerCase());
	return dinosaur ? c.json(dinosaur) : c.notFound();
});