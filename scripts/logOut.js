const logout = document.getElementById("logOutBtn");

logout.onclick = function () {
  if (confirm("Are you sure you want to log out?")) {
    fetch("/logout", { method: "GET", credentials: "include" })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } 
};
