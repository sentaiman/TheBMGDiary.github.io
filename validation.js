function loginPage(form) {

var username = document.getElementById("userName").value;
var password = document.getElementById("passWord").value;

if (username === "admin@gmail.com" && password === "user") 
         {
               window.location.replace("115337.html");
          } else if (username === "" && password === "") {
               alert("Please enter information");
          } else {
              alert("Please enter valid information");
              return;
          }
    }
