const fs = require('fs');

const scraperObject = {
  url: 'https://soysuper.com/marca/mercadona?products=1&page=1&category=perfumeria-y-parafarmacia#products',
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // Navega a la pagina
    await page.goto(this.url);
    // Esperar a que el DOM requerido sea renderizado
    await page.waitForSelector('#page');
    // Recupera el link a todos los libros que queremos
    let urls = await page.$$eval('ul.productlist > li', links => {

      // Extraemos los links de la data
      links = links.map(el => el.querySelector('p > a').href)
      return links;
    });

    // Recorre todos los links(urls), abre una nueva instancia de pagina y recupera la informacion relevante de cada pagina
    let pagePromise = (link) => new Promise(async (resolve, reject) => {
      let dataObj = {};
      let newPage = await browser.newPage();
      await newPage.goto(link);
      dataObj['marca'] = await newPage.$eval('section.product > h1 > a', text => text.textContent.replace(/\n/g, '').trim());
      dataObj['nombre'] = await newPage.$eval('section.product > h1', text => text.innerText.split('\n')[1].replace(/\s\s+/g, ' ').trim());
      try {
        dataObj['imageUrl'] = await newPage.$eval('a.img > img', img => img.src);
      } catch (error) {
        dataObj['imageUrl'] = null;
      }
      dataObj['precio'] = await newPage.$eval('span.price strong', text => text.textContent.replace(/\n/g, '').trim());
      dataObj['descripcion'] = await newPage.$eval('span.price', text => text.textContent.split('/')[1].replace(/\n/g, '').trim());
      dataObj['categoria'] = 4;

      resolve(dataObj);
      await newPage.close();
    });


    for (link in urls) {
      let currentPageData = await pagePromise(urls[link]);
      console.log(currentPageData);
      currentPageData = JSON.stringify(currentPageData) + ',';
      fs.appendFile("datos/bebidas.json", currentPageData, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }

    await page.close();


  }


}

module.exports = scraperObject;