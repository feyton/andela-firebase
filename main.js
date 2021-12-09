// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7rdnDKUzQ6WJgceFUJ9U0KiixyW14a5A",
  authDomain: "blog-app-3fa1a.firebaseapp.com",
  projectId: "blog-app-3fa1a",
  storageBucket: "blog-app-3fa1a.appspot.com",
  messagingSenderId: "1064759561001",
  appId: "1:1064759561001:web:efe0680512c34ad044c538",
  databaseURL:
    "https://blog-app-3fa1a-default-rtdb.europe-west1.firebasedatabase.app",
};
var storyDiv = document.getElementById("story-div");
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = app.database();
// firebase.database().enablePersistence();
// db.enablePersistence();
console.log("Firebase Loaded");

// Working with database

const dbRef = db.ref();

// /Reading Data

dbRef
  .child("user-stories")
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      var stories = snapshot.val();
      console.log(Object.keys(stories));

      //   Adding chars to our list
      if (stories) {
        Object.keys(stories).forEach((key) => {
          var storyDiv = document.getElementById("story-div");
          storyDiv.innerHTML += `<li><span>${stories[key].name}:</span>&nbsp;<span>${stories[key].story}</span></li>`;
          console.log("Done");
        });
      } else {
        console.log("No data");
      }
    } else {
      storyDiv.innerHTML += `<li><span>${stories.name}:</span>&nbsp;<span>${stories.story}</span></li>`;
      console.log("Done");
    }
  })
  .catch((err) => {
    console.log(err);
  });

var writeUserStory = (name, age, story) => {
  db.ref("user-stories/").push({
    id: 5,
    name: name,
    age: age,
    story: story,
  });
};

$("#form-submit").click((e) => {
  e.preventDefault();
  //   var form = document.querySelector("form");
  var data = $("#blog-form").serializeArray();
  var name = data[0].value;
  var age = data[1].value;
  var story = data[2].value;

  console.log(name, age, story);
  writeUserStory(name, age, story);
  storyDiv.innerHTML += `<li><span>${name}:</span>&nbsp;<span>${story}</span></li>`;
  console.log("Done sending");
  $("#blog-form").trigger("reset");
});

// User Auth Change Monitoring
$(".btn-login").click(() => {
  $(".modal").toggle(200);
});

$(".close").click(() => {
  $(".modal").toggle(200);
});

const auth = firebase.auth();
async function getUser() {
  const user = await auth.currentUser;
  console.log("hello", user.displayName);
}
