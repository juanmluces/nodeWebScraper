const start = async () => {

  const browserObject = require('./browser');
  const scraperController = require('./pageController');

  //Lazna el navegador y crea una instancia de browser
  let browserInstance = await browserObject.startBrowser();

  // Pasa la instancia del browser al controlador del scraper
  await scraperController(browserInstance);
}

module.exports = start;
