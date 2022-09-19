const VOWELS = { 
    'a': 'ai', 
    'e': 'enter', 
    'i': 'imes', 
    'o': 'ober', 
    'u': 'ufat' 
};

function encrypt() {
    let text = document.querySelector('#text').value;

    if(text == '' || text == null) {
        document.querySelector('.results__nofound').style.display = 'block';
        document.querySelector('.results__content').style.display = 'none';
        return;
    }

    text = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");

    textArray = text.split('');

    let encryptedText = textArray.map((vowel) => {
        if(VOWELS[vowel]) {
            return VOWELS[vowel];
        }

        return vowel;
    });
    
    encryptedText = encryptedText.join('');

    let result = document.querySelector('#result__text');
    result.innerHTML = encryptedText;

    document.querySelector('#text').value = '';
    
    document.querySelector('.results__content').style.display = 'block';
    document.querySelector('.results__nofound').style.display = 'none';
}

function decrypt() {
    let text = document.querySelector('#text').value;

    console.log(typeof text);

    if(text == '' || text == null) {
        document.querySelector('.results__nofound').style.display = 'block';
        document.querySelector('.results__content').style.display = 'none';
        return;
    }

    text = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");

    for(let vowel in VOWELS) {
        text = text.replaceAll(VOWELS[vowel], vowel);
    }

    let result = document.querySelector('#result__text');
    result.innerHTML = text;

    document.querySelector('#text').value = '';

    document.querySelector('.results__content').style.display = 'block';
    document.querySelector('.results__nofound').style.display = 'none';
}

const ENCRYPT_BTN = document.querySelector('#encrypt');
ENCRYPT_BTN.addEventListener("click", encrypt );

const DECRYPT_BTN = document.querySelector('#decrypt');
DECRYPT_BTN.addEventListener("click", decrypt );