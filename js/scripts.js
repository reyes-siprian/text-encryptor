if ('serviceWorker' in navigator) {
    window.addEventListener( 'load', () => {
        navigator.serviceWorker.register('./service_worker.js');
    });
}

const VOWELS = { 
    'a': 'ai', 
    'e': 'enter', 
    'i': 'imes', 
    'o': 'ober', 
    'u': 'ufat' 
};

function encrypt(text) {
    textArray = text.split('');

    let encryptedText = textArray.map((vowel) => {
        if(VOWELS[vowel]) {
            return VOWELS[vowel];
        }

        return vowel;
    });
    
    return encryptedText.join('');
}

function decrypt(text) {
    for(let vowel in VOWELS) {
        text = text.replaceAll(VOWELS[vowel], vowel);
    }
    return text;
}

function isEmpty(text) {
    if(!Boolean(text)) {
        document.querySelector('.results__nofound').style.display = 'block';
        document.querySelector('.results__content').style.display = 'none';
        return true;
    }
    return false;
}

function normalizeText(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

function showResult(text) {
    const textResult = document.querySelector('#result__text');
    textResult.innerHTML = text;

    document.querySelector('#text').value = '';
    
    document.querySelector('.results__content').style.display = 'block';
    document.querySelector('.results__nofound').style.display = 'none';
}

function copy() {
    let result = document.querySelector('#result__text').textContent;
    navigator.clipboard.writeText(result);
}

const ENCRYPT_BTN = document.querySelector('#encrypt');
ENCRYPT_BTN.addEventListener("click", () => {
    let text = document.querySelector('#text').value;

    if(isEmpty(text)) return;

    text = normalizeText(text);
    text = encrypt(text);
    showResult(text);
} );

const DECRYPT_BTN = document.querySelector('#decrypt');
DECRYPT_BTN.addEventListener("click", () => {
    let text = document.querySelector('#text').value;

    if(isEmpty(text)) return;

    text = normalizeText(text);
    text = decrypt(text);
    showResult(text);
} );

const COPY_BTN = document.querySelector('#copy');
COPY_BTN.addEventListener("click", copy );