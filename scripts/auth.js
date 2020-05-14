// ADD ADMIN CLOUD FUNCTIONS
const addAdminRole = functions.httpsCallable('addAdminRole');
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = adminForm['admin-email'].value;
    console.log(adminEmail);
    addAdminRole({ email: adminEmail }).then((result) => {
        console.log(result);
    });
});
// USER STATUS
auth.onAuthStateChanged((user) => {
    if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
            user.admin = idTokenResult.claims.admin;
            setUpUi(user);
        });
        // FIRESTORE GET DATA 
        db.collection('guides').onSnapshot((snapshot) => {
            // passing an array of documents
            setUpGuides(snapshot.docs);
        }, (err) => {
            console.log(err.message);
        });
    } else {
        setUpGuides([]);
        setUpUi();
    }
});
// CREATE GUIDE
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('guides').add({
        // it can be also clled with dot notation createForm.tittle
        tittle: createForm['tittle'].value,
        content: createForm['content'].value
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch((err) => {
        console.log(err.message);
    })
});
// SIGN UP
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    // create user/ async function wich generates a credential token
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        })
        // console.log(cred.user);
    }).then(() => {
        // Close sign up modal and reset
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch((err) => {
        signupForm.querySelector('.error').innerHTML = err.message;
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
        loginForm.querySelector('.error').innerHTML = '';
    }).catch((err) => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });;
});