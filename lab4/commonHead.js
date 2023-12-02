document.addEventListener("DOMContentLoaded", function () {
    const greetings = ["Привет!", "Здравствуйте!", "Добро пожаловать!"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    console.log(randomGreeting);
});