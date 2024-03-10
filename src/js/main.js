/*Imports*/
import { runUserReg as userRegister } from "./modules/signup.js";
import { runUserLogin as userLogin } from "./modules/login.js";
import { setProfileData as userProfile } from "./modules/profile.js";
import {
  getPosts,
  runCreatePosts as createPosts,
  runCreatePosts,
  postURL,
} from "./modules/createpost.js";
/*Register, Login, Profile page functions*/
userRegister();
userLogin();
userProfile();

getPosts(postURL);
runCreatePosts();
