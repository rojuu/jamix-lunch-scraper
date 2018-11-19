const puppeteer = require('puppeteer')

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const parseFood = () => {
  // Finds separate "squares" inside the page, containing separate lunch menus, such as "Lounas", "Kasvislounas", etc.
  return Array.from(document.querySelectorAll('.v-button-multiline'))
    .map((element) => {
      return {
        // This finds the title inside the element
        title: element.querySelector('.multiline-button-caption-text').textContent,
        // This finds each separate lunch item inside the element 
        contents: Array.from(element.querySelectorAll('.multiline-button-content-text'))
          .map(x => x.querySelector('.item-name').textContent)
      }
    })
}

(async () => {
  const browser = await puppeteer.launch()
  
  const page = await browser.newPage()
  await page.goto('https://www.jamix.fi/ruokalistat/?anro=97440&k=50&mt=4', {waitUntil: 'networkidle2'})
  
  // Clicking on next page button to get a weekday (for testing on the weekends)
  // page.evaluate(() => {
  //   document.querySelector('.v-button-date--next').click()
  // })

  // When we find this element, we can assume the page is loaded.
  await page.waitForSelector('.multiline-button-caption-text')

  const contents1and2 = await page.evaluate(parseFood)
  // Clicks on the "Linjasto 3" button
  await page.evaluate(() => {
    document.querySelector('.v-tabsheet-tabitemcell-first .v-captiontext').click()
  })
  await wait(1000)
  const contents3 = await page.evaluate(parseFood)
  
  //await page.screenshot({path: 'example.png'})

  const contents = contents1and2.concat(contents3);
  
  console.log(contents)
  
  await browser.close()
})()