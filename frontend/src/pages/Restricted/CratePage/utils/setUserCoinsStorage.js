export function addUserCoinsLocalStorage(user, coinsAmount, setUserCoinsFunction) {
  user.coins = Number(user.coins) + Number(coinsAmount);

  setUserCoinsFunction(user.coins);
}

export function removeUserCoinsLocalStorage(user, coinsAmount, setUserCoinsFunction) {
  user.coins = Number(user.coins) - Number(coinsAmount);

  setUserCoinsFunction(user.coins);
}
