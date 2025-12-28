const fs = require('fs');
const pdf = require('pdf-parse');

const file = process.argv[2] || '1.pdf';

try {
  const dataBuffer = fs.readFileSync(file);
  let pdfFn = pdf;
  if (typeof pdfFn !== 'function') {
    try {
      pdfFn = pdf.default || require('pdf-parse/lib/pdf-parse.js');
    } catch (e) {
      // fallback: attempt to inspect
      console.error('Unable to resolve pdf-parse function:', typeof pdf, Object.keys(pdf || {}));
      process.exit(1);
    }
  }

  if (typeof pdfFn !== 'function') {
    console.error('pdf-parse entry is not a function');
    process.exit(1);
  }

  pdfFn(dataBuffer).then(function(data){
    console.log(data.text);
  }).catch(err => {
    console.error('PDF parse error:', err);
    process.exit(1);
  });
} catch (e) {
  console.error('File read error:', e.message);
  process.exit(1);
}
