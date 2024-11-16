// Capture the form and display elements
var resumeForm = document.getElementById("resume-form");
var resumeDisplay = document.getElementById("resume-display");
// Handle form submission
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Capture the user inputs
    var formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value.split(",").map(function (skill) { return skill.trim(); })
    };
    // Generate the resume display
    generateResume(formData);
});
// Function to generate and display the resume
function generateResume(data) {
    // Clear any previous resume content
    resumeDisplay.innerHTML = "";
    // Create and append resume sections dynamically
    var nameEl = document.createElement("h1");
    nameEl.innerText = data.name;
    var contactInfoEl = document.createElement("p");
    contactInfoEl.innerText = "Email: ".concat(data.email, " | Phone: ").concat(data.phone, " | Location: ").concat(data.location);
    var educationEl = document.createElement("h2");
    educationEl.innerText = "Education";
    var educationDetailsEl = document.createElement("p");
    educationDetailsEl.innerText = data.education;
    var experienceEl = document.createElement("h2");
    experienceEl.innerText = "Work Experience";
    var experienceDetailsEl = document.createElement("p");
    experienceDetailsEl.innerText = data.experience;
    var skillsEl = document.createElement("h2");
    skillsEl.innerText = "Skills";
    var skillsListEl = document.createElement("ul");
    skillsListEl.className = "skills-list";
    data.skills.forEach(function (skill) {
        var skillItemEl = document.createElement("li");
        skillItemEl.innerText = skill;
        skillsListEl.appendChild(skillItemEl);
    });
    // Append elements to the resume display container
    resumeDisplay.appendChild(nameEl);
    resumeDisplay.appendChild(contactInfoEl);
    resumeDisplay.appendChild(educationEl);
    resumeDisplay.appendChild(educationDetailsEl);
    resumeDisplay.appendChild(experienceEl);
    resumeDisplay.appendChild(experienceDetailsEl);
    resumeDisplay.appendChild(skillsEl);
    resumeDisplay.appendChild(skillsListEl);
    // Show the resume display
    resumeDisplay.style.display = "block";
}
