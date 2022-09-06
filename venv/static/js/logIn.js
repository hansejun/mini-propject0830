const id = document.getElementById("id");
const password1 = document.getElementById("password1");
const btn = document.getElementById("createBtn");
const form = document.querySelector(".form-container__form");

const formData = { id: id.value, password: password1.value };

async function handleSubmit(event) {
  const response = await fetch("/log-in", {
    method: "POST",
    body: formData,
  });

  if (response.status == 200) {
    localStorage.setItem("user", id.value);
  }
}
form.addEventListener("submit", handleSubmit);
