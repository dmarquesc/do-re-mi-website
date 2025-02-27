document.addEventListener("DOMContentLoaded", () => {
    const profilePicWrapper = document.querySelector(".profile-pic-wrapper");
    const profilePic = document.getElementById("profilePic");
    const uploadInput = document.getElementById("uploadPic");
    const profileSettings = document.querySelector(".profile-settings");
    const uploadText = document.querySelector(".upload-text");

    // Toggle Settings Menu on Click
    profilePicWrapper.addEventListener("click", () => {
        profileSettings.classList.toggle("active");
    });

    // Open File Upload Dialog When Clicking Profile Picture
    profilePicWrapper.addEventListener("dblclick", () => {
        uploadInput.click();
    });

    // Upload and Display Selected Image
    uploadInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
                uploadText.style.display = "none"; // Hide placeholder text
            };
            reader.readAsDataURL(file);
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "Jy1mnvk6Yb3OmlkH6VnfCO95yOGGELCAi0pvq9QNsPFLz0u3fTTez1hh"; // 🔑 Replace with your Pexels API Key
    const FEED = document.getElementById("scrollFeed");
    let isLoading = false; // Prevents multiple API calls at once
    let page = 1; // Tracks API page number for fresh content

    // ✅ Function to check if the user is near the bottom of the feed
    function isAtBottom() {
        return FEED.scrollHeight - FEED.scrollTop <= FEED.clientHeight + 50; // Adjusted margin
    }

    // ✅ Function to load new videos from Pexels API
    async function loadMoreVideos() {
        if (isLoading) return; // Prevent multiple fetches
        isLoading = true; // Set loading state

        try {
            const response = await fetch("https://api.pexels.com/videos/search?query=videography&per_page=15", {
                headers: { Authorization: API_KEY }
            });

            if (!response.ok) throw new Error("Failed to fetch videos");
            const data = await response.json();

            // ✅ Ensure at least one video is available before appending
            if (data.videos.length === 0) {
                console.warn("No videos found.");
                return;
            }

            data.videos.forEach(video => {
                if (video.video_files.length > 0) {
                    const videoElement = document.createElement("video");
                    videoElement.classList.add("scroll-item");
                    videoElement.src = video.video_files[0].link; // First available video file
                    videoElement.controls = false;
                    videoElement.autoplay = true;
                    videoElement.loop = true;
                    videoElement.muted = true; // Ensures autoplay works on all browsers
                    videoElement.style.width = "100%";

                    // ✅ Play the video once it's loaded
                    videoElement.addEventListener("loadeddata", () => {
                        videoElement.play().catch(error => console.error("Autoplay failed:", error));
                    });

                    FEED.appendChild(videoElement);
                }
            });

            page++; // ✅ Move to the next page for fresh content

        } catch (error) {
            console.error("Error loading videos:", error);
        }

        isLoading = false; // Reset loading state
    }

    // ✅ Scroll event listener to trigger loading when at bottom
    FEED.addEventListener("scroll", () => {
        if (isAtBottom()) {
            loadMoreVideos();
        }
    });

    // ✅ Initial Load (Loads videos on page load)
    loadMoreVideos();
});

