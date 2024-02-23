import express from "express";
import { createClient } from "@sanity/client";
import groq from "groq";
import { toHTML } from "@portabletext/to-html";
import { writeFile } from "fs";

const app = express();
const port = process.env.PORT || 8000;

const projectId = process.env.SANITY_PROJECT_ID;
const token = process.env.SANITY_TOKEN;
const dataset = process.env.SANITY_DATASET || "production";

const sanityClient = createClient({
   projectId,
   dataset,
   token,
   apiVersion: "2024-02-23",
   useCdn: false,
});

const getEcosystemPosts = async () => {
   return await sanityClient.fetch(groq`*[_type == "ecosystemPost"]`);
};

app.get("/newsletter", async (_, res) => {
   const posts = await getEcosystemPosts();
   const newestPostNews = posts[0].ecosystemNews;
   const htmlPostsArray = newestPostNews.map((post: any) => {
      return `<h2>${post.title}</h2>
         ${toHTML(post.overview)}
         <hr />`;
   });

   const htmlTitle = `<h1>Frontend Ecosystem Newsletter</h1>
   <br />`;
   htmlPostsArray.unshift(htmlTitle);

   const htmlPosts = htmlPostsArray.join("");

   writeFile("./preview.html", htmlPosts, (err) => {
      if (err) {
         return console.error("Error: " + err);
      }

      console.log("File saved!");
   });

   res.set("Content-Type", "text/html");
   res.send(htmlPosts);
});

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
