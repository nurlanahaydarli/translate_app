const url = "https://text-translator2.p.rapidapi.com/translate";

// ============================= Html Elements =============================

let source_language = document.querySelector(".source_language")
let target_language = document.querySelector(".target_language")
let translate_btn = document.querySelector("#translate_btn")
let source_text = document.querySelector("#source_text")
let target_text = document.querySelector("#target_text")
let modal_alert = document.querySelector(".modal_alert")
let close_modal = document.querySelector("#close_modal")
let alert_text = document.querySelector(".alert_text")
// let search_source = document.querySelector("#search_source")



// ============================= GetTranslate =============================
async function translateGetText() {
    const source_lang = source_language.value;
    const target_lang = target_language.value;
    const user_text = source_text.value;
    if(!user_text){
        modal_alert.style.display='block'
        alert_text.innerText = "Göndərilən mətn boş ola bilməz!!!"
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
            'X-RapidAPI-Key': '373ee143e8msh1441acd3a498ac6p19cbd2jsnb989971cc502',
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

// ============================= getLanguages =============================
async  function getLanguages(){
    const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '373ee143e8msh1441acd3a498ac6p19cbd2jsnb989971cc502',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data.languages

    } catch (error) {
        console.error(error);
    }
}


async  function renderLanguage(){
    let lang_names  = await  getLanguages()
    let lang_inner = lang_names.map((item)=>{
        return `
        <option value=${item.code}>${item.name}</option>
    `
    }).join('')
    source_language.innerHTML =lang_inner
    target_language.innerHTML =lang_inner
}

renderLanguage()


// ============================= Search Language =============================
// search_source.addEventListener("keyup",function (){
//     let lang = search_source.value;
//     console.log(lang,'lang')
// })


// ============================= Hide Alert modal =============================

close_modal.addEventListener("click",function (){
    modal_alert.style.display='none'
})