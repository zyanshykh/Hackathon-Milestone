interface ResumeData {
    name: string;
    email: string;
    phone: string;
    location: string;
    education: string;
    experience: string;
    skills: string[];
}

// Capture the form and display elements
const resumeForm = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplay = document.getElementById("resume-display") as HTMLDivElement;

// Handle form submission
resumeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    
    // Capture the user inputs
    const formData: ResumeData = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value,
        location: (document.getElementById("location") as HTMLInputElement).value,
        education: (document.getElementById("education") as HTMLInputElement).value,
        experience: (document.getElementById("experience") as HTMLTextAreaElement).value,
        skills: (document.getElementById("skills") as HTMLInputElement).value.split(",").map(skill => skill.trim())
    };

    // Generate the resume display
    generateResume(formData);
});

// Function to generate and display the resume
function generateResume(data: ResumeData): void {
    // Clear any previous resume content
    resumeDisplay.innerHTML = "";
    
    // Create and append resume sections dynamically
    const nameEl = document.createElement("h1");
    nameEl.innerText = data.name;
    
    const contactInfoEl = document.createElement("p");
    contactInfoEl.innerText = `Email: ${data.email} | Phone: ${data.phone} | Location: ${data.location}`;
    
    const educationEl = document.createElement("h2");
    educationEl.innerText = "Education";
    const educationDetailsEl = document.createElement("p");
    educationDetailsEl.innerText = data.education;
    
    const experienceEl = document.createElement("h2");
    experienceEl.innerText = "Work Experience";
    const experienceDetailsEl = document.createElement("p");
    experienceDetailsEl.innerText = data.experience;
    
    const skillsEl = document.createElement("h2");
    skillsEl.innerText = "Skills";
    const skillsListEl = document.createElement("ul");
    skillsListEl.className = "skills-list";
    
    data.skills.forEach(skill => {
        const skillItemEl = document.createElement("li");
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