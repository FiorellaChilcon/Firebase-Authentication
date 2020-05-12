document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
// USER STATUS
auth.onAuthStateChanged((user) => {
  if (user) {   
  console.log(`user logged in: ${user}`);
  } else {
    console.log('user logged out');
  }
})
// SIGN UP
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  // create user/ async function wich generates a credential token
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    // Close sign up modal and reset
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});
// LOG OUT
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  // .then(() => {
  //   console.log('user signed out');
  // });
});
// SIGN IN
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    //  console.log(cred.user); status
    // Close login modal and reset
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});