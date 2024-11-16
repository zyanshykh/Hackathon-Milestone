interface ResumeData {
    name: string;
    email: string;
    phone: string;
    location: string;
    education: string;
    experience: string;
    skills: string[];
}

const resumeForm = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplay = document.getElementById("resume-display") as HTMLDivElement;

resumeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const formData: ResumeData = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value,
        location: (document.getElementById("location") as HTMLInputElement).value,
        education: (document.getElementById("education") as HTMLInputElement).value,
        experience: (document.getElementById("experience") as HTMLTextAreaElement).value,
        skills: (document.getElementById("skills") as HTMLInputElement).value.split(",").map(skill => skill.trim())
    };

    generateResume(formData);
});

function generateResume(data: ResumeData): void {
    resumeDisplay.innerHTML = "";

    // Create and append editable resume sections
    const nameEl = createEditableElement("h1", data.name, (newValue) => data.name = newValue);
    
    const contactInfoEl = createEditableElement("p", `Email: ${data.email} | Phone: ${data.phone} | Location: ${data.location}`, (newValue) => {
        const parts = newValue.split(" | ");
        data.email = parts[0].replace("Email: ", "").trim();
        data.phone = parts[1].replace("Phone: ", "").trim();
        data.location = parts[2].replace("Location: ", "").trim();
    });

    const educationEl = createEditableElement("h2", "Education");
    const educationDetailsEl = createEditableElement("p", data.education, (newValue) => data.education = newValue);
    
    const experienceEl = createEditableElement("h2", "Work Experience");
    const experienceDetailsEl = createEditableElement("p", data.experience, (newValue) => data.experience = newValue);
    
    const skillsEl = createEditableElement("h2", "Skills");
    const skillsListEl = document.createElement("ul");
    skillsListEl.className = "skills-list";
    data.skills.forEach((skill, index) => {
        const skillItemEl = createEditableElement("li", skill, (newValue) => data.skills[index] = newValue);
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
function createEditableElement(tag: string, text: string, onChange?: (newValue: string) => void): HTMLElement {
    const element = document.createElement(tag);
    element.innerText = text;
    element.contentEditable = "true";
    element.className = "editable";

    element.addEventListener("blur", () => {
        if (onChange) {
            onChange(element.innerText);
        }
    });

    return element;
}