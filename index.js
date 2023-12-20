const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const app = express();
const port = 3000;

const mockData_path = __dirname + "/mock_data/mockup.json";
const image_path = __dirname + "/public/images/";

let post_list = [];
let post_obj;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res) => {
  loadMockDataFromJson(mockData_path);
  res.render("index", {
    blog_list: post_list,
  });
});

app.get("/manage", (req, res) => {
  loadMockDataFromJson(mockData_path);
  res.render("manage", {
    blog_list: post_list,
  });
});

app.post("/add", (req, res) => {
  loadMockDataFromJson(mockData_path);
  let temp_list = [];

  const { image } = req.files;

  if (!image) return res
    .status(400)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
  if (!image.mimetype.startsWith("image")) return res
    .status(400)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");

  image.mv(image_path + image.name);

  for (let i in post_obj) {
    temp_list.push({
      postImage: post_obj[i].postImage,
      postDate: post_obj[i].postDate,
      postTitle: post_obj[i].postTitle,
      postContent: post_obj[i].postContent,
      contentSize: post_obj[i].contentSize,
      contentIndex: post_obj[i].contentIndex,
      blogID: post_obj[i].blogID,
      isActive: post_obj[i].isActive,
    });
  }

  temp_list.push({
    postImage: image.name,
    postDate: req.body.postDate,
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    contentSize: req.body.postSize,
    contentIndex: parseInt(req.body.postIndex),
    blogID: generateBlogID(),
    isActive: 1,
  });

  let content = JSON.stringify(temp_list);

  fs.writeFile(mockData_path, content, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });

  res.redirect("/manage");
});

app.post("/edit", (req, res) => {
  let temp_list = [];

  for (let i in post_obj) {
    if (post_obj[i].blogID === req.body.blogID) {
      temp_list.push({
        postImage: post_obj[i].postImage,
        postDate: req.body.postDate,
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
        contentSize: req.body.postSize,
        contentIndex: req.body.postIndex,
        blogID: post_obj[i].blogID,
        isActive: post_obj[i].isActive,
      });
    } else {
      temp_list.push({
        postImage: post_obj[i].postImage,
        postDate: post_obj[i].postDate,
        postTitle: post_obj[i].postTitle,
        postContent: post_obj[i].postContent,
        contentSize: post_obj[i].contentSize,
        contentIndex: post_obj[i].contentIndex,
        blogID: post_obj[i].blogID,
        isActive: post_obj[i].isActive,
      });
    }
  }

  let content = JSON.stringify(temp_list);

  console.log(content);

  fs.writeFile(mockData_path, content, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });

  res.redirect("/manage");
});
app.post("/remove", (req, res) => {
  let temp_list = [];

  for (let i in post_obj) {
    if (post_obj[i].blogID === req.body.blogID) {
      temp_list.push({
        postImage: post_obj[i].postImage,
        postDate: post_obj[i].postDate,
        postTitle: post_obj[i].postTitle,
        postContent: post_obj[i].postContent,
        contentSize: post_obj[i].contentSize,
        contentIndex: post_obj[i].contentIndex,
        blogID: post_obj[i].blogID,
        isActive: 0,
      });
    } else {
      temp_list.push({
        postImage: post_obj[i].postImage,
        postDate: post_obj[i].postDate,
        postTitle: post_obj[i].postTitle,
        postContent: post_obj[i].postContent,
        contentSize: post_obj[i].contentSize,
        contentIndex: post_obj[i].contentIndex,
        blogID: post_obj[i].blogID,
        isActive: post_obj[i].isActive,
      });
    }
  }

  let content = JSON.stringify(temp_list);

  fs.writeFile(mockData_path, content, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });

  //let temp_list = post_obj.filter((x) => x.blogID === req.body.blogID);

  // fs.unlink(image_path + temp_list[0].postImage, (err) => {
  //   if (err) {
  //     console.log("An error occured while deleting File.");
  //     return console.log(err);
  //   }

  //   console.log("Delete File successfully.");
  // });

  res.redirect("/manage");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function loadMockDataFromJson(path) {
  let rawdata = fs.readFileSync(path);
  let content = JSON.parse(rawdata);

  let arrList = [];
  for (let i in content) {
    arrList.push([
      content[i].postImage,
      content[i].postDate,
      content[i].postTitle,
      content[i].postContent,
      content[i].contentSize,
      content[i].contentIndex,
      content[i].blogID,
      content[i].isActive,
    ]);
  }
  
  post_list = arrList;
  post_obj = content;
}

function generateBlogID() {
  const txtCode = "cb";
  const curr_numCode = parseInt(post_list[post_list.length - 1][6].slice(2));
  const genCode = txtCode + "00" + (curr_numCode + 1);
  return genCode;
}
