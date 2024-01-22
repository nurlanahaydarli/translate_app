const url = "https://text-translator2.p.rapidapi.com/translate";
let source_language = document.querySelector(".source_language")
let target_language = document.querySelector(".target_language")
let translate_btn = document.querySelector("#translate_btn")
let source_text = document.querySelector("#source_text")
let target_text = document.querySelector("#target_text")
let modal_alert = document.querySelector(".modal_alert")
let close_modal = document.querySelector("#close_modal")
let alert_text = document.querySelector(".alert_text")




async function translateGetText() {
    const source_lang = source_language.value;
    const target_lang = target_language.value;
    const user_text = source_text.value;
    if(!user_text){
        modal_alert.style.display='block'
        alert_text.innerText = "Bura boş ola bilməz!!!"
        return
    }
    if(source_lang ===  target_lang ){
        modal_alert.style.display='block'
        alert_text.innerText = "Dillər eyni ola bilməz!!!"
        return
    }
    let TranslateProcess = await translatorFunc(source_lang,target_lang,user_text)

    return  target_text.value = TranslateProcess
}

async function translatorFunc(source_lang , target_lang, targetText) {
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
        return result.data.translatedText
    } catch (error) {
        console.error(error);
    }
}
translate_btn.addEventListener("click",function (){
    translateGetText()
})

close_modal.addEventListener("click",function (){
    modal_alert.style.display='none'
})

const lang_list = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "az", name: "Azerbaijani" },
    { code: "tr", name: "Turkish" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "it", name: "Italian" },
    { code: "es", name: "Spanish" },
    { code: "pt", name: "Portuguese" },
    { code: "hi", name: "Hindi" },
    { code: "uk", name: "Ukrainian" },
    { code: "uz", name: "Uzbek" },
    { code: "tg", name: "Tajik" },
    { code: "tk", name: "Turkmen" },
    { code: "ko", name: "Korean" },
];

let lang_names = lang_list.map((item)=>{
    return `
        <option value=${item.code}>${item.name}</option>
    `
})

source_language.innerHTML =lang_names
target_language.innerHTML =lang_names