let p;
let q;
let n;
let phiN;
let e;
let d;
let tmpD;
let privateKey;
let publickKey;
let alphabet = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї',
  'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч',
  'ш', 'щ', 'ь', 'ю', 'я', ' ', '.', ',', '?', '!', '-',];

function algorithmRSA() {
  n = 0;
  phiN = 0;
  e = 0;
  d = 0;

  if (inputP.value === "" || inputQ.value === "") {
    alert("Введіть значення");
  } else {
    console.log("=========================");

    //Щоб число точно було простим
    p = parseInt(inputP.value);
    while (!simplicityCheck(p)) {
      p++;
    }
    console.log("p = " + p);

    //Щоб число точно було простим
    q = parseInt(inputQ.value);
    while (!simplicityCheck(q)) {
      q++;
    }
    console.log("q =" + q);

    n = p * q;
    console.log("n = " + n);

    phiN = (p - 1) * (q - 1);
    console.log("phiN = " + phiN);

    //Ділення на щоб відкрита експонента "е" не було близько до phiN
    for (let i = Math.round(phiN/2); i > 2; i--) {
      if (simplicityCheck(i) === true) {
        e = i;
        //console.log("e = " + e);
        //Шукаємо закриту експоненту "d" вкладеним циклом бо часто сама перша е не підходить
        for (let i = 2; i < phiN; i++) {
          tmpD = (phiN * i + 1) / e;
          if (Number.isInteger(tmpD) === true) {
            //console.log("tmpd = " + tmpD);
            if (tmpD !== e && simplicityCheck(tmpD) === true && (e * tmpD) % phiN
                === 1) {
              //console.log("e*d % phiN = " + (e * tmpD) % phiN);
              d = tmpD;
              //console.log("d = " + d);
              break;
            }
          }
        }
        if (d !== 0 && d !== e) {
          break;
        }
      }
    }
    if (d === 0) {
      return alert("Помилка! Неможливо знайти ключ");
    }

    console.log("e = " + e);
    console.log("d = " + d);
    console.log("e*d = " + e * d);
    //По формулі (e * d) % phiN має дорівнювати 1
    console.log("e*d % phiN = " + (e * d) % phiN);

    privateKey = "Приватний ключ: ( " + d + ", " + n + " )";
    publickKey = "Публічний ключ: ( " + e + ", " + n + " )";
    document.getElementById("privateKeyLabel").textContent = privateKey;
    document.getElementById("publickKeyLabel").textContent = publickKey;
  }
}

function simplicityCheck(number) {
  //Перевірка числа на простоту
  if (number <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
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
        //Переведення букв і знаків в числа по індексу масива
        for (let j = 0; j < alphabet.length; j++) {
          if (letter === alphabet[j]) {
            letterIndex = j;
            break;
          }
        }
        if (letterIndex == null) {
          return alert("Введіть українською");
        }
        //Переведенн всіх чисел в BigInt щоб зберегти правильне значення дуже великого числа
        let exponentiation = (BigInt(letterIndex) ** BigInt(e));
        console.log(letterIndex + "^e = " + exponentiation);
        let cipherLetter = exponentiation % BigInt(n);
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
    for (let i = 0; i < cipherText.length; i++) {
      let decryptionLetter;
      //Обратне розшифрування по формулі тоже з BigInt
      let exponentiation = (BigInt(cipherText[i]) ** BigInt(d));
      console.log(cipherText[i] + "^d = " + exponentiation);
      let decryptionLetterIndex = exponentiation % BigInt(n);
      console.log(decryptionLetterIndex);
      //Знаходження в масиві індекса з отриманим значенням
      for (let j = 0; j < alphabet.length; j++) {
        if (decryptionLetterIndex === BigInt(j)) {
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