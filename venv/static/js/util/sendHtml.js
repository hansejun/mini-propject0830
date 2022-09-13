export const addElement = (data, views, start, end) => {
  window.scrollTo(0, 0);
  $(".video-grid").empty();
  const newData = data.slice(start, end);

  newData.map((item, idx) => {
    const {
      id,
      snippet: {
        channelTitle,
        title,
        publishedAt,
        thumbnails: { medium },
      },
    } = item;

    const {
      statistics: { viewCount },
    } = views[idx];

    const handleClick = (e) => {
      const userId = localStorage.getItem("user");
      if (!userId) alert("로그인이 필요합니다.");
      if (userId) {
        const formData = {
          id,
          title,
          channelTitle,
          viewCount,
          url: medium.url,
          userId,
        };

        $.ajax({
          type: "POST",
          url: "/api/fav",
          data: { formData },
          error: function (response) {
            alert("목록 추가에 실패하였습니다.");
          },
          success: function (response) {
            alert("목록에 추가하였습니다.");
          },
        });
      }
    };
    $(".video-grid").append(`
     <div class="video-grid__item">
      <a  class="video-nav" href="https://youtu.be/${id}" >
       <div class="video-grid__item-img" style="background-image:url('${
         medium.url
       }')"><div class="video-opacity" /></div>
       </a>
       <button class="fav-btn" id="${idx}"><i class="far fa-heart"></i></button>
       <div class="video-grid__item-info">
         <h2>${title}</h2>
         <div>
           <span>${channelTitle}</span>
           <span>${viewString(viewCount)}</span>
         </div>
       </div>
     </div>
     `);

    const favBtn = document.getElementById(idx);
    console.log(favBtn);
    favBtn.addEventListener("click", handleClick);
  });
};
export const addMyContentElement = (data, start, end) => {
  window.scrollTo(0, 0);
  $(".video-grid").empty();
  const newData = data.slice(start, end);

  newData.map((item, idx) => {
    const { urlId, title, channelTitle, viewCount, url } = item;

    const handleClick = (e) => {
      const userId = localStorage.getItem("user");
      if (!userId) alert("로그인이 필요합니다.");
      if (userId) {
        const formData = {
          title,
          userId,
        };
        $.ajax({
          type: "DELETE",
          url: "/api/fav",
          data: { formData },
          error: function (response) {
            alert("동영상 삭제에 실패하였습니다.");
          },
          success: function (response) {
            location.reload();
            alert("동영상을 삭제하였습니다.");
          },
        });
      }
    };

    $(".video-grid").append(`
     <div class="video-grid__item">
      <a  class="video-nav" href="https://youtu.be/${urlId}" >
       <div class="video-grid__item-img" style="background-image:url('${url}')"><div class="video-opacity" /></div>
       </a>
       <button class="fav-btn" id="${idx}"><i class="fas fa-trash-alt"></i></button>
       <div class="video-grid__item-info">
         <h2>${title}</h2>
         <div>
           <span>${channelTitle}</span>
           <span>${viewString(viewCount)}</span>
         </div>
       </div>
     </div>
     `);

    const favBtn = document.getElementById(idx);
    favBtn.addEventListener("click", handleClick);
  });
};
const viewString = (num) => {
  if (num < 1000) return `조회수 ${num}회`;
  else if (num >= 1000 && num < 10000)
    return `조회수 ${Math.floor(num / 1000)}.${Math.floor(
      (num % 1000) / 100
    )}천회`;
  else if (num > 10000 && num < 100000)
    return `조회수 ${Math.floor(num / 10000)}.${Math.floor(
      (num % 10000) / 1000
    )}만회`;
  else return `조회수 ${Math.floor(num / 10000)}만회`;
};
