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


// get employees from databae and list it on the table
async function fetchEmployees() {
  try {
    const response = await fetch(" http://localhost:3000/employees")

    let tableBody = document.getElementById("tableBody")
    let column = "";


    if (!response.ok) {
      throw new Error(`HTTP error ! status :${response.status}`);

    }
    const employees = await response.json();
    console.log(employees);
    let count = 1;
    employees.forEach((element) => {

      column +=

        ` <tr>
              <td scope="row">#0${count++}</td>
              <td hidden id="userId">${element.id}</td>
              <td>${element.salutation} ${element.firstName} ${element.lastName}</td>
              <td>${element.email}</td>
              <td>${element.phone}</td>
              <td>${element.gender}</td>
              <td>${element.dob}</td>
              <td>${element.country}</td>
                <td><div  class="dropdown"><button class="btn btn-light " type="button"
        data-bs-toggle="dropdown" aria-expanded="false">
       <i class="fa-solid fa-ellipsis text-primary">
       </i>
       </button>
    <ul id="dotmenu" class="dropdown-menu  rounded-4">  
       <li><button class="dropdown-item px-1" type="button" onclick="viewDetails(${element.id})"><i class="fa-regular px-2 fa-eye"></i>View Details </button></li>
       <li><button id="edit" data-bs-toggle="modal" data-bs-target="#exampleModal" class="dropdown-item px-1" type="button" onclick="editemployee(${element.id})"><i class="fa-solid px-2 fa-pen"></i>Edit </button></li>
       <li><button id="delete" class="dropdown-item px-1" type="button" onclick="deleteEmployee(${element.id})"><i class="fa-regular px-2 fa-trash-can"></i>Delete</button>
       </li>
   </ul>
    </div></td>
        </tr>`;


    });

    tableBody.innerHTML = column;
  }

  catch (error) {
    console.log("Error fetching employee data :", error);

  }
}

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
  if (event.target.id === "delete") {
    const row = event.target.closest("tr");
    const userId = row.querySelector("#userId").textContent; // Use correct identifier


    fetch(`http://localhost:3000/employees/${userId}`, {
      method: "DELETE",
    })
    .then(response => {
      if (response.ok) {
        row.remove(); // Remove row from table after successful deletion
      } else {
        alert("Error deleting employee");
      }
    })
    .catch(error => {
      console.error("Error deleting employee:", error);
      alert("Error occurred while deleting.");
    });
  }
});



// edit employee >>>>>


function editEmployee(userId) {
  const form = document.getElementById('add_employee'); // Ensure form is properly selected
  const saveChangeBtn = document.getElementById("savechange"); // Make sure saveChangeBtn exists
  const submitBtn = document.getElementById("submitBtn"); // Ensure submitBtn is defined
  document.getElementById("form_head").innerHTML = "Edit Employee";
  const modal = document.getElementById("modal"); 
  saveChangeBtn.style.display = "block";
  submitBtn.style.display = "none"; // Hide the submit button
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");

  async function editData() {
    try {
      const response = await fetch(`http://localhost:3000/employees/${userId}`);
      const employee = await response.json();

      // Populate form fields with the employee data
      Object.entries(employee).forEach(([key, value]) => {
        const inputField = document.querySelector(`#add_employee [name="${key}"]`);
        if (inputField) {
          if (key === "dob") {
            const formattedDob = value.split("-").reverse().join("-");
            inputField.value = formattedDob;
          } else if (key === "gender") {
            document.querySelector(`input[name="gender"][value="${value}"]`).checked = true;
          } else {
            inputField.value = value;
          }
        }
      });
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  }

  editData();

  saveChangeBtn.addEventListener("click", function () {
    const isValid = validation();  // Assuming validation returns a boolean
    if (!isValid) return;  // Prevent further action if the form is invalid

    const updatedData = new FormData(form);
    const updatedEmployee = {};
    updatedData.forEach((value, key) => {
      updatedEmployee[key] = value;
    });

    // Send the updated data to the server
    async function updateEmployee() {
      try {
        const response = await fetch(`http://localhost:3000/employees/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEmployee),
        });

        if (response.ok) {
          alert("Employee updated successfully!");
          modal.style.display = "none";
          modal.setAttribute("aria-hidden", "true");
          fetchEmployees();  // Re-fetch employee list to reflect updates
        } else {
          alert("Failed to update employee. Please try again later.");
        }
      } catch (error) {
        console.error('Error updating employee:', error);
        alert("An error occurred. Please try again later.");
      }
    }

    updateEmployee();
  });
}




// document.addEventListener("DOMContentLoaded", function() {
  // Get pagination elements
  const pagination = document.querySelector('.pagination');
  const pageItems = pagination.querySelectorAll('.page-item');
  const prevButton = pagination.querySelector('li.page-item:first-child');
  const nextButton = pagination.querySelector('li.page-item:last-child');
  const pageLinks = pagination.querySelectorAll('.page-link');
  
  let currentPage = 1;
  const totalPages = pageItems.length - 2; // Adjust to exclude Prev and Next
  
  // Set up event listeners for page clicks
  pageLinks.forEach((link, index) => {
    if (index === 0 || index === pageLinks.length - 1) return; // Skip Prev and Next
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default anchor behavior
      const pageNumber = parseInt(link.textContent);
      if (pageNumber !== currentPage) {
        currentPage = pageNumber;
        updatePagination();
      }
    });
  });
  
  // Handle Previous button click
  prevButton.querySelector('.page-link').addEventListener('click', function(e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });
  
  // Handle Next button click
  nextButton.querySelector('.page-link').addEventListener('click', function(e) {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  });
  
  // Function to update pagination (active page, disable Prev/Next)
  function updatePagination() {
    const pageItems = pagination.querySelectorAll('.page-item');  // Re-query in case it changes dynamically
    
    // Update active page
    pageItems.forEach((item, index) => {
      const pageLink = item.querySelector('.page-link');
      const pageNumber = parseInt(pageLink.textContent);
  
      if (pageNumber === currentPage) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  
    // Disable Previous button if on first page
    if (currentPage === 1) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }
  
    // Disable Next button if on the last page
    if (currentPage === totalPages) {
      nextButton.classList.add('disabled');
    } else {
      nextButton.classList.remove('disabled');
    }
  }
  
  // Initialize the pagination
  updatePagination();
  