const { execSync } = require('child_process')
const { pathExistsSync, ensureDirSync } = require('fs-extra')

function tts(text, chapter, p) {
    let path = `tts/${chapter}`
    ensureDirSync(path)
    execSync(`CUDA_VISIBLE_DEVICES="0" tts --text "${text}" \
    --model_name tts_models/en/ljspeech/vits\
    --use_cuda=True --out_path ${path}/${p}.wav`, (err, output) => {
        if (err) throw err
    })
    //--model_name tts_models/en/ljspeech/vits
}
module.exports = tts