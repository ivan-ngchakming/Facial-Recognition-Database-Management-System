export function getFaceLocations(photo) {
  return photo.faces.map(face => (
    [
      ...face.location,
      photo.width,
      photo.height,
    ]
  ))
}

export function makeObjectCopy(obj) {
  return Object.assign({}, obj);
}

export function roundOff(num, places) {
  const x = Math.pow(10, places);
  return Math.round(num * x) / x;
}