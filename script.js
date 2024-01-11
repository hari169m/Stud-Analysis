const studentsData = {
    "123": {
        name: "John Doe",
        branch: "Computer Science",
        phoneNumber: "123-456-7890",
        semesters: [
            { semester: 1, sgpa: 3.5 },
            { semester: 2, sgpa: 3.7 },
            { semester: 3, sgpa: 3.8 },
            { semester: 4, sgpa: 4.0 },
            { semester: 5, sgpa: 3.9 },
            { semester: 6, sgpa: 3.6 },
            { semester: 7, sgpa: 3.8 },
            { semester: 8, sgpa: 4.0 }
        ]
    },
    "456": {
        name: "Jane Smith",
        branch: "Electrical Engineering",
        phoneNumber: "987-654-3210",
        semesters: [
            { "1st-sem", sgpa: 3.6 },
            { "2nd-sem", sgpa: 3.8 },
            { semester: 3, sgpa: 3.9 },
            { semester: 4, sgpa: 3.7 },
            { semester: 5, sgpa: 4.0 },
            { semester: 6, sgpa: 3.5 },
            { semester: 7, sgpa: 3.9 },
            { semester: 8, sgpa: 3.8 }
        ]
    },
    // Add more students and their semesters as needed
};

function getStudentInfo() {
    const studentId = document.getElementById("studentId").value;
    const resultContainer = document.getElementById("result");

    if (studentsData.hasOwnProperty(studentId)) {
        const studentInfo = studentsData[studentId];

        // Display the student information
        resultContainer.innerHTML = `
            <p><strong>Name:</strong> ${studentInfo.name}</p>
            <p><strong>Branch:</strong> ${studentInfo.branch}</p>
            <p><strong>Phone Number:</strong> ${studentInfo.phoneNumber}</p>
            <p><strong>CGPA:</strong> ${calculateCGPA(studentInfo.semesters)}</p>
        `;

        // Create a bar graph for CGPA
        createCGPAGraph(studentInfo.semesters);
    } else {
        // Display an error message if student ID is not found
        resultContainer.innerHTML = "<p class='error'>Student ID not found.</p>";
    }
}

function calculateCGPA(semesters) {
    // Calculate the overall CGPA based on the provided semesters
    const totalPoints = semesters.reduce((total, semester) => total + semester.sgpa, 0);
    const cgpa = totalPoints / semesters.length;
    return cgpa.toFixed(2); // Round to two decimal places
}

function createCGPAGraph(semesters) {
    // Extract semester numbers and SGPA values for the chart
    const labels = semesters.map(semester => `Semester ${semester.semester}`);
    const data = semesters.map(semester => semester.sgpa);

    // Get the canvas element to render the chart
    const canvas = document.getElementById("cgpaChart");

    // Create a bar graph using Chart.js
    new Chart(canvas, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "SGPA",
                backgroundColor: "rgba(75,192,192,0.6)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
                data: data,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10.0 // Assuming the maximum SGPA is 4.0
                }
            }
        }
    });
}
