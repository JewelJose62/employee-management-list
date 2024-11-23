const add = document.getElementById("add_emp")
const modal = document.getElementById('employeeModal');
const closeModalButton = document.getElementById('closeModalbutton')
// const submitBtn = document.querySelector("#submit")
// employeeModal=Document.querySelector("#employeeModal")



add.addEventListener('click', function () {
  modal.style.display = 'block';
  modal.setAttribute("aria-hidden", "false");
  // submitBtn.body.display = 'submit';
  // employeeModal.innerHTML="employeeModalLabel"
});

closeModalButton.addEventListener('click', function () {
  modal.style.display = 'none';
  modal.setAttribute("aria-hidden", "true");

});



// fetching 

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
    employees.forEach((element, index) => {

      column +=
        ` <tr>
              <td scope="row">#0 ${index}</td>
              <td>${element.salutation} ${element.firstName} ${element.lastName}</td>
              <td>${element.email}</td>
              <td>${element.phone}</td>
              <td>${element.gender}</td>
              <td>${element.dob}</td>
              <td>${element.country}</td>
            </tr>`
    });

    tableBody.innerHTML = column;
  }

  catch (error) {
    console.log("Error fetching employee data :", error);

  }
}

fetchEmployees();



//  validation

const form = document.getElementById("add_employee")
// const  upload = document.querySelector("#upload")
const inputSalutation = document.getElementById("salutation")
const inputname = document.getElementById("firstName")
const inputlastname = document.querySelector("#lastName")
const email = document.querySelector("#email")
const mobile = document.querySelector("#phone")
const dob = document.querySelector("#dob")
const gender = document.querySelector("#gender")
const qualification = document.querySelector("#qualification")
const address = document.querySelector("#address")
const country = document.querySelector("#country")
const state = document.querySelector("#state")
const city = document.querySelector("#city")
const pin = document.querySelector("#inputPin")
const username = document.querySelector("#username")
const password = document.querySelector("#password")
const cancel = document.querySelector("#cancel")
const submit = document.querySelector("#submit")

// add event 
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validation();
})

// document.getElementById('add_employee').addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent the default form submission

//   const formData = new FormData(this);

//   fetch('http://localhost:3000/employees', {
//       method: 'POST',
//       body: formData
//   })
//   .then(response => response.json())
//   .then(data => {
//       console.log('Success:', data);
//   })
//   .catch((error) => {
//       console.error('Error:', error);
//   });
// });




// define the validate function

function validation() {

  // const upload = upload.value.trim()
  const salutationvalue = inputSalutation.value
  const namevalue = inputname.value.trim()
  const lastnameval = inputlastname.value.trim()
  const emailval = email.value.trim()
  const mobileval = mobile.value.trim()
  const dobval = dob.value
  const genderval = gender.value
  const qualificationval = qualification.value.trim()
  const addressval = address.value.trim()
  const countryval = country.value
  const stateval = state.value
  const cityval = city.value.trim()
  const pinval = inputPin.value.trim()
  const usernameval = username.value.trim()
  const passwordval = password.value.trim();



  // salutation validation        

  const salutationregex = /^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.|Mx\.)$/
  if (!salutationregex.test(salutationvalue)) {
    validationerror(inputSalutation, "please choose the salutation")
  }
  else {
    validationsuccess(inputSalutation, "success")
  }


  //  first name validation 

  const nameregex = /^[a-zA-Z]{2,50}$/;
  if (!nameregex.test(namevalue)) {
    validationerror(inputname, "please enter your first name")
    console.log("hello");

  }
  else {
    validationsuccess(inputname, "success")
  }



  // last name validation 

  const lastNameregex = /^[a-zA-Z]{1,50}$/;
  if (!lastNameregex.test(lastnameval)) {
    validationerror(inputlastname, "please enter your last name")
  }

  else {
    validationsuccess(inputlastname)
  }


  // email validation 

  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailregex.test(emailval)) {
    validationerror(email, "please enter your email")
  }
  else {
    validationsuccess(email)
  }


  //  phone validation 

  const phoneregex = /^\+?[0-9\s\-()]{10,20}$/;

  if (!phoneregex.test(mobileval)) {
    validationerror(mobile, "enter your phone number")
  }
  else {
    validationsuccess(mobile)
  }


  // address validation

  const addressregex = /^[a-zA-Z0-9\s,.'#-]{5,}$/;
  if (!addressregex.test(addressval)) {
    validationerror(address, "enter your address")
  }

  else {
    validationsuccess(address)
  }

  //  qualification validation
  const qualificationsregex = /^[a-zA-Z0-9\s,.'-]{2,50}$/;
  if (!qualificationsregex.test(qualificationval)) {
    validationerror(qualification, "enter your qualification")
  }

  else {
    validationsuccess(qualification)
  }



  // dob validation 
  const dobregex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if (!dobregex.test(dobval)) {
    validationerror(dob, "enter your date of birth")
  }

  else {
    validationsuccess(dob)
  }

  // pin validation 


  const pinRegex = /^[1-9][0-9]{5}$/;
  if (!pinRegex.test(pinval)) {
    validationerror(pin, "enter the pin")
  }

  else {
    validationsuccess(pin)
  }




  // country validation


  if (countryval === "") {
    validationerror(country, "enter your country")
  }
  else {
    validationsuccess(country, "success")
  }



  // state validation

  if (stateval === "") {
    validationerror(state, "enter your state")
  }
  else {
    validationsuccess(state)
  }


  //  city validation 

  const cityregex = /^[A-Za-z\s.'-]+$/;

  if (!cityregex.test(cityval)) {
    validationerror(city, "enter your city")
  }

  else {
    validationsuccess(city)
  }


  // username validation 

  const usernameRegex = /^[a-zA-Z0-9_\.]+$/;

  

  if (!usernameRegex.test(usernameval)) {
    validationerror(username, "enter the username")
  }
  else {
    validationsuccess(username)
  }


  // password validation 

  const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  

  if (!passwordregex.test(passwordval)) {
    validationerror(password, "enter the password")
  }
  
  else {
    validationsuccess(password)
  }


// gender validation 


if (genderval !== "male" && genderval !== "female") {
  validationerror(gender, "please select your gender");
} else {
  validationsuccess(gender);
}





}

function validationerror(input, message) {
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
  const info = input.parentElement
  const span = info.querySelector("span")
  span.innerHTML = message;
  span.style.display = "none";
  input.style.setProperty("border-color", 'green')
  // const icon=info.querySelector(".icon")
  // icon.classList.add("fa-solid fa-circle-check");
  // icon.style.color="green";
  // icon.style.display="inline-block";

}







// form.addEventListener("submit", async (event) => {
//   event.preventDefault(); // Prevent default form submission
//   const formData = new FormData(form); // Gather form data

//   try {
//     const response = await fetch("http://localhost:3000/employees", {
//       method: "POST",
//       body: formData
//     });

//     if (response.ok) {
//       alert('Employee added successfully');
//       modal.style.display = 'none'; // Close modal after success
//       modal.setAttribute("aria-hidden", "true");
//       fetchEmployees(); // Fetch the updated employee list
//     } else {
//       throw new Error('Error adding employee');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('Error submitting form. Please try again.');
//   }
// });
































































