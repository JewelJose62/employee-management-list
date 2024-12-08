const modal = document.getElementById('employeeModal');
const closeModalButton = document.getElementById('closeModalbutton')
// const submitBtn = document.getElementById('submitBtn');
// const saveChangeBtn = document.getElementById("savechange");
const form = document.getElementById("add_employee");




document.getElementById("add_emp").addEventListener('click', function () {
  modal.style.display = 'block';
  modal.setAttribute("aria-hidden", "false");
  // submitBtn.body.display = 'submit';
  // employeeModal.innerHTML="employeeModalLabel"
  resetValidation();
});

closeModalButton.addEventListener('click', function () {
  modal.style.display = 'none';
  modal.setAttribute("aria-hidden", "true");

  // Clear form data and errors
  document.getElementById('add_employee').reset();
  // Reset any displayed error messages
  resetValidation();

});


function resetValidation() {
  // Reset any error messages, styles, etc.

  const formElements = document.querySelectorAll('input, textarea, select');

  formElements.forEach(input => {
    // Reset the border color of inputs
    input.style.setProperty('border-color', '');

    // Hide validation error messages
    const span = input.parentElement.querySelector("span");
    if (span) {
      span.style.display = "none";
    }
  });
}





let employees = [];  // Variable to store the fetched employee data
let currentPage = 1; // Default to first page
let numberOfRows = 10; // Default number of rows per page
let filteredEmployees=[];// to store filtered employees



// search function
// pagination 
// get employees from databae and list it on the table
async function fetchEmployees() {
  try {
    const response = await fetch("http://localhost:3000/employees");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    employees = await response.json();
    filteredEmployees=employees;
    console.log("Fetched employees:", employees);

    // Display the first page of employees
    displayEmployees(employees, currentPage, numberOfRows);
    setupPagination(filteredEmployees);
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
}

function displayEmployees(data, page, rows) {
  const startIndex = (page - 1) * rows;
  const endIndex = startIndex + rows;
  const employeesToDisplay = data.slice(startIndex, endIndex);

  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Clear existing rows

  employeesToDisplay.forEach((employee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td scope="row">#${startIndex + index + 1}</td>
      <td hidden id="userId">${employee.id}</td>
      <td>${employee.salutation} ${employee.firstName} ${employee.lastName}</td>
      <td>${employee.email}</td>
      <td>${employee.phone}</td>
      <td>${employee.gender}</td>
      <td>${employee.dob}</td>
      <td>${employee.country}</td>
      <td>
        <div class="dropdown">
          <button class="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-ellipsis text-primary"></i>
          </button>
          <ul class="dropdown-menu rounded-4">
            <li><button class="dropdown-item" type="button" onclick="viewDetails(${employee.id})"><i class="fa-regular px-2 fa-eye"></i> View Details</button></li>
            <li><button class="dropdown-item" type="button" onclick="editEmployee(${employee.id})"><i class="fa-solid px-2 fa-pen"></i> Edit</button></li>
            <li><button class="dropdown-item" type="button" onclick="deleteEmployee(${employee.id})"><i class="fa-regular px-2 fa-trash-can"></i> Delete</button></li>
          </ul>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}




// function setupPagination(data) {
//   const totalPages = Math.ceil(data.length / numberOfRows);
//   const pagination = document.getElementById("pagination");
//   pagination.innerHTML = ""; // Clear previous pagination



//    // Previous Button
//    const prevButton = document.createElement("li");
//    prevButton.classList.add(".page-item");
//    prevButton.innerHTML = `
//      <a class="page-link" href="#" aria-label="Previous">
//        <span aria-hidden="true">&laquo;</span>
//      </a>
//    `;
//    prevButton.addEventListener("click", () => {
//      if (currentPage > 1) {
//        currentPage--;
//        displayEmployees(data, currentPage, numberOfRows);
//      }
//    });
//    pagination.appendChild(prevButton);



//   for (let i = 1; i <= totalPages; i++) {
//     const pageBtn = document.createElement("button");
//     pageBtn.innerHTML = i;
//     pageBtn.classList.add("page-btn");
//     pageBtn.addEventListener("click", () => {
//       currentPage = i;
//       displayEmployees(data, currentPage, numberOfRows);
//     });
//     pagination.appendChild(pageBtn);
//   }
// }



//   // Next Button
//   const nextButton = document.createElement("li");
//   nextButton.classList.add(".page-item");
//   nextButton.innerHTML = `
//     <a class="page-link" href="#" aria-label="Next">
//       <span aria-hidden="true">&raquo;</span>
//     </a>
//   `;
//   nextButton.addEventListener("click", () => {
//     if (currentPage < totalPages) {
//       currentPage++;
//       displayEmployees(data, currentPage, numberOfRows);
//     }
//   });


  // handle search input
const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", () => {
  const query = searchInput.value.toLowerCase();
  const filteredEmployees = employees.filter(employee =>
    employee.firstName.toLowerCase().includes(query) ||
    employee.lastName.toLowerCase().includes(query) ||
    employee.email.toLowerCase().includes(query) ||
    employee.phone.includes(query)
  );

  currentPage = 1; // Reset to first page after search
  displayEmployees(filteredEmployees, currentPage, numberOfRows);
  setupPagination(filteredEmployees);
});

// Initialize the fetch and display
fetchEmployees();



const submitBtn = document.getElementById('submitBtn')
// add event 
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  validation();

})



