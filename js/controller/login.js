loginPage.placeForNames().classList.add("ezdravlje-chrome-ext__brand-wrapper");
loginPage.placeForNames().append(createElementFromHTML(templateSelectList));

if (loginsKeys().length === 0) {
  loginPage
    .placeForNames()
    .parentNode.prepend(createElementFromHTML(templateAlertEmptyUserList));
}

const refreshUserList = () => {
  loginPage.userList().innerHTML = defaultOptionSelectList;

  loginsKeys().forEach((key) => {
    loginPage
      .userList()
      .appendChild(
        createElementFromHTML(templateOption(key, logins[key].name))
      );
  });

  loginPage.userList().addEventListener("change", (event) => {
    const newKey = event.currentTarget.value;
    if (newKey == 0) {
      loginPage.userName().value = "";
      loginPage.PIN().value = "";
      return;
    }
    loginPage.userName().value = newKey;
    loginPage.PIN().value = logins[newKey].PIN || "";
  });

  loginPage.userName().addEventListener("keyup", (event) => {
    if (loginsKeys().includes(event.currentTarget.value)) {
      loginPage.userList().value = event.currentTarget.value;
    } else {
      loginPage.userList().value = 0;
    }
  });
};

loginPage.loginButton().addEventListener("click", () => {
  if (loginsKeys().includes(loginPage.userName().value)) {
    return;
  }

  if (!config.rememberNew) {
    return;
  }

  const newLogin = { userName: loginPage.userName().value };

  if (config.rememberPIN) {
    newLogin.PIN = loginPage.PIN().value;
  }

  storeNewLogin(newLogin);
});

const refreshUsersTable = () => {
  loginPage.usersTableBody().innerHTML = "";

  loginsKeys().forEach((username, index) => {
    const newRow = createTableRowFromHTML(
      templateTableRow(
        index + 1,
        logins[username].name,
        username,
        logins[username].PIN
          ? [...logins[username].PIN].map(() => "*").join("")
          : ""
      )
    );

    loginPage.usersTableBody().appendChild(newRow);
  });

  [...loginPage.eyeToggleButtons()].forEach((eyeToggleButton) => {
    eyeToggleButton.addEventListener("click", (event) => {
      const pinSpan = event.currentTarget.parentNode.querySelector("span");
      const icon = event.currentTarget.querySelector("i");

      const username = pinSpan.parentNode.parentNode.querySelector(
        ".users-table__username"
      ).innerText;

      if ([...pinSpan.innerText].every((x) => x === "*")) {
        pinSpan.innerText = logins[username].PIN;
        icon.classList.add("fa-eye");
        icon.classList.remove("fa-eye-slash");
      } else {
        icon.classList.add("fa-eye-slash");
        icon.classList.remove("fa-eye");
        pinSpan.innerText = [...logins[username].PIN].map(() => "*").join("");
      }
    });
  });

  [...loginPage.removePasswordButtons()].forEach((removePasswordButton) => {
    removePasswordButton.addEventListener("click", (event) => {
      const pinSpan = event.currentTarget.parentNode.querySelector("span");

      const username = pinSpan.parentNode.parentNode.querySelector(
        ".users-table__username"
      ).innerText;

      delete logins[username].PIN;

      storeLogins(logins);
      refreshUsersTable();
      refreshUserList();
    });
  });

  [...loginPage.removeUserButtons()].forEach((removeUserButton) => {
    removeUserButton.addEventListener("click", (event) => {
      const username = event.currentTarget.parentNode.parentNode.querySelector(
        ".users-table__username"
      ).innerText;

      delete logins[username];

      storeLogins(logins);
      refreshUsersTable();
      refreshUserList();
    });
  });
};

const refreshConfig = () => {
  config.rememberNew = loginPage.configRememberNewLogins().checked;

  if (!config.rememberNew) {
    loginPage.configRememberPINs().setAttribute("disabled", true);
  } else {
    loginPage.configRememberPINs().removeAttribute("disabled");
  }

  config.rememberPIN = loginPage.configRememberPINs().checked;

  storeConfig(config);
};

const loadConfig = () => {
  loginPage.configRememberNewLogins().checked = config.rememberNew;

  if (!config.rememberNew) {
    loginPage.configRememberPINs().setAttribute("disabled", true);
  } else {
    loginPage.configRememberPINs().removeAttribute("disabled");
  }

  loginPage.configRememberPINs().checked = config.rememberPIN;
};

const deleteAllUsers = () => {
  logins = {};
  storeLogins(logins);
  refreshUsersTable();
  refreshUserList();
};

loginPage.configRememberNewLogins().addEventListener("click", refreshConfig);
loginPage.configRememberPINs().addEventListener("click", refreshConfig);
loginPage.deleteAllUsers().addEventListener("click", deleteAllUsers);

loadConfig();
refreshUsersTable();
refreshUserList();
