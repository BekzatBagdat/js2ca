/*API URL*/
const API_BASE_URL = "https://api.noroff.dev";

/*DOMs*/
const loginForm = document.querySelector(".login-form");

const loginUser = (e) => {
  /*Prevent default*/
  e.preventDefault();

  /*user data*/
  let userData;

  /*DOMs*/
  const email = document.querySelector("#logEmailInput").value;
  const password = document.querySelector("#logPasswordInput").value;
  const loginMessageContainer = document.querySelector("#loginMessageDiv");

  /*Function  Valdidating the form during the register*/
  const formValidation = () => {
    /*Empty Field Checker and data validator*/
    let formValid = true;

    if (email.trim() === "") {
      loginMessageContainer.innerHTML = `<p class="mt-1" style="color:rgb(178, 119, 0)">Please fill in the Email field ⚠️</p>`;
      formValid = false;
    }
    if (formValid === true) {
      loginMessageContainer.innerHTML = "";
      userData = {
        email: email,
        password: password,
      };
    }
  };
  formValidation();

  /*POST login  API*/
  const logUser = async (url, userData) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const json = await res.json();
      console.log(json);
      const accessToken = json.accessToken;
      if (accessToken === undefined) {
        loginMessageContainer.innerHTML = `<p class="mt-1" style="color:rgb(178, 0, 0)">Wrong Email or Password, please try again</p>`;
      }
      if (accessToken) {
        loginMessageContainer.innerHTML = " ";
      }
      if (json.ok) {
        localStorage.setItem("accessToken", accessToken);
      }
    } catch (error) {
      loginMessageContainer.innerHTML = `<p class="mt-1" style="color:rgb(178, 0, 0)">An Error has Occured during the registration 😔 ${error}</p>`;
    }
  };
  const loginURL = API_BASE_URL + "/api/v1/social/auth/login";
  logUser(loginURL, userData);
};

//////////////////////////////////////////////////////////////////////////////////
/*Run the login function if it exist in the document*/
const runUserLogin = () => {
  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
  }
};

export { runUserLogin };
