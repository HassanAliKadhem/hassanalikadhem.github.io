let links = ["Home.html", "Resume.html", "Projects.html", "Contact.html"];

let current = window.location.href;
let navBar = document.createElement("nav");
navBar.innerHTML = `
<h1>
    <div>Hasan Kadhem</div>
    <div>
        <a class="${current.includes("index.html") || current.endsWith("/") ? "current" : ""}" href="index.html">Home</a>
        <a class="${current.includes("resume.html") ? "current" : ""}" href="resume.html">Resume</a>
        <a class="${current.includes("projects.html") ? "current" : ""}" href="projects.html">Projects</a>
        <a class="${current.includes("contact.html") ? "current" : ""}" href="contact.html">Contact</a>
    </div>
</h1>`;

document.body.prepend(navBar)