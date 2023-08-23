function loginPage(form) {

var username = document.getElementById("userName").value;
var password = document.getElementById("passWord").value;


     if (username === "115337" && password === "ONG") {
          window.location.replace("115337.html");
          return;
     }

     if (username === "127667" && password === "HEY") {
          window.location.replace("127667.html");
          return;
     }

     if (username === "abhijay" && password === "NAH") {
          window.location.replace("Dashboard.html");
          return;
     }
     
     alert("Please enter valid information");
     return;
}    

document.getElementById('enter')
    .addEventListener('keyup', function(event) {
        if (event.code === 'Enter')
        {
            event.preventDefault();
            document.querySelector('form').submit();
        }
    });
