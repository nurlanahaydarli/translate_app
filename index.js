const url = "https://text-translator2.p.rapidapi.com/translate";
let source_language = document.querySelector(".source_language")
let target_language = document.querySelector(".target_language")
let translate_btn = document.querySelector("#translate_btn")
let source_text = document.querySelector("#source_text")
let target_text = document.querySelector("#target_text")


async function translateGetText() {
    const source_lang = source_language.value;
    const target_lang = target_language.value;
    const user_text = source_text.value;
    let TranslateProcess = await translatorFunc(source_lang,target_lang,user_text)

    return  target_text.value = TranslateProcess
}

async function translatorFunc(source_lang = 'en', target_lang = 'az', targetText) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '6ed23dc951msh9854ef057cd91bcp1ffa4cjsne02bbfceee53',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: source_lang,
            target_language: target_lang,
            text: targetText
        })
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data.translatedText,'result')
        return result.data.translatedText
    } catch (error) {
        console.error(error);
    }
}
translate_btn.addEventListener("click",function (){
    translateGetText()
})

