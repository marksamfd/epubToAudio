// https://stackoverflow.com/a/21699625  
function removeSpaces(xml) {
    var str = xml
    str = str.replace(/>\s*/g, '>');  // Replace "> " with ">"
    str = str.replace(/\s*</g, '<');
    return str
}

module.exports = removeSpaces