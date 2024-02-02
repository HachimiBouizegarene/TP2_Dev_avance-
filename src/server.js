import Fastify from 'fastify'
import view from "@fastify/view"
import hbs from "handlebars"
import fs from "node:fs"
import { getData } from './api.js';

hbs.registerPartial('header', fs.readFileSync("src/templates/header.hbs", "utf-8"));
hbs.registerPartial('footer', fs.readFileSync("src/templates/footer.hbs", "utf-8"));

const data = await getData("https://gateway.marvel.com:443/v1/public/characters?limit=100")



const fastify = Fastify({
    logger: true
})

fastify.register(view, {
    engine : {
        handlebars : hbs
    }
})

fastify.get("/", (req, reply) => {
    console.log(data)
    reply.view("src/templates/index.hbs", { characters: data });
});

// Run the server!
try {
    await fastify.listen({ port: 3000 , host:"0.0.0.0"} , (err, address)=>{
        console.log(address)
    })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}