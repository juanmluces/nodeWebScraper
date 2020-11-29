const puppeteer = require('puppeteer');

const startBrowser = async () => {
  let browser;
  try {
    console.log('Opening the browser......');
    // puppeteer.launch() inicia una nueva instancia del navegador chromium de puppeteer (retorna promesa)
    browser = await puppeteer.launch({
      // headless determina si lanzar el navegador con o sin interfaz
      headless: false,
      args: ["--disable-setuid-sandbox"],
      'ignoreHTTPSErrors': true
    });
  } catch (error) {
    console.log(('Could not create a browser instance => : ', error));
  }
  return browser;
}

module.exports = {
  startBrowser
}