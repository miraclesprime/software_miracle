const fs = require('fs');
const pdf = require('pdf-parse');

const file = process.argv[2] || '1.pdf';

try {
  const dataBuffer = fs.readFileSync(file);
  pdf(dataBuffer).then(function(data){
    console.log(data.text);
  }).catch(err => {
    console.error('PDF parse error:', err);
    process.exit(1);
  });
} catch (e) {
  console.error('File read error:', e.message);
  process.exit(1);
}
