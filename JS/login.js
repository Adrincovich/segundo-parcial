const form = document.getElementById("form");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
form.addEventListener("submit", validateCredentialsOnSubmit);

function saveCredentialsToLocalStorage(credentials) {
  localStorage.setItem("email", credentials.email);
  localStorage.setItem("pass", credentials.pass);
}

function checkForLoginCredentialsInLocalStorage() {
  return localStorage.getItem("email") && localStorage.getItem("pass");
}

function validateCredentials(credentials) {
  return fetch("https://basic-server-one.vercel.app/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.pass,
    }),
  })
    .then((respuesta) => {
      return respuesta
        .json()
        .then((respuestaJSON) => {
          // Faltan datos
          if (respuestaJSON.success === false) {
            return false;
          }
          // Datos incorrectos
          if (respuestaJSON.error === false) {
            return true;
          }
          return false;
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function validateCredentialsOnSubmit(e) {
  e.preventDefault();
  const credentials = {
    email: email.value,
    pass: pass.value,
  };
  validateCredentials(credentials)
    .then((successStatus) => {
      if (successStatus) {
        saveCredentialsToLocalStorage(credentials)
        window.location.assign('/html/dashboard.html')
      } else {
       // alert("Usuario incorrecto");
        modal.style.display = "block";
       // console.log(successStatus, "todo mal");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

if (checkForLoginCredentialsInLocalStorage()) {
  const credentials = {
    email: localStorage.getItem("email"),
    pass: localStorage.getItem("pass"),
  };

  validateCredentials(credentials)
    .then((successStatus) => {
      if (successStatus) {
        window.location.assign('/html/dashboard.html')
      //  console.log(successStatus, "todo bien");
      } else {
       
       // modal.style.display = "block";
        //console.log(successStatus, "todo mal");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("submit");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//
//email: valeria@gmail.com
//password: lppa2022

// saveCorrectLoginToLocalStorage({
//   email: credentials.value,
//   pass: credentials.value,
// });

// OK
// {error: false, message: 'User logged'}

// NOT OK (WRONG DATA)
// {error: true, message: 'Wrong email or password'}

// NOT OK (MISSING DATA)
// {
//   "success": false,
//   "errors": [
//       {
//           "value": null,
//           "msg": "Password must have only letters and numbers",
//           "param": "password",
//           "location": "body"
//       },
//       {
//           "value": null,
//           "msg": "Name must have more than 7 letters",
//           "param": "password",
//           "location": "body"
//       }
//   ]
// }
