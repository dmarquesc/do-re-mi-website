document.querySelectorAll(".knob").forEach(knob => {
    let angle = 0;
    knob.addEventListener("wheel", event => {
        angle += event.deltaY > 0 ? -5 : 5;
        knob.style.transform = `rotate(${angle}deg)`;
    });
});

document.querySelectorAll(".fader").forEach(fader => {
    fader.addEventListener("input", event => {
        let value = event.target.value;
        event.target.style.background = `linear-gradient(to top, cyan ${value}%, #444 ${value}%)`;
    });
});

document.querySelectorAll(".transport button").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.add("active");
        setTimeout(() => button.classList.remove("active"), 200);
    });
});

document.querySelector(".vibe-button").addEventListener("click", () => {
    alert("V.I.B.E. Circuit Activated!");
});
