const fs = require('fs');
const https = require('https');
const path = require('path');

const sources = [
  'https://cdn.jsdelivr.net/gh/benetech/diagram-svg-worldmap@master/worldmap.svg',
  'https://cdn.jsdelivr.net/gh/simonepri/geo-maps@master/prebuilt/world-countries-110m.svg',
  'https://cdn.jsdelivr.net/gh/lucashal/react-world-map@master/src/components/WorldMap/world-map.svg',
  'https://cdn.jsdelivr.net/gh/leakyMirror/map-of-europe@master/world.svg'
];

const outputPath = path.join(__dirname, '../client/public/world-map.svg');

const tryDownload = (index) => {
  if (index >= sources.length) {
    console.error('\x1b[31m[Error] All world map JSDelivr proxy sources failed to download!\x1b[0m');
    process.exit(1);
  }

  const targetUrl = sources[index];
  console.log(`Trying JSDelivr Proxy Source [${index + 1}/${sources.length}]: ${targetUrl}`);

  https.get(targetUrl, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`\n\x1b[32m[Success] Edge-to-edge World map SVG successfully saved locally from JSDelivr Proxy ${index + 1}!\x1b[0m`);
        console.log('Saved to:', outputPath);
        process.exit(0);
      });
    } else {
      console.log(`Proxy Source ${index + 1} failed with status: ${res.statusCode}. Trying next source...`);
      tryDownload(index + 1);
    }
  }).on('error', (err) => {
    console.log(`Proxy Source ${index + 1} encountered error: ${err.message}. Trying next source...`);
    tryDownload(index + 1);
  });
};

tryDownload(0);
