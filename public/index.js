const video = document.getElementById('video');
const imageBox = document.getElementById('imageBox');
const logo = document.getElementById('img');
const textBox = document.getElementById('title');
let flag = true;
let videoArr = [];
let index = 0;
window.onload = function () {
    getVideo();
}
video.addEventListener("pause", () => {
    flag = false;
})
video.addEventListener("play", () => {
    flag = true;
})
imageBox.addEventListener("click", () => {
    if (flag) {
        video.pause();
        changeStyle(true);
    } else {
        video.play();
        changeStyle(false);
    }
})
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 38) {
        // 触发上键
        if (index <= 0) {
            alert("已经到头了");
        } else {
            changeStyle(false);
            index--;
            video.src = videoArr[index].playurl;
            video.play();
        }

    } else if (e.keyCode == 40) {
        // 触发下键
        if (index <= 9) {
            changeStyle(false);
            index++;
            video.src = videoArr[index].playurl;
            video.play();
        } else {
            index = 0;
            getVideo();
        }
    } else if (e.keyCode == 32) {
        // 空格控制暂停和播放
        if (flag) {
            video.pause();
            changeStyle(true);
        } else {
            video.play();
            changeStyle(false);
        }
    }
})
// 控制样式函数
function changeStyle(flag) {
    if (flag) {
        logo.style.display = "block";
    } else {
        logo.style.display = "none";
    }
}
// 请求数据函数
function getVideo() {
    axios({
        method: 'get',
        url: 'https://api.apiopen.top/api/getMiniVideo?page=0&size=10',
    }).then((response) => {
        let newVideoList = response.data.result.list;
        videoArr = [...newVideoList];
        video.src = videoArr[index].playurl;
        video.play();
    }).catch((error) => {
        console.log('error', error)
    })
}