document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const setUpUi = (user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then((doc) => {
      const html = `Logged in as ${user.email} <br>
      ${doc.data().bio}`;
      accountDetails.innerHTML = html;
    })
    // toggle ui elements
    loggedInLinks.forEach((item) => {
      item.style.display = 'block';
    });
    loggedOutLinks.forEach((item) => {
      item.style.display = 'none';
    });
  } else {
    accountDetails.innerHTML = '';
    loggedInLinks.forEach((item) => {
      item.style.display = 'none';
    });
    loggedOutLinks.forEach((item) => {
      item.style.display = 'block';
    });
  }
};
// SET UP GUIDES
const setUpGuides = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
            <li>
                <div class="collapsible-header">${guide.tittle}</div>
                <div class="collapsible-body"><span>${guide.content}</span></div>
            </li>`;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = `<h5>Log In to view Guides!</h5>`;
  }
};