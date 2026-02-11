const https = require('https');
const http = require('http');

const urlsToCheck = [
  'https://volt-bike-rental.com',
  'https://volt-bike-rental.com/es',
  'https://volt-bike-rental.com/de',
  'https://volt-bike-rental.com/logo.png',
  'https://volt-bike-rental.com/search?q=test',
  'https://www.instagram.com/voltbikerental',
  'https://www.google.com/maps/place/Volt+Bike+Rental'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, (res) => {
      resolve({
        url: url,
        status: res.statusCode,
        accessible: res.statusCode < 400
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url: url,
        status: 'ERROR',
        accessible: false,
        error: err.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url: url,
        status: 'TIMEOUT',
        accessible: false,
        error: 'Request timeout'
      });
    });
  });
}

async function checkAllUrls() {
  console.log('🔍 Перевірка доступності URL-ів...\n');
  
  for (const url of urlsToCheck) {
    const result = await checkUrl(url);
    
    if (result.accessible) {
      console.log(`✅ ${result.url} - OK (${result.status})`);
    } else {
      console.log(`❌ ${result.url} - НЕДОСТУПНИЙ (${result.status})`);
      if (result.error) {
        console.log(`   Помилка: ${result.error}`);
      }
    }
  }
  
  console.log('\n📝 Рекомендації:');
  console.log('1. Перевірте, чи існує домен volt-bike-rental.com');
  console.log('2. Створіть відповідні сторінки для /es та /de');
  console.log('3. Додайте правильний logo.png');
  console.log('4. Перевірте соціальні мережі');
  console.log('5. Використовуйте реальні URL-и замість placeholder-ів');
}

checkAllUrls();
