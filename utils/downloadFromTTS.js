const { default: axios } = require("axios")
const { createWriteStream } = require("fs")
const { ensureDirSync, appendFileSync } = require("fs-extra")

module.exports = async (text, chapter = 0, p = 0, cb) => {
    let path = `tts/${chapter}`
    ensureDirSync(path)
    const fileWriter = createWriteStream(`${path}/${p}.wav`)
    axios.defaults.baseURL = 'http://localhost:5002';
    return new Promise((resolve,reject) =>{
        axios.get("/api/tts", {
            params: {
                text,
                speaker_id: "",
                style_wav: ""
            },
            responseType: "stream"
        }).then(response =>{
            response.data.pipe(fileWriter)
            fileWriter.on("finish",()=>resolve())
        }).catch(reject)

    })

}