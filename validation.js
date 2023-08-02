function loginPage(form) {

var username = document.getElementById("userName").value;
var password = document.getElementById("passWord").value;

if (username === "115337" && password === "idk") 
         {
               window.location.replace("115337.html");
          } else if (username === "127667" && password === "bruh") {
               window.location.replace("127667.html");
          } else {
              alert("Please enter valid information");
              return;
          }
    }
