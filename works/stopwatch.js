let startTime = 0;
let endTime = 0;
let elapsedTime = 0;
let savedTime = 0;
let updateTime;

const startWatch = () => {
  document.querySelector('#error').innerText = '';
  startTime = Date.now();
  updateTime = setInterval(() => {
    let nowTime = Date.now();
    elapsedTime = nowTime - startTime;
    document.querySelector('#elapsed-time').innerText = `計測中... 経過時間 ${Math.floor(elapsedTime / 1000)} (秒)`;
  }, 1000);
}

const stopWatch = () => {
  clearInterval(updateTime);
  if (startTime === 0) {
    console.error('計測開始ボタンが押されていません');
    document.querySelector('#error').innerText = '計測開始ボタンが押されていません';
    return;
  }
  if (document.querySelector('#pause').innerText === '再開') {
    console.error('再開ボタンが押されていません');
    document.querySelector('#error').innerText = '再開ボタンが押されていません';
    return;
  }
  endTime = Date.now();
  elapsedTime = endTime - startTime;
  startTime = 0;
  document.querySelector('#elapsed-time').innerText = `経過時間 ${Math.floor((elapsedTime + savedTime) / 1000)} (秒)`;
  savedTime = 0;
}

const pauseWatch = () => {
  let nowTime = Date.now();
  savedTime += nowTime - startTime;
  elapsedTime = 0;
  document.querySelector('#elapsed-time').innerText = `一時停止中... 経過時間 ${Math.floor(savedTime / 1000)} (秒)`;
  document.querySelector('#pause').innerText = '再開';
}

const restartWatch = () => {
  startTime = Date.now();
  updateTime = setInterval(() => {
    let nowTime = Date.now();
    elapsedTime = nowTime - startTime;
    document.querySelector('#elapsed-time').innerText = `計測中... 経過時間 ${Math.floor((elapsedTime + savedTime) / 1000)} (秒)`;
  }, 1000);
  document.querySelector('#pause').innerText = '一時停止';
}

const toggleUpdate = () => {
  clearInterval(updateTime);
  if (startTime === 0) {
    console.error('計測開始ボタンが押されていません');
    document.querySelector('#error').innerText = '計測開始ボタンが押されていません';
    return;
  }
  if (document.querySelector('#pause').innerText === '一時停止') {
    pauseWatch();
    return;
  }
  if (document.querySelector('#pause').innerText === '再開') {
    restartWatch();
    return;
  }
  console.error('一時停止/再開ボタンがありません');
  document.querySelector('#error').innerText = '一時停止/再開ボタンがありません';
}