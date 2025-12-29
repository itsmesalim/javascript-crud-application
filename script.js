// localStorage.clear();

// storing data in localStorage

let id = null;

// Handling Form Submission
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

    if (phone === "" && phone.length < 10) {
      console.log("phone = ", phone);
      phoneError.textContent = "Please enter phone number.";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      phoneError.textContent = "Please enter only 10 digit phone number.";
      isValid = false;
    } else {
      phone = document.getElementById("phoneId").value;
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
    } else if (address.length > 500) {
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
      Swal.fire({
        title: "Good job!",
        text: "Form submitted success",
        icon: "success",
      });
    } else {
      Toastify({
        text: "please fill all the required field before Submit!",
        duration: 3000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #f7b733, #fc4a1a)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

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
    } else if (address.length > 500) {
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
      console.log("form updated");
      Swal.fire({
        title: "Good job!",
        text: "Form updated success",
        icon: "success",
      });
      // alert("Form submitted successfully!");
      // return true;
    } else {
      console.log("fill all the required fields");

      Toastify({
        text: "please fill all the required fields before Update!",
        duration: 3000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #f7b733, #fc4a1a)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      return false;
    }
    id = null;
  }

  localStorage.setItem("students", JSON.stringify(studentRecord));
  clearForm();
  showStudentsData();
};

// showing data from localStorage
const showStudentsData = () => {
  document.getElementById("showStudentsId").innerHTML = "";

  let studentRecord = JSON.parse(localStorage.getItem("students"))
    ? JSON.parse(localStorage.getItem("students"))
    : [];

  studentRecord.forEach((student, index) => {
    let addTr = document.createElement("tr");

    addTr.innerHTML = `
       <td> ${student.firstName}</td>
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

// Editing Data from localStorage
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

// Deleting Data from localStorage
const deleteData = (index) => {
  let students = JSON.parse(localStorage.getItem("students"));

  Swal.fire({
    title: "Are you sure?",
    text: `Are you sure to delete '${students[index].firstName} ${students[index].lastName},s' data?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      students.splice(index, 1);
      localStorage.setItem("students", JSON.stringify(students));
      showStudentsData();

      Swal.fire({
        title: "Deleted!",
        text: `${students[index].firstName} ${students[index].lastName}'s data has been deleted.`,
        icon: "success",
      });
    }
  });
};

//clear form data aafter submission
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

// Search Table Data
const searchTable = () => {
  const search = document.querySelector(".search-div input");
  const tbody_rows = document.querySelectorAll("#showStudentsId tr");

  tbody_rows.forEach((row, i) => {
    const table_data = row.textContent.toLowerCase();
    const search_data = search.value.toLowerCase();

    row.classList.toggle("hide", !table_data.includes(search_data));
    row.style.setProperty("--delay", i / 25 + "s");
  });

  document
    .querySelectorAll("#showStudentsId tr:not(.hide)")
    .forEach((visible_row, i) => {
      visible_row.style.backgroundColor =
        i % 2 == 0 ? "transparent" : "#0000000b";
    });
};

// Sort Table Data

const table_headings = document.querySelectorAll("thead th");

table_headings.forEach((head, i) => {
  let sort_asc = true;
  head.onclick = () => {
    table_headings.forEach((head) => head.classList.remove("active"));
    head.classList.add("active");

    document
      .querySelectorAll("#showStudentsId td")
      .forEach((td) => td.classList.remove("active"));
    document.querySelectorAll("#showStudentsId tr").forEach((row) => {
      row.querySelectorAll("td")[i].classList.add("active");
    });

    head.classList.toggle("asc", sort_asc);
    sort_asc = head.classList.contains("asc") ? false : true;
    sortTable(i, sort_asc);
  };
});

const sortTable = (column, sort_asc) => {
  const tbody_rows = document.querySelectorAll("#showStudentsId tr");
  [...tbody_rows]
    .sort((a, b) => {
      let first_row = a
          .querySelectorAll("td")
          [column].textContent.toLowerCase(),
        second_row = b.querySelectorAll("td")[column].textContent.toLowerCase();
      return sort_asc
        ? first_row < second_row
          ? 1
          : -1
        : first_row < second_row
        ? -1
        : 1;
    })
    .forEach((sorted_row) =>
      document.getElementById("showStudentsId").appendChild(sorted_row)
    );
};
