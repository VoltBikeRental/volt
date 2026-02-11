const puppeteer = require('puppeteer');

async function checkSEO() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    // Перейти на локальну сторінку
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle2' });
    
    // Перевірка основних SEO елементів
    const title = await page.title();
    console.log('📝 Page Title:', title);
    
    const description = await page.$eval('meta[name="description"]', el => el.content).catch(() => 'Not found');
    console.log('📄 Meta Description:', description);
    
    const keywords = await page.$eval('meta[name="keywords"]', el => el.content).catch(() => 'Not found');
    console.log('🔍 Keywords:', keywords);
    
    const ogTitle = await page.$eval('meta[property="og:title"]', el => el.content).catch(() => 'Not found');
    console.log('📱 OG Title:', ogTitle);
    
    const ogDescription = await page.$eval('meta[property="og:description"]', el => el.content).catch(() => 'Not found');
    console.log('📱 OG Description:', ogDescription);
    
    const canonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(() => 'Not found');
    console.log('🔗 Canonical URL:', canonical);
    
    // Перевірка структурованих даних
    const jsonLdScripts = await page.$$eval('script[type="application/ld+json"]', scripts => 
      scripts.map(script => JSON.parse(script.textContent))
    );
    console.log('📊 JSON-LD Scripts:', jsonLdScripts.length);
    
    // Перевірка hreflang
    const hreflangLinks = await page.$$eval('link[hreflang]', links => 
      links.map(link => ({ hreflang: link.hreflang, href: link.href }))
    );
    console.log('🌍 Hreflang Links:', hreflangLinks.length);
    
    // Перевірка семантичних тегів
    const semanticTags = await page.evaluate(() => {
      const tags = ['main', 'section', 'article', 'header', 'nav', 'aside', 'footer'];
      return tags.map(tag => ({
        tag,
        count: document.querySelectorAll(tag).length
      }));
    });
    console.log('🏷️ Semantic Tags:', semanticTags);
    
    // Перевірка заголовків
    const headings = await page.evaluate(() => {
      const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      return headingTags.map(tag => ({
        tag,
        count: document.querySelectorAll(tag).length,
        texts: Array.from(document.querySelectorAll(tag)).map(el => el.textContent.trim()).slice(0, 3)
      }));
    });
    console.log('📰 Headings:', headings);
    
    // Перевірка швидкості завантаження
    const navigationTiming = await page.evaluate(() => JSON.stringify(performance.getEntriesByType('navigation')[0]));
    const timing = JSON.parse(navigationTiming);
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log('⚡ Load Time:', loadTime + 'ms');
    
    console.log('\n🎉 SEO Check Complete!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

checkSEO();
