// Mandatory Lines ( line number 2 to 26 )
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
let methodOverride = require("method-override");

// To let express understand the sent data (urlencoded or json format)
app.use(express.urlencoded({ extended: true }));

// To set ejs as the templating object.
app.set("view engine", "ejs");
// To search the ejs files in views directory.
app.set("views", path.join(__dirname, "views"));

// To serve static files from the directory public.
app.use(express.static(path.join(__dirname, "public")));

// Used to override methods of form.
app.use(methodOverride("_method"));

// To accept client requests on port 8080
app.listen(port, (req, res) => {
  console.log("Server started! Listening to request on port 8080!");
});

// Data (Since we have not learnt database yet, we have created data in the form of an array!)
posts = [
  {
    id: uuidv4(),
    username: "Devomgarg",
    content: "Learning about RESTful APIs and creating them!!",
  },
];

// Creating RESTful APIs from here.

// First API: Home Route!
app.get("/posts", (req, res) => {
  res.render("all_posts.ejs", posts);
});

// Second API: Create New post. Step1: Serve the form
app.get("/posts/new", (req, res) => {
  res.render("new_post.ejs");
});
// Step2: Add user-entered data to posts array and redirect to the home route
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// Third API: Editing existing Post. Step1: Serve the editing form.
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit_post.ejs", { post });
}); 
// Step2: Redirect to home page with the changes reflecting in the original post.
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

// Fourth API: Deleting a post.
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
