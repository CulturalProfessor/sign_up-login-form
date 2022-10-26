console.log("hey");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const passord = document.getElementById("password");
let validUser = false;
let validPhone = false;
let validEmail = false;
$("#success").hide();
$("#failure").hide();
// console.log(name,email,phone);
username.addEventListener("blur", () => {
  console.log("name is blurred");
  //validate name here
  let regex = /^[a-zA-Z][(0-9a-zA-Z)]{2,10}$/;
  let str = username.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("Your name is valid");
    username.classList.remove("is-invalid");
    validUser = true;
  } else {
    console.log("Your name is not valid");
    username.classList.add("is-invalid");
    validUser = false;
  }
});
email.addEventListener("blur", () => {
  console.log("email is blurred");
  //validate email here
  let regex = /^([_\-\.a-zA-Z0-9]+)@([_\-\.a-zA-Z0-9]+)\.([a-zA-Z]){2,7}$/;
  let str = email.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("Your email is valid");
    email.classList.remove("is-invalid");
    validEmail = true;
  } else {
    console.log("Your email is not valid");
    email.classList.add("is-invalid");
    validEmail = false;
  }
});
phone.addEventListener("blur", () => {
  console.log("phone is blurred");
  //validate phone here
  let regex = /^([0-9]){10}$/;
  let str = phone.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("Your phone is valid");
    phone.classList.remove("is-invalid");
    validPhone = true;
  } else {
    console.log("Your phone is not valid");
    phone.classList.add("is-invalid");
    validPhone = false;
  }
});

//Login
const submit = document.getElementById("submit");
submit.addEventListener("click", login);
async function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const result = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      phone,
      password,
    }),
  }).then((res) => res.json());

  console.log("You clicked on submit");
  console.log(validUser, validEmail, validPhone);
  if (validEmail && validUser && validPhone && result.status === "ok") {
    console.log("Phone,email,username are valid");
    console.log("Got the token: ", result.data);
    let failure = document.getElementById("failure");
    let success = document.getElementById("success");
    success.classList.add("show");
    // failure.classList.remove("show");
    $("#failure").hide();
    $("#success").show();
  } else {
    console.log("one of Phone,email,username is invalid");
    let failure = document.getElementById("failure");
    let success = document.getElementById("success");
    failure.classList.add("show");
    // success.classList.remove("show");
    $("#success").hide();
    $("#failure").show();
  }
};
