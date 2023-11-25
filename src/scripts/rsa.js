let p;
let q;
let n;
let nEuler;
let e;
let d;
let privateKey;
let publickKey;
let alphabet = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї',
  'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч',
  'ш', 'щ', 'ь', 'ю', 'я'];

function algorithmRSA() {
  if (inputP.value === "" || inputQ.value === "") {
    alert("Введіть значення");
  } else {
    console.log("=========================");

    p = parseInt(inputP.value);
    while (!simplicityCheck(p)) {
      p++;
    }
    console.log("p = " + p);

    q = parseInt(inputQ.value);
    while (!simplicityCheck(q)) {
      q++;
    }
    console.log("q =" + q);

    n = p * q;
    console.log("n = " + n);

    nEuler = (p - 1) * (q - 1);
    console.log("nEuler = " + nEuler);
    for (let i = nEuler; i > 2; i--) {
      if (simplicityCheck(i) === true) {
        e = i;
        console.log("e = " + e);
        break;
      }
    }

    euclidAlgorithm(nEuler, e, 0, 1);
    privateKey = "Приватний ключ: ( " + d + ", " + n + " )";
    publickKey = "Публічний ключ: ( " + e + ", " + n + " )";
    document.getElementById("privateKeyLabel").textContent = privateKey;
    document.getElementById("publickKeyLabel").textContent = publickKey;
  }
}

function simplicityCheck(number) {
  if (number <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

function euclidAlgorithm(a, b, t1, t2) {
  let remainder = 0;
  let quotient = 0;
  let t = 0;
n
  if (b === 0) {
    if(t1<0){
      t1=t1+nEuler;
    }
    d = t1;
    console.log(
        "a=" + a + " b=" + b + " q=" + quotient + " r=" + remainder + " t1="
        + t1 + " t2=" + t2 + " t=" + t);
    console.log("d=" + d);

  } else {
    quotient = Math.floor(a / b);
    remainder = a % b;
    t = t1 - (t2 * quotient);

    console.log(
        "a=" + a + " b=" + b + " q=" + quotient + " r=" + remainder + " t1="
        + t1 + " t2=" + t2 + " t=" + t);
    euclidAlgorithm(b, remainder, t2, t);

  }
}

function encryption() {
  if (inputP.value === "" || inputQ.value === "") {
    alert("Згенеруйте ключі");
  } else {
    if (inputText.value === "") {
      alert("Введіть текст");
    } else {
      console.log("==encryption==");
      let clearText = (inputText.value).toLowerCase().split('');
      console.log(clearText)
      let cipherText = [];
      for (let i = 0; i < clearText.length; i++) {
        let letter = clearText[i];
        let letterIndex;
        for (let j = 0; j < alphabet.length; j++) {
          if (letter === alphabet[j]) {
            letterIndex = j;
            break;
          }
        }
        if (letterIndex == null) {
          return alert("Введіть українською");
        }
        let cipherLetter = Math.pow(letterIndex, e) % n;
        console.log(" m^e = " + Math.pow(letterIndex, e));
        console.log(letter + " = " + letterIndex + " = " + cipherLetter);
        cipherText.push(cipherLetter);
      }
      console.log(cipherText);
      document.getElementById("cipherTextLabel").textContent = cipherText;
    }
  }

}

function decryption() {
  if (cipherTextLabel.value === "") {
    alert("Зашифруйте текст");
  } else {
    console.log("==decryption==");
    let decryptionText = [];
    let cipherText = (cipherTextLabel.textContent).split(",");
    console.log(cipherText);
    for (let i = 0; i < cipherText.length; i++) {
      let decryptionLetter;
      let decryptionLetterIndex = Math.pow(cipherText[i], d) % n;
      console.log(" с^d = " + Math.pow(cipherText[i], d));
      console.log(decryptionLetterIndex);
      for (let j = 0; j < alphabet.length; j++) {
        if (decryptionLetterIndex === j) {
          decryptionLetter = alphabet[j];
          break;
        }
      }
      decryptionText.push(decryptionLetter);

    }
    console.log(decryptionText);
    document.getElementById("decryptionTextLabel").textContent = decryptionText;
  }
}