export function isLogin() {
  const user = localStorage.getItem("user");
  const logIn = document.querySelector(".log-in");
  const join = document.querySelector(".join");
  const logOut = document.querySelector(".log-out");
  if (user) {
    logIn.classList.add("none");
    join.classList.add("none");
    logOut.classList.remove("none");
  }
}
