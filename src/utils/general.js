export function getFaceLocations(image) {
  return image.faces.map((face) => [
    ...face.location,
    image.width,
    image.height,
  ]);
}

export function makeObjectCopy(obj) {
  return Object.assign({}, obj);
}

export function roundOff(num, places) {
  const x = Math.pow(10, places);
  return Math.round(num * x) / x;
}
