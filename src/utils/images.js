export function getColors(ctx, canvas) {
  var col,
    colors = {};
  var pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (var i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3]; // alpha
    // skip pixels >50% transparent
    if (a < 255 / 2) continue;
    col = rgbToHex(r, g, b);
    if (!colors[col]) colors[col] = 0;
    colors[col]++;
  }
  return colors;
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw new Error('Invalid color component');
  return ((r << 16) | (g << 8) | b).toString(16);
}

/**
 * Calculate the brightness of an image, final value will be between 0 (darkest) and 255 (brightest).
 * Source: https://stackoverflow.com/a/13763063
 * @param {object} ctx canvas context
 * @param {object} canvas html canvas element
 * @returns integer
 */
export function getBrightness(ctx, canvas) {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  var r, g, b, avg;

  var colorSum = 0;
  for (var x = 0, len = data.length; x < len; x += 4) {
    r = data[x];
    g = data[x + 1];
    b = data[x + 2];

    avg = Math.floor((r + g + b) / 3);
    colorSum += avg;
  }

  return Math.floor(colorSum / (canvas.width * canvas.height));
}

export function getCornerBrightness(ctx, canvas) {
  var imageData = ctx.getImageData(
    canvas.width * 0.79,
    canvas.height * 0.01,
    canvas.width * 0.2,
    canvas.height * 0.2
  );
  var data = imageData.data;
  var r, g, b, avg;

  var colorSum = 0;
  for (var x = 0, len = data.length; x < len; x += 4) {
    r = data[x];
    g = data[x + 1];
    b = data[x + 2];

    avg = Math.floor((r + g + b) / 3);
    colorSum += avg;
  }

  return Math.floor(colorSum / (canvas.width * 0.2 * canvas.height * 0.2));
}
