let selectedRow = null;

// REGISTER STUDENT
function registerStudent() {

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let email = document.getElementById("email").value.trim();
    let branch = document.getElementById("branch").value.trim();

    // Empty field validation
    if (name === "" || roll === "" || email === "" || branch === "") {
        alert("Please fill all details!");
        return;
    }

    // Email validation
    if (!email.includes("@")) {
        alert("Please enter a valid email!");
        return;
    }

    let table = document.getElementById("studentTable");
    let rows = table.getElementsByTagName("tr");

    // Duplicate email check
    for (let i = 1; i < rows.length; i++) {
        if (rows[i].cells[2].textContent === email) {
            alert("This email already exists!");
            return;
        }
    }

    // Duplicate roll number check
    for (let i = 1; i < rows.length; i++) {
        if (rows[i].cells[1].textContent === roll) {
            alert("This roll number already exists!");
            return;
        }
    }

    // Create new row
    let row = table.insertRow();

    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = roll;
    row.insertCell(2).textContent = email;
    row.insertCell(3).textContent = branch;

    let actionCell = row.insertCell(4);

    actionCell.innerHTML =
        '<button type="button" onclick="editStudent(this)">Edit</button>' +
        '<button type="button" onclick="deleteStudent(this)">Delete</button>';

    // Save to localStorage
    saveStudents();

    updateStudentCount();

    alert("Student registered successfully!");

    clearForm();
}


// DELETE STUDENT
function deleteStudent(button) {

    if (confirm("Are you sure you want to delete this student?")) {

        let row = button.parentNode.parentNode;

        row.remove();

        saveStudents();

        updateStudentCount();

        alert("Student deleted successfully!");

        clearForm();
    }
}


// EDIT STUDENT
function editStudent(button) {

    selectedRow = button.parentNode.parentNode;

    document.getElementById("name").value =
        selectedRow.cells[0].textContent;

    document.getElementById("roll").value =
        selectedRow.cells[1].textContent;

    document.getElementById("email").value =
        selectedRow.cells[2].textContent;

    document.getElementById("branch").value =
        selectedRow.cells[3].textContent;

    alert("Student details loaded. You can edit now.");
}


// UPDATE STUDENT
function updateStudent() {

    if (selectedRow === null) {
        alert("Please click Edit first!");
        return;
    }

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let email = document.getElementById("email").value.trim();
    let branch = document.getElementById("branch").value.trim();

    // Empty field validation
    if (name === "" || roll === "" || email === "" || branch === "") {
        alert("Please fill all details!");
        return;
    }

    // Email validation
    if (!email.includes("@")) {
        alert("Please enter a valid email!");
        return;
    }

    // Update table row
    selectedRow.cells[0].textContent = name;
    selectedRow.cells[1].textContent = roll;
    selectedRow.cells[2].textContent = email;
    selectedRow.cells[3].textContent = branch;

    saveStudents();

    alert("Student updated successfully!");

    clearForm();
}


// SEARCH STUDENT
function searchStudent() {

    let searchValue =
        document.getElementById("search").value.toLowerCase();

    let table = document.getElementById("studentTable");
    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {

        let rowText = rows[i].textContent.toLowerCase();

        if (rowText.includes(searchValue)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}


// CLEAR FORM
function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("email").value = "";
    document.getElementById("branch").value = "";

    selectedRow = null;
}


// UPDATE STUDENT COUNT
function updateStudentCount() {

    let table = document.getElementById("studentTable");

    let count = table.rows.length - 1;

    document.getElementById("studentCount").textContent =
        "Total Students: " + count;

    document.getElementById("studentCountNumber").textContent =
        count;
}


// SAVE STUDENTS TO LOCAL STORAGE
function saveStudents() {

    let table = document.getElementById("studentTable");

    let students = [];

    for (let i = 1; i < table.rows.length; i++) {

        let row = table.rows[i];

        students.push({
            name: row.cells[0].textContent,
            roll: row.cells[1].textContent,
            email: row.cells[2].textContent,
            branch: row.cells[3].textContent
        });
    }

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// LOAD STUDENTS FROM LOCAL STORAGE
function loadStudents() {

    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    let table = document.getElementById("studentTable");

    for (let student of students) {

        let row = table.insertRow();

        row.insertCell(0).textContent = student.name;
        row.insertCell(1).textContent = student.roll;
        row.insertCell(2).textContent = student.email;
        row.insertCell(3).textContent = student.branch;

        let actionCell = row.insertCell(4);

        actionCell.innerHTML =
            '<button type="button" onclick="editStudent(this)">Edit</button>' +
            '<button type="button" onclick="deleteStudent(this)">Delete</button>';
    }

    updateStudentCount();
}


// LOAD DATA WHEN PAGE OPENS
document.addEventListener("DOMContentLoaded", function () {

    loadStudents();

});
