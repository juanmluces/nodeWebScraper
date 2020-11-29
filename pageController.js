const pageScraper = require('./pageScraper');


const scrapeAll = async (browserInstance) => {
  let browser;
  try {
    browser = await browserInstance;
    await pageScraper.scraper(browser);
    await browser.close();
  } catch (error) {
    console.log("Could not resolve the browser instance => ", error);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)

/*
Este código exporta una función que toma la instancia de navegador y la pasa a otra función denominada scrapeAll(). Esta función, a su vez, pasa la instancia como argumento a pageScraper.scraper(), que la utiliza para extraer datos de las páginas.
 */