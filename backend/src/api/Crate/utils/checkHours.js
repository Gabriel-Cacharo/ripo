const dayjs = require('dayjs');

async function checkHours(lastRedeemCrateHours) {
  const dateUserLastRedeemCrateWithHours = dayjs(lastRedeemCrateHours).add(process.env.HOURS_TO_REDEEM_CRATE, 'hours');
  const dateNow = dayjs();

  let totalSeconds = dateUserLastRedeemCrateWithHours.diff(dateNow, 'seconds');
  let totalHours;
  let totalMinutes;

  totalHours = Math.floor(totalSeconds / (60 * 60));
  totalSeconds = totalSeconds - totalHours * 60 * 60;
  totalMinutes = Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds - totalMinutes * 60;

  if (totalHours <= 0) {
    totalHours = 0;
    totalMinutes = 0;
  }

  return [totalHours, totalMinutes];
}

module.exports = { checkHours };
