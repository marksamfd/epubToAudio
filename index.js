const EPub = require("epub");
const fs = require("fs")
const cheerio = require('cheerio');
const puppeteer = require("puppeteer")
const { JSDOM } = require("jsdom");
const { xml2json } = require("./xml2json")
const tts = require("./cmd1");
const downloadFromTTS = require("./utils/downloadFromTTS");
let epub = new EPub(`./rich.epub`, "/imagewebroot/", "/articlewebroot/");
let currentChapter = 10
epub.on('end', function () {
    console.log(epub.metadata.title)
    epub.getChapterRaw(epub.spine.contents[currentChapter].id, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        console.log("\nFIRST CHAPTER:\n");


        const { document } = (new JSDOM(data,/* {contentType:"application/xhtml+xml"} */)).window
        const allParagraphs = Array.from(document.querySelectorAll("p"))
        var p = []
        console.log("success1")

        allParagraphs.slice(0, 10).forEach(async (el, id) => {
            p.push(downloadFromTTS.bind(el.textContent, currentChapter, id))
        })
        console.log("pushed success")
        Promise.all(p).then(() => {
            console.log("success")
        })
    })
})
epub.on('error', function (err) {
    throw err
})

epub.parse()
