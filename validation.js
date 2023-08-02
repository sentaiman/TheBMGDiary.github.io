function auth(event) {
     event.preventDefault();
     
var username = document.getElementById("userName").value;
var password = document.getElementById("passWord").value;

if ( username == "root" && password == "root") {
    window.location.replace("115337.html");
}
else if( username == "username2" && password == "password2") {
    window.location.replace("127667.html");
}
else {
    // reject
     alert('no');
}
