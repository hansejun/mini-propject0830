import { getPopular, getPopularViews } from "./api.js";
import { addElement } from "./util/sendHtml.js";
import { currentPage } from "./util/currentPage.js";
import { isLogin } from "./util/isLogIn.js";
// data를 슬라이스 할 인덱스 값
let start = 0;
let end = 20;

// 받아올 video 데이터와 조회수 데이터를 넣을 값
let data = [];
let views = [];

// 최대 페이지 수 : max는 data의 갯수 / 20의 올림이다. ex) data 갯수 = 50;  50/20 = 2.5 ; 2.5의 올림은 3.
let max = 0;

// 현재 페이지 : 하단의 페이지 이동 버튼을 클릭할 때마다 값이 변동한다.
let current = 1;

// 현재 url : "http://localhost:6070/sports"에 있을 경우 url의 값은 "/sports"이다.
const url = window.location.pathname;

// api.js 파일로부터 데이터를 가져오는 함수 / 버튼 생성 (createBtn) / 영상들 보여주기 (addElement) / if~는 url에 "index"가 들어가있다면 빨간줄 긋게 하기
async function getData() {
  data = await getPopular(url);
  views = await getPopularViews(url);

  max = Math.ceil(data.length / 20);
  createBtn(max);
  addElement(data, views, start, end);
  // currentPage(url)은 해당 페이지의 패스가 /라면 home에 빨간 표시, /music인 경우는 music에 빨간 표시를 하는 함수이다.
  currentPage(url);
}

// 33번째부터 57번째 줄까지는 prev / next 버튼 클릭시 이전 페이지와 다음페이지를 보여주게 하는 코드이다.
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

prevBtn.addEventListener("click", () => {
  if (start != 0) {
    currentBtn();
    start -= 20;
    end -= 20;
    current--;
    currentBtn();
    addElement(data, views, start, end);
  }
});

nextBtn.addEventListener("click", () => {
  if (end != max * 20) {
    currentBtn();
    start += 20;
    end += 20;
    current++;
    currentBtn();
    addElement(data, views, start, end);
  }
});

isLogin();
// 처음 페이지를 열었을 때 데이터를 가져오도록 하는 함수를 실행
getData();

// 페이지를 이동할 수 있는 숫자 버튼을 생성하는 함수 / 숫자 클릭시 addElement()를 실행 / addElement()는 화면상에 동영상을 뿌려주는 함수이다.
function createBtn(num) {
  let buttonText = Array(num)
    .fill(1)
    .map((item, index) => item + index);
  buttonText.map((item) => {
    $(".change-page__buttons").append(
      `<button value="${item}" class="change-page__buttons-btn${item}">${item}</button>`
    );
    // 숫자 버튼마다 이벤트 등록
    $(`.change-page__buttons-btn${item}`).click((event) => {
      let number = event.target.value;
      start = 20 * (number - 1);
      end = 20 * number;
      currentBtn();
      current = number;
      currentBtn();
      addElement(data, views, start, end);
    });
  });
  currentBtn();
}
// 현재 위치한 동영상 페이지 번호를 검은색으로 바꿔주는 함수
function currentBtn() {
  const btn = document.querySelector(`.change-page__buttons-btn${current}`);
  btn.classList.toggle("focus");
}
