const downloadFromTTS = require("./downloadFromTTS");

test("download from tts dev server",()=>{
    expect(downloadFromTTS("this is a test")).toBe("success")
})