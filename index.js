const EPub = require("epub");
const fs = require("fs")
const cheerio = require('cheerio');
const puppeteer = require("puppeteer")
const { JSDOM } = require("jsdom");
const { xml2json } = require("./xml2json")
const tts = require("./cmd1");
const downloadFromTTS = require("./utils/downloadFromTTS");
let currentChapter = 10
const yargs = require("yargs");

const options = yargs
    .usage("Usage: -b <name>")
    .option("b", { alias: "book", describe: "epub Filename", type: "string", demandOption: true })
    .argv;
let epub = new EPub(`./${options.book}`, "/imagewebroot/", "/articlewebroot/");


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
        allParagraphs.forEach(async (el, id) => {
            let str = el.textContent
            str = str.replace("“", '\\"')
            str = str.replace("”", '\\"')
            tts(str, currentChapter, id)
            console.log(`${id}: ${str}`)
        })

    })
})
epub.on('error', function (err) {
    throw err
})

epub.parse()
