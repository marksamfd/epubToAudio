let AdmZip = require("adm-zip");
let glob = require("glob")
let findFiles = require("./utils/findFiles")
let removeSpaces = require("./utils/removeXmlSpaces")
let fs = require("fs")
const { JSDOM } = require("jsdom");
let convert = require('xml-js');

// reading archives
const zip = new AdmZip("./rich.epub");
// const zipEntries = zip.getEntries();
zip.extractAllTo(/*target path*/ "./book/", /*overwrite*/ true);

const chaptersHtmlDir = []
const allChaptersHtml = [];
let tocDir = findFiles("./book", ".ncx")
fs.readFileSync(`./${tocDir}`, 'utf8')
function removeHref(str) {
    let mystr = str
    mystr = mystr.replace(/#([A-Za-z])\w+/g, "")
    return mystr
}

(err, content) => {
    let Xmlcontent = removeSpaces(content)
    let tocContent = JSON.parse(convert.xml2json(Xmlcontent, { compact: true, spaces: 4 }));
    tocContent.ncx.navMap.navPoint.forEach(dir => {
        chaptersHtmlDir.push(removeHref(dir.content._attributes.src))
    });
    console.log(chaptersHtmlDir)
    chaptersHtmlDir.forEach(el => {
        fs.readFileSync(`${__dirname}/book/OEBPS/${el}`, fileContent => {
            
        })
        // {const { document } = (new JSDOM(fileContent,/* {contentType:"application/xhtml+xml"} */)).window
        // document.querySelectorAll("p").forEach(el => console.log(`${(element.content._attributes.src).replace(/(#[A-Za-z])\w+/g, "")}  \n\n\n ${el.textContent}`))}
    })

}