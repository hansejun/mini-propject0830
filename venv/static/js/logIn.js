const id = document.getElementById("id");
const password1 = document.getElementById("password1");
const btn = document.getElementById("createBtn");
const form = document.querySelector(".form-container__form");

async function handleSubmit(event) {
  event.preventDefault();
  const formData = { id: id.value, password: password1.value };

  $.ajax({
    type: "POST",
    url: "/log-in",
    data: { formData },
    error: function (response) {
      alert("아이디와 비밀번호를 확인해주세요.");
      location.href = "/log-in";
    },
    success: function (response) {
      localStorage.setItem("user", id.value);
      location.href = "/";
    },
  });
}
form.addEventListener("submit", handleSubmit);

/*
if (response.status == 200) {
  
}
*/
