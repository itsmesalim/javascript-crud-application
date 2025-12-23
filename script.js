// localStorage.clear();

// storing data in localStorage

let id = null;

const handleSubmit = (event) => {
  event.preventDefault();
  let firstName = document.getElementById("firstNameId").value;
  let lastName = document.getElementById("lastNameId").value;
  let dateOfBirth = document.getElementById("dobId").value;
  let admissionDate = document.getElementById("admissionId").value;
  let phone = document.getElementById("phoneId").value;
  let email = document.getElementById("emailId").value;
  let address = document.getElementById("addressId").value;

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const dobError = document.getElementById("dobError");
  const admissionError = document.getElementById("admissionError");
  const phoneError = document.getElementById("phoneError");
  const emailError = document.getElementById("emailError");
  const addressError = document.getElementById("addressError");

  firstNameError.textContent = "";
  lastNameError.textContent = "";
  dobError.textContent = "";
  admissionError.textContent = "";
  phoneError.textContent = "";
  emailError.textContent = "";
  addressError.textContent = "";

  let isValid = true;

  let studentRecord = JSON.parse(localStorage.getItem("students"))
    ? JSON.parse(localStorage.getItem("students"))
    : [];

  if (id === null) {
    if (firstName === "" || /\d/.test(firstName)) {
      firstNameError.textContent = "Please enter your first name properly.";
      isValid = false;
    } else if (firstName.length < 3) {
      firstNameError.textContent =
        "First name must be at least 3 characters long.";
      isValid = false;
    }

    if (dateOfBirth === "") {
      dobError.textContent = "date of birth is required.";
      isValid = false;
    }

    if (admissionDate === "") {
      admissionError.textContent = "admission date is required.";
      isValid = false;
    }

    if (phone === "") {
      phoneError.textContent = "Please enter phone number.";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      phoneError.textContent = "Please enter only 10 digit phone number.";
      isValid = false;
    }

    if (email === "") {
      emailError.textContent = "Please enter your email.";
      isValid = false;
    } else if (studentRecord.some((duplicate) => duplicate.email === email)) {
      emailError.textContent = `this '${email}' email is already exist`;
      return;
    }

    if (address === "") {
      addressError.textContent = "Please enter your address.";
      isValid = false;
    } else if (address.length < 10) {
      addressError.textContent = "Address must be at least 10 characters long.";
      isValid = false;
    } else if (address.length > 100) {
      addressError.textContent =
        "Address must be less than 100 characters long.";
      isValid = false;
    }

    studentRecord.push({
      firstName,
      lastName,
      dateOfBirth,
      admissionDate,
      phone,
      email,
      address,
    });

    if (isValid) {
      console.log("form submited");
      // alert("Form submitted successfully!");
      // return true;
    } else {
      return false;
    }
  } else {
    if (firstName === "" || /\d/.test(firstName)) {
      firstNameError.textContent = "Please enter your first name properly.";
      isValid = false;
    } else if (firstName.length < 3) {
      firstNameError.textContent =
        "First name must be at least 3 characters long.";
      isValid = false;
    }

    if (dateOfBirth === "") {
      dobError.textContent = "date of birth is required.";
      isValid = false;
    }

    if (admissionDate === "") {
      admissionError.textContent = "admission date is required.";
      isValid = false;
    }

    if (phone === "") {
      phoneError.textContent = "Please enter phone number.";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      phoneError.textContent = "Please enter only 10 digit phone number.";
      isValid = false;
    }

    if (email === "") {
      emailError.textContent = "Please enter your email.";
      isValid = false;
    }

    if (address === "") {
      addressError.textContent = "Please enter your address.";
      isValid = false;
    } else if (address.length < 10) {
      addressError.textContent = "Address must be at least 10 characters long.";
      isValid = false;
    } else if (address.length > 100) {
      addressError.textContent =
        "Address must be less than 100 characters long.";
      isValid = false;
    }

    studentRecord[id] = {
      firstName,
      lastName,
      dateOfBirth,
      admissionDate,
      phone,
      email,
      address,
    };

    if (isValid) {
      console.log("form submited");
      // alert("Form submitted successfully!");
      // return true;
    } else {
      return false;
    }
    id = null;
  }

  localStorage.setItem("students", JSON.stringify(studentRecord));
  clearForm();
  showStudentsData();
};

const showStudentsData = () => {
  document.getElementById("showStudentsId").innerHTML = "";

  let studentRecord = JSON.parse(localStorage.getItem("students"))
    ? JSON.parse(localStorage.getItem("students"))
    : [];

  studentRecord.forEach((student, index) => {
    let addTr = document.createElement("tr");

    addTr.innerHTML = `
       <td> ${student.firstName} </td>
       <td> ${student.lastName} </td>
       <td> ${student.dateOfBirth} </td>
       <td> ${student.admissionDate} </td>
       <td> ${student.phone} </td>
       <td> ${student.email} </td>
       <td> ${student.address} </td>
       <td> <button onclick="editData(${index})"><i class="fa-solid fa-pen"></i></button></td>
       <td> <button onclick="deleteData(${index})"><i class="fa-solid fa-trash-can"></i></button></td>
        `;

    document.getElementById("showStudentsId").appendChild(addTr);
  });
};

const editData = (index) => {
  document.getElementById("firstNameId").focus();

  let students = JSON.parse(localStorage.getItem("students"));

  id = index;

  document.getElementById("firstNameId").value = students[index].firstName;
  document.getElementById("lastNameId").value = students[index].lastName;
  document.getElementById("dobId").value = students[index].dateOfBirth;
  document.getElementById("admissionId").value = students[index].admissionDate;
  document.getElementById("phoneId").value = students[index].phone;
  document.getElementById("emailId").value = students[index].email;
  document.getElementById("addressId").value = students[index].address;

  document.getElementById("submitId").value = "Update";
};

const deleteData = (index) => {
  let students = JSON.parse(localStorage.getItem("students"));

  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    showStudentsData();
  }
};

const clearForm = () => {
  document.getElementById("firstNameId").value = "";
  document.getElementById("lastNameId").value = "";
  document.getElementById("dobId").value = "";
  document.getElementById("admissionId").value = "";
  document.getElementById("phoneId").value = "";
  document.getElementById("emailId").value = "";
  document.getElementById("addressId").value = "";

  document.getElementById("submitId").value = "Submit";
};

showStudentsData();
