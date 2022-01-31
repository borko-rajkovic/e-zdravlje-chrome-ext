const loginPage = {
  placeForNames: () =>
    document.querySelector(
      "body > main > div > div > div > div.col-md-7 > div > div.brand-wrapper"
    ),
  userList: () => document.querySelector("#userList"),
  userName: () => document.querySelector("#username"),
  PIN: () =>
    document.querySelector(
      "body > main > div > div > div > div.col-md-7 > div > form > div.form-group.mb-4 > input"
    ),
  loginButton: () =>
    document.querySelector(
      "body > main > div > div > div > div.col-md-7 > div > form > input.btn.btn-block.login-btn.mb-4"
    ),
  usersTableBody: () => document.querySelector("#usersTableBody"),
  eyeToggleButtons: () => document.querySelectorAll(".users-table__eye-toggle"),
  removePasswordButtons: () =>
    document.querySelectorAll(".users-table__remove-password"),
  removeUserButtons: () =>
    document.querySelectorAll(".users-table__remove-user"),
  configRememberNewLogins: () =>
    document.querySelector("#configRememberNewLogins"),
  configRememberPINs: () => document.querySelector("#configRememberPINs"),
  deleteAllUsers: () => document.querySelector("#deleteAllUsers"),
};

const clientPage = {
  nameSpan: () =>
    document.querySelector(
      "body > div > div > main > div.main-navbar.sticky-top.bg-white > nav > ul > li > header-template-directive > a > span"
    ),

  calendarDiv: () =>
    document.querySelector(
      "#cal > div.card-body.d-flex.flex-column.ng-scope > md-calendar > div > md-calendar-month > div > md-virtual-repeat-container > div > div.md-virtual-repeat-offsetter"
    ),
};
