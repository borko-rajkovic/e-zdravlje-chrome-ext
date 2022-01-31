const loginsKey = "ezdravlje.chrome-ext.logins";
const configKey = "ezdravlje.chrome-ext.config";
const newLoginKey = "ezdravlje.chrome-ext.new_login";

let logins = {};
let newLogin = {};
let config = {
  rememberNew: true,
  rememberPIN: true,
};

const _loadFromStorage = (key, target, _storeCallback) => {
  try {
    const storageData = JSON.parse(localStorage.getItem(key));
    if (!storageData) {
      throw new Error("Empty!");
    }
    Object.assign(target, storageData);
  } catch (error) {
    _storeCallback(target);
  }
};

const _loadLogins = () => {
  _loadFromStorage(loginsKey, logins, storeLogins);
};

const _loadConfig = () => {
  _loadFromStorage(configKey, config, storeConfig);
};

const _loadNewLogin = () => {
  _loadFromStorage(newLoginKey, newLogin, storeNewLogin);
};

const storeLogins = (logins) => {
  localStorage.setItem(loginsKey, JSON.stringify(logins));
};

const storeConfig = (config) => {
  localStorage.setItem(configKey, JSON.stringify(config));
};

const storeNewLogin = (newLogin) => {
  localStorage.setItem(newLoginKey, JSON.stringify(newLogin));
};

const _removeLogins = () => {
  storeLogins({});
};

const removeNewLogin = () => {
  storeNewLogin({});
};

_loadLogins();
_loadConfig();
_loadNewLogin();

const loginsKeys = () => {
  return Object.keys(logins);
};
