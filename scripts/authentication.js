document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const identifier = document.getElementById("emailOrUsername").value;
      const password = document.getElementById("password").value;

      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        alert(result.message);
      }
    });
  }

  const registerForm = document.getElementById("regForm");
  if(registerForm){
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            email,
            username,
            password
          }
        ),
      });

      const result = await response.json();
      console.log(result);

      if(response.ok){
              alert(result.message);
        window.location.href = "/login"
      } else {
        alert(result.message)
      }
    })
  }
});
