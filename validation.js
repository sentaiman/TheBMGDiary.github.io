//Login Usernames and Passswords

function loginPage(form) {

var username = document.getElementById("userName").value;
var password = document.getElementById("passWord").value;

      if (username === "admin@gmail.com" && password === "ADMIN") {
          window.location.replace("Dashboard.html");
          return;
     }

     if (username === "115337" && password === "ONG") {
          window.location.replace("Dashboard.html");
          return;
     }

     if (username === "127667" && password === "HEY") {
          window.location.replace("Dashboard.html");
          return;
     }

     if (username === "abhijay" && password === "NAH") {
          window.location.replace("Dashboard.html");
          return;
     }

     if (username === "Arnav" && password === "pablo") {
          window.location.replace("Dashboard.html");
          return;
     }
      if (username === "panda bear" && password === "teddybear56") {
          window.location.replace("Dashboard.html");
          return;
     }
     
     alert("Please enter valid information");
     return;
}    

