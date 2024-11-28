
const modal = document.getElementById('employeeModal');
const closeModalButton = document.getElementById('closeModalbutton')
// const submitBtn = document.querySelector("#submit")
// employeeModal=Document.querySelector("#employeeModal")



 document.getElementById("add_emp").addEventListener('click', function () {
  modal.style.display = 'block';
  modal.setAttribute("aria-hidden", "false");
  // submitBtn.body.display = 'submit';
  // employeeModal.innerHTML="employeeModalLabel"
});

closeModalButton.addEventListener('click', function () {
  modal.style.display = 'none';
  modal.setAttribute("aria-hidden", "true");

  // Clear form data and errors
  document.getElementById('employeeForm').reset();
  // Reset any displayed error messages
  resetValidation();

});


function resetValidation() {
  // Reset any error messages, styles, etc.

  const formInputs = document.querySelectorAll('.form-control');
  
  formInputs.forEach(input => {
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
    let count =1;
    employees.forEach((element) => {

      column +=
      
        ` <tr>
              <td scope="row">#0${count++}</td>
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
       <li><button class="dropdown-item px-1" type="button"><i class="fa-regular px-2 fa-eye"></i>View Details </button></li>
       <li><button id="edit" data-bs-toggle="modal" data-bs-target="#exampleModal" class="dropdown-item px-1" type="button"><i class="fa-solid px-2 fa-pen"></i>Edit </button></li>
       <li><button id="delete" class="dropdown-item px-1" type="button"><i class="fa-regular px-2 fa-trash-can"></i>Delete</button>
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
  const firstNameVal= firstNameInp.value
  const lastNameVal =  lastNameInp.value
  const emailVal= emailInp.value
  const mobileVal = mobileInp.value
  const dobVal= dobInp.value
  const genderVal = genderInp
  const qualificationVal = qualificationInp.value
  const addressVal = addressInp.value
  const stateVal = stateInp.value
  const countryVal = countryInp.value
  const cityVal = cityInp.value
  const pinVal = pinInp.value
  const usernameVal = usernameInp.value
  const passwordVal = passwordInp.value

  let isValid =true;

  
  // salutation validation        
  const salutationregex = /^(Mr|Mrs|Ms|Dr|Prof|Mx)$/
  if (!salutationregex.test(salutationVal)) {
    validationerror(salutationInp, "please enter the salutation")
    isValid = false
  }
  else{
    validationsuccess(salutationInp,"success")
  }


  //  first name validation 

  const nameregex = /^[a-zA-Z]{2,50}$/;
  if (!nameregex.test(firstNameVal)) {
    validationerror(firstNameInp, "please enter your first name")
     isValid = false

  }
  else {
   validationsuccess(firstNameInp,"success")

  }

  // last name validation 

  const lastNameregex = /^[a-zA-Z]{1,50}$/;
  if (!lastNameregex.test(lastNameVal)) {
    validationerror(lastNameInp, "please enter your last name")
     isValid = false
  }

  else {
    validationsuccess(lastNameInp,"success")
  }


  // email validation 
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailregex.test(emailVal)) {
    validationerror(emailInp, "please enter your email")
     isValid = false
  }

  else{
    validationsuccess(emailInp,"success")
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
   isValid = false
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








  let formatedDob = dobVal.split('-').reverse().join('-')

  const formData = new FormData();
  formData.append("salutation", salutationVal);
  formData.append("firstName", firstNameVal);
  formData.append("lastName", lastNameVal);
  formData.append("email", emailVal);
  formData.append("phone", mobileVal);
  formData.append("dob", formatedDob);
  formData.append("gender", genderVal);
  formData.append("qualifications",qualificationVal);
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
  console.log(input , message);
  
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



    //  create employee 

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





       // delete employee 



// document.querySelector("#tableBody").addEventListener('click', function(event) {
//   if (event.target.id === "delete") {
//     const row = event.target.closest("tr");
//     const employeeId = row.querySelector(".employee-id").textContent; // Use correct identifier

//     fetch(`http://localhost:3000/employees/${employeeId}`, {
//       method: "DELETE",
//     })
//     .then(response => {
//       if (response.ok) {
//         row.remove(); // Remove row from table after successful deletion
//       } else {
//         alert("Error deleting employee");
//       }
//     })
//     .catch(error => {
//       console.error("Error deleting employee:", error);
//       alert("Error occurred while deleting.");
//     });
//   }
// });
