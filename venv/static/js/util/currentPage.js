// 해당 페이지에 빨간 밑줄을 쳐 표시하는 함수
export function currentPage(url) {
  if (url == "/") {
    document.title = "Home";
    $(".nav-left__home").css("box-shadow", "0 -3px 0px  red inset");
  } else if (url == "/music") {
    document.title = "Music";
    $(".nav-left__music").css("box-shadow", "0 -3px 0px  red inset");
  } else if (url == "/game") {
    document.title = "Game";
    $(".nav-left__game").css("box-shadow", "0 -3px 0px  red inset");
  } else if (url == "/sports") {
    document.title = "Sports";
    $(".nav-left__sports").css("box-shadow", "0 -3px 0px  red inset");
  }
}
