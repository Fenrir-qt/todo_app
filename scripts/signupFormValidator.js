function validateSignUpForm(){
    let emailInput = document.forms["regForm"]["email"].value.trim();
    let usernameInput = document.forms["regForm"]["username"].value.trim();
    let passwordInput = document.forms["regForm"]["password"].value.trim();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput == "" && usernameInput == "" && passwordInput == ""){
        alert("Please fill out all fields.")
        return false;
    }

    if(!emailRegex.test(emailInput)){
        alert("Please enter a valid email address.")
        return false;
    }

    if (emailInput == ""){
        alert("Please enter an email.")
        return false;
    }

    if (usernameInput == ""){
        alert("Please enter a username.")
        return false;
    }

    if(passwordInput == ""){
        alert("Please enter a password.")
        return false;
    }
    return true;
}