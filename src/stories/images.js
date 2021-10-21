const images = [];

for (let i = 0; i < 24; i++) {
  images.push({
    source: require(`./assets/Anya Taylor Joy/${i + 1}.jpg`).default,
    id: i,
  });
}

export default images;
