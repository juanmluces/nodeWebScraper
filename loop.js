let scraper = require('./pageScraper');
const fs = require('fs');
const start = require('./index');

const categoriasYPaginas = [
  {
    categoria: 'category=perfumeria-y-parafarmacia',
    paginas: 44
  },
  {
    categoria: 'congelados',
    paginas: 14
  },
  {
    categoria: 'lacteos-y-huevos',
    paginas: 14
  },
  {
    categoria: 'frescos-y-charcuteria',
    paginas: 17
  },
  {
    categoria: 'panaderia-pasteleria-y-reposteria',
    paginas: 11
  },
  {
    categoria: 'chocolates-y-dulces',
    paginas: 7
  },
  {
    categoria: 'drogueria',
    paginas: 18
  },
  {
    categoria: 'cafes-cacaos-e-infusiones',
    paginas: 6
  },
  {
    categoria: 'conservas-sopas-aceites-y-condimentos',
    paginas: 18
  },
  {
    categoria: 'bebes-y-ninos',
    paginas: 7
  },
  {
    categoria: 'baperitivos',
    paginas: 8
  },
  {
    categoria: 'mascotas',
    paginas: 3
  },
  {
    categoria: 'cereales-y-galletas',
    paginas: 5
  }
]


async function myfunction() {

  fs.appendFile("data.json", '[', 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });
  for (let i = 1; i <= 2; i++) {
    scraper.url = `https://soysuper.com/marca/mercadona?products=1&page=${i}&category=mascotas#products`
    await start();
  }
  fs.appendFile("data.json", ']', 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The data has been scraped and saved successfully! View it at './data.json'");
  });
}

myfunction()
