/**
 * Contact List app URL based on environment
 * @type {string}
 */
const BaseURL =
  (process.env.NODE_ENV && (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging')) ?
    `https://${window.location.hostname}` : //add s and remove :3001
    `http://${window.location.hostname}:3001`;

const showSnackbar = (data) => {
  let snackbarText = '';
  let snackbarColor = '';
  let snackbar = false;

  if (data) {
    if (data.success !== null && data.success === true && data.message) {
      snackbarText = data.message;
      snackbarColor = 'primary';
    } else if (data.success !== null && data.success === false && data.message) {
      snackbarText = data.message;
      snackbarColor = 'error';
    } else {
      snackbarText = 'Something went wrong';
      snackbarColor = 'error';
    }
  } else {
    snackbarText = 'Server error';
    snackbarColor = 'error';
  }

  snackbar = true;

  return {
    snackbar,
    snackbarColor,
    snackbarText
  }
};

export {
  BaseURL,
  showSnackbar
}
