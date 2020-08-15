let timer = {
  dateTime: new Date(),
  promotions: true,
};

const timerStart = () => {
  if (!localStorage.getItem('timer')) {
    localStorage.setItem('timer', JSON.stringify(timer));
  } else {
    timer = JSON.parse(localStorage.getItem('timer'));
  }

  if (timer.promotions) {
    timerCount(15);
  } else {
    afterTimerEnds();
  }
};

const formatTime = (time) => {
  if (parseInt(time, 10) < 10) {
    return `0${time}`;
  }
  return time;
}

const timerCount = (minutes) => {
  let timeLeft = minutes * 60000;

  const handleTimer = setInterval(() => {
    const now = new Date().getTime();
    const timeDiff = now - Date.parse(timer.dateTime);
    const secLeft = 60 - Math.floor((timeDiff / 1000) % 60);
    const minLeft = minutes - 1 - Math.floor(timeDiff / 60000);

    timeLeft = minutes * 60000 - timeDiff;

    console.log(timeLeft);
    $('#timeLeft').text(`До окончания акции осталось:\n ${formatTime(minLeft)}:${formatTime(secLeft)}`);
    timerCount();
  }, 1000);

  setTimeout(() => {
    clearInterval(handleTimer);
    console.log('handleTimer', handleTimer);

    if (timeLeft < 0) {
      timer.promotions = false;
      localStorage.setItem('timer', JSON.stringify(timer));

      afterTimerEnds();

    }
  }, timeLeft);
};

const afterTimerEnds = () => {
  $('#toast-wrap').hide(500);
  $('#promotionEnd').modal();

  $('#tariffCostOld').remove();
  $('#bestTariffCostOld').remove();

  $('#tariffCostNew').html('3 770&nbsp;<span>руб.</span>');
  $('#bestTariffCostNew').html('5 060&nbsp;<span>руб.</span>');

  renderSum();
  renderItems();
}

const priceByTimer = (type) => {
  switch (type) {
    case 0: {
      if (timer.promotions) {
        return 1990;
      }
      return 3770;
    }
    case 1: {
      if (timer.promotions) {
        return 2490;
      }
      return 5060;
    }
    default: {
      return 0
    }
  }
}

document.addEventListener('DOMContentLoaded', timerStart);
