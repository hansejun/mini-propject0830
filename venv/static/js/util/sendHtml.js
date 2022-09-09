export const addElement = (data, views, start, end) => {
  // 스크롤을 맨 위로 올려보내는 코드
  window.scrollTo(0, 0);
  // .video-grid안을 비워버리는 코드
  $(".video-grid").empty();
  // 초기에 받아온 data에서 start부터 end까지 잘라와 newData 변수에 할당
  const newData = data.slice(start, end);
  // 화면에 동영상을 .video-grid 안에 append
  newData.map((item, idx) => {
    // video로부터 id ,channelTitle, title, publishedAt, medium( thumbnail.medium )을 추출
    const {
      id,
      snippet: {
        channelTitle,
        title,
        publishedAt,
        thumbnails: { medium },
      },
    } = item;
    // viewCount를 추출하기
    const {
      statistics: { viewCount },
    } = views[idx];

    $(".video-grid").append(`
     <div class="video-grid__item">
      <a  class="video-nav" href="">
       <div class="video-grid__item-img" style="background-image:url('${
         medium.url
       }')"></div>
       <button>⭐️</button>
       </a>
       <div class="video-grid__item-info">
         <h2>${title}</h2>
         <div>
           <span>${channelTitle}</span>
           <span>${viewString(viewCount)}</span>
         </div>
       </div>
     </div>
     `);
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
