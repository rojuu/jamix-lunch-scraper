# jamix-lunch-scraper

Web scraper for Kajaani University of Applied Science's Jamix lunch menus. Built using Node.js.

## Usage
Setup using ´npm install´. Run using ´npm start´. The final ´contents´ array contains objects with ´title´ having either "Lounas", "Kasvislounas", "Annoslounas", or something like that, and ´contents´ containting an array of the actual lunch food items.

## Dependencies
Using puppetteer for rendering and scraping, because jamix is built with some dynamic js magic, so we need a chromium instance to render it.
