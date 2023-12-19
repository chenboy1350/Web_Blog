const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", {
      blog_list: post_list,
    });
});

app.get("/manage", (req, res) => {
    res.render("manage", {
      blog_list: post_list,
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const post_list = [
  [
    "images/meme1.png",
    "January 1, 2023",
    "I cut my hair cause You didn't care my heart..",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!",
    "lg",
    1,
    "cb001",
  ],
  [
    "images/meme2.png",
    "January 2, 2023",
    "When my girlfriend asks me what's wrong with me, but I cutting onion.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.",
    "sm",
    1,
    "cb002",
  ],
  [
    "images/meme3.png",
    "January 3, 2023",
    "My girlfriend was sulking with me for 3 days, but I was sulking with her for only 3 minutes. It's not fair!",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.",
    "sm",
    2,
    "cb003",
  ],
  [
    "images/meme4.png",
    "January 4, 2023",
    "Thanks for vegetarian dude, but don't have to later.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.",
    "sm",
    3,
    "cb004",
  ],
  [
    "images/meme5.png",
    "January 5, 2023",
    "Sugar kitten is becoming popular in Thailand",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.",
    "sm",
    4,
    "cb005",
  ],
];