const salutationInp = document.getElementById("salutation")
const firstNameInp = document.getElementById("firstName")
const lastNameInp = document.getElementById("lastName")
const emailInp = document.getElementById("email")
const mobileInp = document.getElementById("phone")
const dobInp = document.getElementById("dob")
const genderInp = document.querySelector('[name="gender"]')
const qualificationInp = document.getElementById("qualification")
const addressInp = document.getElementById("address")
const stateInp = document.getElementById("state")
const countryInp = document.getElementById("country")
const cityInp = document.getElementById("city")
const pinInp = document.getElementById("pin")
const usernameInp = document.getElementById("username")
const passwordInp = document.getElementById("password")
const entries = document.querySelector(".showEntries")
const tabSize = document.getElementById("table_size")
const userInfo = document.querySelector(".userInfo")
const table = document.querySelector("table")
const filterData = document.getElementById("search")
const pageLinks = document.querySelectorAll('.page-link');
const previousBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');



// define the validate function

function validation() {

  // const upload = upload.value.trim()
  const salutationVal = salutationInp.value
  const firstNameVal = firstNameInp.value
  const lastNameVal = lastNameInp.value
  const emailVal = emailInp.value
  const mobileVal = mobileInp.value
  const dobVal = dobInp.value
  // const genderVal = genderInp
  const genderVal = document.querySelector('[name="gender"]:checked');
  const qualificationVal = qualificationInp.value
  const addressVal = addressInp.value
  const stateVal = stateInp.value
  const countryVal = countryInp.value
  const cityVal = cityInp.value
  const pinVal = pinInp.value
  const usernameVal = usernameInp.value
  const passwordVal = passwordInp.value
// const FormData=new formData(form)
  let isValid = true;



  // // Check if required fields are valid
  // formData.forEach((value, key) => {
  //   if (!value) {
  //     isValid = false;
  //     validationerror(document.querySelector(`[name="${key}"]`), `Please enter your ${key}`);
  //   } else {
  //     validationsuccess(document.querySelector(`[name="${key}"]`), `${key} is valid`);
  //   }
  // });

  // salutation validation        
  const salutationregex = /^(Mr|Mrs|Ms|Dr|Prof|Mx)$/
  if (!salutationregex.test(salutationVal)) {
    validationerror(salutationInp, "please enter the salutation")
    isValid = false
  }
  else {
    validationsuccess(salutationInp, "success")
  }


  //  first name validation 

  const nameregex = /^[a-zA-Z]{2,50}$/;
  if (!nameregex.test(firstNameVal)) {
    validationerror(firstNameInp, "please enter your first name")
    isValid = false

  }
  else {
    validationsuccess(firstNameInp, "success")

  }

  // last name validation 

  const lastNameregex = /^[a-zA-Z]{1,50}$/;
  if (!lastNameregex.test(lastNameVal)) {
    validationerror(lastNameInp, "please enter your last name")
    isValid = false
  }

  else {
    validationsuccess(lastNameInp, "success")
  }


  // email validation 
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailregex.test(emailVal)) {
    validationerror(emailInp, "please enter your email")
    isValid = false
  }

  else {
    validationsuccess(emailInp, "success")
  }


  //  phone validation 

  const phoneregex = /^\+?[0-9\s\-()]{10,20}$/;

  if (!phoneregex.test(mobileVal)) {
    validationerror(mobileInp, "enter your phone number")
    isValid = false
  }
  else {
    validationsuccess(mobileInp, "success")
  }


  // address validation

  const addressregex = /^[a-zA-Z0-9\s,.'#-]{5,}$/;
  if (!addressregex.test(addressVal)) {
    validationerror(addressInp, "enter your address")
    isValid = false
  }

  else {
    validationsuccess(addressInp, "success")
  }

  //  qualification validation
  const qualificationsregex = /^[a-zA-Z0-9\s,.'-]{2,50}$/;
  if (!qualificationsregex.test(qualificationVal)) {
    validationerror(qualificationInp, "enter your qualification")
    isValid = false
  }

  else {
    validationsuccess(qualificationInp, "success")
  }



  // dob validation 
  const dobregex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if (!dobregex.test(dobVal)) {

    validationerror(dobInp, "enter your date of birth")
    isValid = false
  }

  else {
    validationsuccess(dobInp, "success")
  }



  // pin validation 

  const pinRegex = /^[1-9][0-9]{5}$/;
  if (!pinRegex.test(pinVal)) {
    validationerror(pinInp, "enter the pin")
    isValid = false
  }

  else {
    validationsuccess(pinInp, "success")
  }




  // country validation


  if (countryVal === "0") {
    validationerror(countryInp, "enter your country")
    isValid = false
  }
  else {
    validationsuccess(countryInp, "success")
  }



  // state validation

  if (stateVal === "0") {
    validationerror(stateInp, "enter your state")
    isValid = false
  }
  else {
    validationsuccess(stateInp, "success")
  }


  //  city validation 

  const cityregex = /^[A-Za-z\s.'-]+$/;

  if (!cityregex.test(cityVal)) {
    validationerror(cityInp, "enter your city")
    isValid = false
  }

  else {
    validationsuccess(cityInp, "success")
  }


  // username validation 

  const usernameRegex = /^[a-zA-Z0-9_\.]+$/;

  if (!usernameRegex.test(usernameVal)) {
    validationerror(usernameInp, "enter the username")
    isValid = false
  }
  else {
    validationsuccess(usernameInp, "success")
  }


  // password validation


  const passwordregex = /^[A-Za-z0-9]{6,}$/;


  if (!passwordregex.test(passwordVal)) {
    validationerror(passwordInp, "enter the password")
    isValid = false
  }

  else {
    validationsuccess(passwordInp, "success")
  }


  // gender validation 

  if (!genderVal === "male" || genderVal === "female") {
    validationerror(genderInp, "please select your gender");
    isValid = false;
  } else {
    validationsuccess(genderInp, "success");
  }
  


  // let genderVal = null;  // Initialize genderVal to null
  // genderInp.forEach(function(item) {  // Use proper syntax for forEach loop
  //   if (item.checked) {  // Check if the item is checked
  //     genderVal = item.value;  // Assign the value of the checked item to genderVal
  //   }
  // });


  // if (genderVal == "male" || genderVal =="female" || genderVal==="") {
  //   validationerror(genderInp, "please select your gender");
  //   isValid = false
  //  } else {
  //   validationsuccess(genderInp, "success");
  //    }


  // if (!genderVal) {
  //   validationerror(genderInp, "Please select your gender");
  //   isValid = false;
  // } else {
  //   validationsuccess(genderInp, "Success");
  //   return genderVal.value; // Return the selected value (male, female, or other)
  // }





  let formatedDob = dobVal.split('-').reverse().join('-')

  const formData = new FormData();
  formData.append("salutation", salutationVal);
  formData.append("firstName", firstNameVal);
  formData.append("lastName", lastNameVal);
  formData.append("email", emailVal);
  formData.append("phone", mobileVal);
  formData.append("dob", formatedDob);
  formData.append("gender", genderVal);
  formData.append("qualifications", qualificationVal);
  formData.append("address", addressVal);
  formData.append("state", stateVal);
  formData.append("country", countryVal);
  formData.append("city", cityVal);
  formData.append("pin", pinVal);
  formData.append("username", usernameVal);
  formData.append("password", passwordVal);


  if (isValid) {
    // Call the function to submit the form data
    console.log(formData);

    submitForm(formData);
  }



}

function validationerror(input, message) {
  console.log(input, message);

  const info = input.parentElement
  const span = info.querySelector("span")
  span.innerHTML = message;
  span.style.color = "red";
  input.style.setProperty('border-color', 'red')
  span.style.display = "block";
  // const icon = info.querySelector(".icon");
  // icon.classList.add("fa-solid fa-circle-exclamation")
  // icon.style.color="red";
  // icon.style.display="inline-block";
}

function validationsuccess(input, message) {



  //   // const icon=info.querySelector(".icon")
  //   // icon.classList.add("fa-solid fa-circle-check");
  //   // icon.style.color="green";
  //   // icon.style.display="inline-block";

}

// function validationsuccess(input, message) {
//   const info = input.parentElement;
//   const span = info.querySelector("span");
//   span.innerHTML = message;
//   span.style.color = "green";
//   input.style.setProperty('border-color', 'green');
//   span.style.display = "block";
// }








//  create employee >>>>>>

function submitForm(formData) {
  console.log(formData);

  // Use Fetch API to send the POST request
  fetch('http://localhost:3000/employees', {
    method: 'POST',
    body: formData, // Send form data
  })
    .then(response => {
      if (response.ok) {
        // Handle success
        console.log(response);

        alert("Form submitted successfully!");
        // You can redirect the user or perform any other action after success
      } else {
        // Handle server errors
        alert("There was an error submitting the form.");
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      alert("Network error. Please try again.");
    });
}





       // delete employee >>>>>>


       document.querySelector("#tableBody").addEventListener('click', function(event) {
        // Check if the clicked element is the delete button
        if (event.target && event.target.matches('button.dropdown-item') && event.target.textContent.includes("Delete")) {
          const row = event.target.closest("tr"); // Find the closest row
          const userId = row.querySelector("#userId").textContent; // Get the employee ID
      
          // Call the function to delete the employee
          fetch(`http://localhost:3000/employees/${userId}`, {
            method: "DELETE",
          })
          .then(response => {
            if (response.ok) {
              row.remove(); // Remove the row from the table
              confirm("Are you sure to delete the employee.");
            } else {
              alert("Error deleting employee.");
            }
          })
          .catch(error => {
            console.error("Error deleting employee:", error);
            alert("Error occurred while deleting.");
          });
        }
      });
  







// pagination

 // Function to update the active page
 function updateActivePage() {
  pageLinks.forEach(link => {
    link.classList.remove('active');
  });
  const currentPageLink = document.querySelector(`.page-item:nth-child(${currentPage + 1}) .page-link`);
  currentPageLink.classList.add('active');
}

// Event listener for page number clicks
pageLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.textContent !== 'Previous' && event.target.textContent !== 'Next') {
      currentPage = parseInt(event.target.textContent);
      updateActivePage();
    }
  });
});

