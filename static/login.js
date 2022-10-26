console.log("hey");
const username = document.getElementById("username");
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

//Login
const submit = document.getElementById("submit");
submit.addEventListener("click", login);
async function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const result = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());

  console.log("You clicked on submit");
  console.log(validUser, validEmail, validPhone);
  if (validUser && result.status === "ok" && result.data!=="") {
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
