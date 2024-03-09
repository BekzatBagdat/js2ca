/*Imports*/
import { runUserReg } from "./modules/signup.js";
import { runUserLogin } from "./modules/login.js";
import { setProfileData } from "./modules/profile.js";

/*Register and Login User*/
runUserReg();
runUserLogin();
/*set username to the profile page*/
setProfileData();
