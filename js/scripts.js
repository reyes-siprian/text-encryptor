const VOWELS = { 
    'a': 'ai', 
    'e': 'enter', 
    'i': 'imes', 
    'o': 'ober', 
    'u': 'ufat' 
};

function encrypt() {
    let text = document.querySelector('#text').value;
    text = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");

    textArray = text.split('');

    let encryptedText = textArray.map((vowel) => {
        if(VOWELS[vowel]) {
            return VOWELS[vowel];
        }

        return vowel;
    });
    
    encryptedText = encryptedText.join('');

    const RESULT = document.querySelector('#result__text');
    RESULT.innerHTML = encryptedText;

    document.querySelector('#text').value = '';
    
    document.querySelector('.results__content').style.display = 'block';
    document.querySelector('.results__nofound').style.display = 'none';
}

const ENCRYPT_BTN = document.querySelector('#encrypt');
ENCRYPT_BTN.addEventListener("click", encrypt );

