'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SMALL_RADIUS = 10;
var BIG_RADIUS = 50;
var GAP = 10;
var GAP_X = 30;
var GAP_Y = 20;
var BAR_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var BAR_GAP = 50;
var FONT_COLOR = '#000';
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x - BIG_RADIUS, y + CLOUD_HEIGHT / 2, x, y + CLOUD_HEIGHT);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH / 4, y + CLOUD_HEIGHT + SMALL_RADIUS, x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH * 3 / 4, y + CLOUD_HEIGHT + SMALL_RADIUS, x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH + BIG_RADIUS, y + CLOUD_HEIGHT / 2, x + CLOUD_WIDTH, y);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH * 3 / 4, y - SMALL_RADIUS, x + CLOUD_WIDTH / 2, y);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH / 4, y - SMALL_RADIUS, x, y);
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();
};

var getMaxResult = function (times) {
  var maxResult = times[0];
  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxResult) {
      maxResult = times[i];
    }
  }
  return maxResult;
};

var getColorByName = function (name) {
  var color = PLAYER_COLOR;
  if (name !== 'Вы') {
    var saturation = Math.round(Math.random() * 100);
    color = 'hsla(240, ' + saturation + '%, 50%, 1)';
  }
  return color;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxResult(times);

  ctx.fillStyle = FONT_COLOR;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_X, CLOUD_Y + GAP_Y);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_X, CLOUD_Y + 2 * GAP_Y);

  for (var i = 0; i < names.length; i++) {
    var columnHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var playerPositionX = CLOUD_X + 2 * GAP_X + (COLUMN_WIDTH + BAR_GAP) * i;

    ctx.fillText(Math.round(times[i]), playerPositionX, CLOUD_Y + 3.5 * GAP_Y + (BAR_HEIGHT - columnHeight));
    ctx.fillStyle = getColorByName(names[i]);
    ctx.fillRect(playerPositionX, CLOUD_Y + 4.5 * GAP_Y + (BAR_HEIGHT - columnHeight), COLUMN_WIDTH, columnHeight);
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(names[i], playerPositionX, CLOUD_Y + BAR_HEIGHT + 5 * GAP_Y);
  }
};
