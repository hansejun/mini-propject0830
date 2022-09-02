const API_KEY = "AIzaSyCWWcxidOOzDR8SbEofjAUVdp2u51YtXj0";

// 인기 영상을 가지고 오는 api
export async function getPopular() {
  let response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=100&regionCode=KR&key=${API_KEY}`
  );
  let json = await response.json();
  return json.items;
}

export async function getPopularViews() {
  let response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&chart=mostPopular&maxResults=100&regionCode=KR&key=${API_KEY}`
  );
  let json = await response.json();
  return json.items;
}

export async function getVideo(id) {
  let response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`
  );
  let json = await response.json();
  return json.items;
}
/*
  videoCategoryId=10&
*/
// sports = 17