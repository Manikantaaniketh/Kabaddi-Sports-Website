// Load YouTube API
let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

let players = [];

function onYouTubeIframeAPIReady() {
    document.querySelectorAll(".video-wrapper iframe").forEach((iframe, i) => {
        players[i] = new YT.Player(iframe, {
            events: {
                onReady: (e) => {
                    const card = iframe.closest(".video-card");

                    card.addEventListener("mouseenter", () => {
                        e.target.mute();
                        e.target.playVideo();
                    });

                    card.addEventListener("mouseleave", () => {
                        e.target.pauseVideo();
                    });
                }
            }
        });
    });
}
