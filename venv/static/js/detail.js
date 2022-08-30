import { getVideo } from "./api.js";

var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
script.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);

const videoId = window.location.href.slice(48);

async function getvid(id) {
  if (id) {
    localStorage.setItem("videoId", videoId);
  }
  let localId = localStorage.getItem("videoId");

  // video-detail.html에 들어갈 때 전달된 videoId 값이 없다면 기존에 저장된 localId를 사용한다.
  let video = await getVideo(id || localId);

  const { channelTitle, description, tags, title } = video[0].snippet;

  $(".row.tm-mb-90").append(`
  <div class="col-xl-8 col-lg-7 col-md-6 col-sm-12">
  <iframe
    id="tm-video"
    src="https://www.youtube.com/embed/${videoId || localId}"
    title="${title}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>

</div>
<div class="col-xl-4 col-lg-5 col-md-6 col-sm-12">
  <div class="tm-bg-gray tm-video-details">
   <div class="detail-info_title">
       <h3>${title}</h3>
       <p class="mb-4">
       ${description}
        <a
          href="https://paypal.me/templatemo"
          target="_parent"
          rel="sponsored"
          >a small donation</a
        >
        via PayPal.
      </p>
    </div>
   
    
    <div class="detail-info">
      <div class="detail-info_format">
        <div>
          <span class="tm-text-gray-dark">Format: </span>
          <span class="tm-text-primary">MP4</span>
        </div>
        <div>
          <span class="tm-text-gray-dark">Duration: </span>
          <span class="tm-text-primary">00:00:20</span>
        </div>
      </div>
      <div class="text-center mb-5">
        <a href="#" class="btn btn-primary tm-btn-big">Watch</a>
      </div>
    </div>
    
  </div>
</div>
  `);
  // iframe의 width에 맞춰서 height을 변경해주는 기능

  const iFrame = document.getElementById("tm-video");
  let iFrameWidth = window.getComputedStyle(iFrame).width.slice(0, -2) * 1;
  $("#tm-video").height(iFrameWidth * 0.55);

  const changeHeight = () => {
    iFrameWidth = window.getComputedStyle(iFrame).width.slice(0, -2) * 1;
    $("#tm-video").height(iFrameWidth * 0.55);
  };
  console.log(iFrame.allow);
  window.addEventListener("resize", changeHeight);
}

getvid(videoId);
