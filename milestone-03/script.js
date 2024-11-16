var resumeForm = document.getElementById("resume-form");
var resumeDisplay = document.getElementById("resume-display");
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value.split(",").map(function (skill) { return skill.trim(); })
    };
    generateResume(formData);
});
function generateResume(data) {
    resumeDisplay.innerHTML = "";
    // Create and append editable resume sections
    var nameEl = createEditableElement("h1", data.name, function (newValue) { return data.name = newValue; });
    var contactInfoEl = createEditableElement("p", "Email: ".concat(data.email, " | Phone: ").concat(data.phone, " | Location: ").concat(data.location), function (newValue) {
        var parts = newValue.split(" | ");
        data.email = parts[0].replace("Email: ", "").trim();
        data.phone = parts[1].replace("Phone: ", "").trim();
        data.location = parts[2].replace("Location: ", "").trim();
    });
    var educationEl = createEditableElement("h2", "Education");
    var educationDetailsEl = createEditableElement("p", data.education, function (newValue) { return data.education = newValue; });
    var experienceEl = createEditableElement("h2", "Work Experience");
    var experienceDetailsEl = createEditableElement("p", data.experience, function (newValue) { return data.experience = newValue; });
    var skillsEl = createEditableElement("h2", "Skills");
    var skillsListEl = document.createElement("ul");
    skillsListEl.className = "skills-list";
    data.skills.forEach(function (skill, index) {
        var skillItemEl = createEditableElement("li", skill, function (newValue) { return data.skills[index] = newValue; });
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
    resumeDisplay.style.display = "block";
}
// Helper function to create editable elements
function createEditableElement(tag, text, onChange) {
    var element = document.createElement(tag);
    element.innerText = text;
    element.contentEditable = "true";
    element.className = "editable";
    element.addEventListener("blur", function () {
        if (onChange) {
            onChange(element.innerText);
        }
    });
    return element;
}
