document.addEventListener("DOMContentLoaded", function () {
    // Onboarding steps
    const onboardingSteps = document.querySelectorAll(".onboarding-step");
    let currentStep = 0;

    function showStep(stepIndex) {
        onboardingSteps.forEach((step, index) => {
            step.style.display = index === stepIndex ? "block" : "none";
        });
    }

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
