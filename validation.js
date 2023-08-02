function loginPage(form) {

var username = document.getElementById("userName").value;
var password = document.getElementById("passWord").value;
          
          
     if (username === "115337" && password === "yes") {
          window.location.replace("115337.html");
          return;
     }
     
     if (username === "127667" && password === "HEY") {
          window.location.replace("127667.html");
          return;
     }
     alert("Please enter valid information");
     return;
}    
