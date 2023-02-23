export function addUserCoinsLocalStorage(coinsAmount) {
  const newUserInformations = JSON.parse(localStorage.getItem('user'));
  newUserInformations.coins = Number(newUserInformations.coins) + Number(coinsAmount);

  localStorage.setItem('user', JSON.stringify(newUserInformations));
}

export function removeUserCoinsLocalStorage(coinsAmount) {
  const newUserInformations = JSON.parse(localStorage.getItem('user'));
  newUserInformations.coins = Number(newUserInformations.coins) - Number(coinsAmount);

  localStorage.setItem('user', JSON.stringify(newUserInformations));
}
