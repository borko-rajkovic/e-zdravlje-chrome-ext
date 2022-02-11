window.onhashchange = function () {
  if (location.href === "https://www.ezdravlje.me/ezdravlje/client/index#!/") {
    setCalendarScroll();
  }
};

const setCalendarScroll = () => {
  const calendarWaitingInterval = setInterval(() => {
    const calendarDiv = clientPage.calendarDiv();

    if (!calendarDiv) {
      return;
    }

    clearInterval(calendarWaitingInterval);

    clientPage.calendarDiv().style.height = "100%";
    clientPage.calendarDiv().style.overflow = "auto";
  }, 100);
};

setCalendarScroll();

if (newLogin.userName) {
  const userNameWaitingInterval = setInterval(() => {
    const name = clientPage.nameSpan().textContent;

    if (!name) {
      return;
    }

    logins[newLogin.userName] = {
      name,
      PIN: newLogin.PIN,
    };

    storeLogins(logins);
    removeNewLogin();
    clearInterval(userNameWaitingInterval);
  }, 100);
}
