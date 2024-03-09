/*API URL*/
const API_BASE_URL = "https://api.noroff.dev";

/*DOMs*/
const regForm = document.querySelector(".reg-form");

/*Function to register user*/
const signUpUser = (e) => {
  /*Prevent default*/
  e.preventDefault();

  /*user data*/
  let userData;

  /*DOMs*/
  const username = document.querySelector("#regUsernameInput").value;
  const email = document.querySelector("#regEmailInput").value;
  const password = document.querySelector("#regPasswordInput").value;
  const confirmPassword = document.querySelector(
    "#RegConfirmPasswordInput"
  ).value;
  const regMessageContainer = document.querySelector("#regMessage");

  /*Function  Valdidating the form during the register*/
  const formValidation = () => {
    /*Function that checks if email contains @noroff.no or @stud.noroff.no*/
    const validateEmail = (email) =>
      email.endsWith("@noroff.no") || email.endsWith("@stud.noroff.no");
    /*Empty Field Checker and data validator*/
    let formValid = true;
    if (confirmPassword.trim() !== password) {
      regMessageContainer.innerHTML = `<p class="mt-1" style="color:rgb(178, 0, 0)">Password does not match ❌</p>`;
      formValid = false;
    }
    if (!validateEmail(email)) {
      regMessageContainer.innerHTML = `<p class="mt-1" style="color:rgb(178, 119, 0)">Email field must contain either @noroff.no or @stud.noroff.no ⚠️</p>`;
      formValid = false;
    }
    if (email.trim() === "") {
      regMessageContainer.innerHTML = `<p class="mt-1" style="color:rgb(178, 119, 0)">Please fill in the Email field ⚠️</p>`;
      formValid = false;
    }
    if (username.trim() === "") {
      regMessageContainer.innerHTML = `<p class="mt-1" style="color:rgb(178, 119, 0)">Please fill in the Username field ⚠️</p>`;
      formValid = false;
    }
    if (formValid === true) {
      regMessageContainer.innerHTML = "";
      userData = {
        name: username,
        email: email,
        password: password,
      };
    }
  };
  formValidation();

  /*POST registered User data API*/
  const regUser = async (url, userData) => {
    try {
      //API Call
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const json = await res.json();
      if (res.ok) {
        regMessageContainer.innerHTML = `<p class="mt-1" style="color:rgb(13, 120, 1)">Account has been created ✅</p>`;
      }
    } catch (error) {
      regMessageContainer.innerHTML = `<p class="mt-1" style="color:rgb(178, 0, 0)">An Error has Occured during the registration 😔 ${error}</p>`;
    }
  };
  const regURL = `${API_BASE_URL}/api/v1/social/auth/register`;
  regUser(regURL, userData);
};

/*Run the user registration function if it exist in the document*/
const runUserReg = () => {
  if (regForm) {
    regForm.addEventListener("submit", signUpUser);
  }
};

export { runUserReg };
