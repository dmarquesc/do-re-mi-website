document.addEventListener("DOMContentLoaded", function () {
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const splashVideo = document.getElementById("splash-video");

    // Onboarding elements
    let currentStep = 0;
    function showStep(step) {
        document.querySelectorAll(".onboarding-step").forEach((el, index) => {
            el.style.display = index === step ? "block" : "none";
        });
    }

    // When the video ends, fade out the splash screen and show content
    splashVideo.onended = function () {
        splashScreen.classList.add("fade-out");

        setTimeout(() => {
            splashScreen.style.display = "none";
            mainContent.classList.remove("hidden");
        }, 1000); // Match this timeout with CSS fade-out duration
    };

    // Show first onboarding step
    showStep(currentStep);

    // Next buttons for onboarding steps
    document.getElementById("next-step-1").addEventListener("click", function () {
        currentStep = 1;
        showStep(currentStep);
    });

    document.getElementById("next-step-2").addEventListener("click", function () {
        currentStep = 2;
        showStep(currentStep);
    });

    // Sign Up & Login Buttons
    const signUpBtn = document.getElementById("sign-up");
    const loginBtn = document.getElementById("log-in");

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    function hideOnboarding() {
        document.getElementById("onboarding").style.display = "none";
    }

    // Show register form when "Sign Up" is clicked
    signUpBtn.addEventListener("click", function () {
        hideOnboarding();
        registerForm.style.display = "flex";
        loginForm.style.display = "none";
    });

    // Show login form when "Log In" is clicked
    loginBtn.addEventListener("click", function () {
        hideOnboarding();
        loginForm.style.display = "flex";
        registerForm.style.display = "none";
    });

    // Toggle between Login and Register Forms
    document.getElementById("show-register").addEventListener("click", function (event) {
        event.preventDefault();
        registerForm.style.display = "flex";
        loginForm.style.display = "none";
    });

    document.getElementById("show-login").addEventListener("click", function (event) {
        event.preventDefault();
        loginForm.style.display = "flex";
        registerForm.style.display = "none";
    });

    // Hide forms initially
    loginForm.style.display = "none";
    registerForm.style.display = "none";
});

// Handle industry-based redirection after registration
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let selectedIndustry = document.getElementById("industry").value;
        let industryRedirects = {
            "music": "musicDashboard.html",
            "wedding": "weddingDashboard.html",
            "Videography/photography": "videophotoDashboard.html",
            "entertainment": "entertainmentHub.html"
        };

        if (industryRedirects[selectedIndustry]) {
            window.location.href = industryRedirects[selectedIndustry]; // Redirect to the correct page
        } else {
            this.submit(); // If not in the list, allow normal form submission
        }
    });
});
