/*DOMS*/
const setProfileData = () => {
  const profileUserName = document.querySelector("#profileUserName");
  const userNameToken = localStorage.getItem("username");
  console.log(userNameToken);
  if (profileUserName) {
    profileUserName.innerHTML = `@${userNameToken.toLowerCase()}`;
  }
};

export { setProfileData };
