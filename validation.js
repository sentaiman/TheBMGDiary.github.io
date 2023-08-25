//Login Usernames and Passswords

function loginPage(form) {

var username = document.getElementById("userName").value;
var password = document.getElementById("passWord").value;

      if (username === "admin@gmail.com" && password === "ADMIN") {
          window.location.replace("Dashboard.html");
          return;
     }


     if (username === "STUDENT" && password === "STUDENT12345") {
          window.location.replace("Dashboard.html");
          return;
     }

     
     alert("Please enter valid information");
     return;
}    

