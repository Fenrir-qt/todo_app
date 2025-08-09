function validateLoginForm() {
  let userIdentifier = document.forms["loginForm"]["emailOrUsername"].value.trim();
  let passInput = document.forms["loginForm"]["password"].value.trim();
  
  if (userIdentifier == "" && passInput == "") {
    alert("Please fill out the required fields");
    return false;
  }

  if (userIdentifier == "") {
    alert("Please enter your email or username");
    return false;
  }

  if (passInput == "") {
    alert("Please enter your password");
    return false;
  }
  return true;
}