// Event listener for previous button
previousBtn.addEventListener('click', function(event) {
  event.preventDefault();
  if (currentPage > 1) {
    currentPage--;
    updateActivePage();
  }
});

// Event listener for next button
nextBtn.addEventListener('click', function(event) {
  event.preventDefault();
  if (currentPage < 10) { // Assuming there are 10 pages, adjust as necessary
    currentPage++;
    updateActivePage();
  }
});

// Initialize the active page
updateActivePage();




// Edit Employee
async function editEmployee(userId) {
  try {
    // Fetch employee data from the backend
    const response = await fetch(`http://localhost:3000/employees/${userId}`);
    const employee = await response.json();

    // Open the modal
    modal.style.display = 'block';
    modal.setAttribute("aria-hidden", "false");
    resetValidation();

    
    document.getElementById("salutation").value = employee.salutation;
    document.getElementById("firstName").value = employee.firstName;
    document.getElementById("lastName").value = employee.lastName;
    document.getElementById("email").value = employee.email;
    document.getElementById("phone").value = employee.phone;
    document.getElementById("dob").value = employee.dob.split("-").reverse().join("-"); // Change format if necessary
    document.querySelector(`[name="gender"][value="${employee.gender}"]`).checked = true;
    document.getElementById("qualification").value = employee.qualifications;
    document.getElementById("address").value = employee.address;
    document.getElementById("state").value = employee.state;
    document.getElementById("country").value = employee.country;
    document.getElementById("city").value = employee.city;
    document.getElementById("pin").value = employee.pin;
    document.getElementById("username").value = employee.username;
    document.getElementById("password").value = employee.password;

    // Set hidden employee ID for submitting the update
    document.getElementById("employeeId").value = employee.id;

  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
}


// Function to submit the updated data
async function submitForm(formData) {
  const userId = document.getElementById("employeeId").value;

  try {
    const response = await fetch(`http://localhost:3000/employees/${userId}`, {
      method: 'PUT',
      body: formData, // Send the updated form data
    });

    if (response.ok) {
      alert("Employee updated successfully!");
      modal.style.display = 'none'; // Close modal after update
      resetValidation();
      fetchEmployees(); // Refresh employee list
    } else {
      alert("There was an error updating the employee.");
    }
  } catch (error) {
    console.error('Error submitting updated form:', error);
    alert("Network error. Please try again.");
  }
}
