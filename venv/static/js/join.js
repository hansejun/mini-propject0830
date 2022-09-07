const id = document.getElementById("id");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const form = document.querySelector(".form-container__form");
const validId = document.querySelector(".valid-id");
const validPassword = document.querySelector(".valid-password");
let idLen = 0;

const handleChange = () => {
  idLen = id.value.length;
  if (idLen < 4) {
    validId.innerHTML = "아이디는 최소 4자 이상입니다.";
    id.focus();
  } else {
    validId.innerHTML = "";
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (password1.value !== password2.value) {
    validPassword.innerHTML = "비밀번호가 동일하지 않습니다.";
    password1.focus();
  }

  const formData = { id: id.value, password: password1.value };
  $.ajax({
    type: "POST",
    url: "/join",
    data: { formData },
    error: function (response) {
      validId.innerHTML = "이미 존재하는 아이디 입니다.";
      id.focus();
    },
    success: function (response) {
      location.href = "/log-in";
      alert("회원가입에 성공하였습니다.");
    },
  });
};

id.addEventListener("change", handleChange);
form.addEventListener("submit", handleSubmit);
