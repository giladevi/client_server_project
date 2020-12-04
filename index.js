function validateEmail(){
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(document.getElementById("user").value.match(mailformat)){
        return true;
    }
    else{
        alert("You have entered an invalid email address!: email must be for example 'name@domain.com'");
        return false;
    }
}

// yasatum1
const rules="password must include: Minimum 6 Characters , an Uppercase Character , Lowercase Character , a Number and a Special Character (!, @, #, etc.)."

function checkPassword(){ 
    console.log("works");
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    if(document.getElementById("password").value.match(decimal)) 
        return true;
    else{ 
        alert(rules);
        return false;
    }
} 


function validatePassword(){
    if(document.getElementById("password").value == document.getElementById("confirmation").value)
        return true;
    else{
        alert("Passwords doesnt match");
        return false;
    } 
}


function checkValidation(){
    if( validateEmail() && checkPassword() )
        alert(document.getElementById("user").value + "\n" + document.getElementById("password").value);

}


function checkSignUpValidation(){
    if(validateEmail() && checkPassword() && validatePassword())
        alert(document.getElementById("user").value + "\n" + document.getElementById("password").value);
}


function contactValidation(){
    var name,mail,concerning,subject;
    name=document.getElementById("name").value;
    mail=document.getElementById("user").value;
    concerning=document.getElementById("concerning") .value;
    subject=document.getElementById("contactSubject").value;

    if( name != "" && validateEmail() && subject != "" && concerning != "")
        alert(name+"\n"+mail+"\n"+concerning+"\n"+subject);
    else
        alert("please fill all the mandatory fields!");
}

function sendMail() {
    var link = "mailto:yourmama@gmail.com";
    window.location.href = link;
}

