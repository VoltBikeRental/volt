const https = require('https');
const http = require('http');

const urlsToCheck = [
  'https://volt-bike-rental.com',
  'https://volt-bike-rental.com/logo.png',
  'https://www.instagram.com/voltbikerental',
  'https://www.google.com/maps/place/VOLT+Bike+Rental+%7C+Rent+Bike+%26+E-Scooter+Rental+%26+E-Bike+Rental+in+Valencia+%7C+Noleggio+bici+e+scooter+a+Valencia/@39.4675114,-0.3833697,748m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd604f65553bf5af:0xd4cc0dfba18a367e!8m2!3d39.4675114!4d-0.3807948!16s%2Fg%2F11x6p3q9md?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D'
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
  console.log('🔍 Перевірка оновлених URL-ів...\n');
  
  let allGood = true;
  
  for (const url of urlsToCheck) {
    const result = await checkUrl(url);
    
    if (result.accessible) {
      console.log(`✅ ${result.url} - OK (${result.status})`);
    } else {
      console.log(`❌ ${result.url} - НЕДОСТУПНИЙ (${result.status})`);
      if (result.error) {
        console.log(`   Помилка: ${result.error}`);
      }
      allGood = false;
    }
  }
  
  console.log('\n📊 Результат:');
  if (allGood) {
    console.log('🎉 Всі URL-и доступні! SEO розмітка коректна.');
  } else {
    console.log('⚠️  Деякі URL-и недоступні. Потрібні додаткові виправлення.');
  }
}

checkAllUrls();
