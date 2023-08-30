const getResult = () => {
    let math = document.getElementById('math').value;
    let physics = document.getElementById('physics').value;
    let chemistry = document.getElementById('chemistry').value;
    let c = document.getElementById('cprogramming').value;
    let computer = document.getElementById('computer').value;

    if(document.getElementsByTagName('input').value==""){
        alert("Please Enter Some Value");
    }
    let total = parseFloat(math) + parseFloat(physics) + parseFloat(chemistry) + parseFloat(c) + parseFloat(computer);
    let percentage = (total * 100) / 500;

    if (percentage >= 90) {
        document.getElementById("grade").innerHTML = "A+";
    }
    else if (percentage >= 80 && percentage <= 89) {
        document.getElementById("grade").innerHTML = "A";

    }
    else if (percentage >= 75 && percentage <= 79) {
        document.getElementById("grade").innerHTML = "B+";

    }
    else if (percentage >= 70 && percentage <= 74) {
        document.getElementById("grade").innerHTML = "B";

    }
    else if (percentage >= 65 && percentage <= 69) {
        document.getElementById("grade").innerHTML = "C+";

    }
    else if (percentage >= 60 && percentage <=64) {
        document.getElementById("grade").innerHTML = "C";

    }
    else if (percentage >= 50 && percentage <= 59) {
        document.getElementById("grade").innerHTML = "D+";

    }
    else if (percentage >= 45 && percentage <= 49) {
        document.getElementById("grade").innerHTML = "D";
    }
        
    else {
        document.getElementById("grade").innerHTML = "You Failed";

    }


    document.getElementById('percentage').innerHTML = percentage;
    document.getElementById('total').innerHTML = total;
}
