const axios = require('axios')
const cheerio = require('cheerio')

const SELECTORS = [
  '#headerCursus > span.psbGroteTekst',
  '#cursStudiepunten > td:nth-child(3)',
  '#cursCategorie > td:nth-child(3)',
  '#cursCursustype > td:nth-child(3)',
  '#cursAangeboden > td:nth-child(3)',
  '#cursContactpersoon > td:nth-child(3)',
  '#cursAanvangsblok > td:nth-child(3) > table > tbody > tr > td:nth-child(1) > span'
]

class Scrapper {
  static async requestResource(id) {
    URL = `https://osiris.tue.nl/osiris_student_tueprd/OnderwijsCatalogusSelect.do?selectie=cursus&collegejaar=2020&cursus=${id}&taal=en`
    
    try{
      const res = await axios.get(URL)
      return await Scrapper.scrapContent(res.data)
    } catch(e) {
      console.log(e)
    }
  }
  
  static scrapContent(res) {
    const $ = cheerio.load(res)
  
    return Object.assign({} ,$(`${SELECTORS[0]}, ${SELECTORS[1]}, ${SELECTORS[2]}, ${SELECTORS[3]}, ${SELECTORS[4]}, ${SELECTORS[5]}, ${SELECTORS[6]}, ${SELECTORS[7]}`)
    .map((_idx, el) => {
      return $(el).text()
    }).get())
  }
}

module.exports = Scrapper