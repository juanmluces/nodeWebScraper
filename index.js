const browserObject = require('./browser');
const scraperController = require('./pageController');

//Lazna el navegador y crea una instancia de browser
let browserInstance = browserObject.startBrowser();

// Pasa la instancia del browser al controlador del scraper
scraperController(browserInstance);

