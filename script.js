const numbers = document.querySelectorAll(".number-btn");
const operators = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector("#equals");
const removeBtn = document.querySelector("#remove");
const resetBtn = document.querySelector("#reset");
const screen = document.querySelector(".screen");

// 7. satirda ne oluyor ? = elementin icerigi baslangicta 0 yapildi.
screen.textContent = "0";
//
let suankiSayi = "birinci";
let sonBasilanButonTipi = "";
let sonBasilanOperator = "";
let sayi1 = "";
let sayi2 = "";
let sonuc = "";
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    // suankiSayi === "ikinci" ise ekrani temizle
    if (suankiSayi === "ikinci" && sonBasilanButonTipi === "operator") {
      screen.textContent = "";
    }
    // eger ekrandaki yazi "0" ise yanina degil yerine yazdir
    if (screen.textContent === "0") {
      screen.textContent = number.textContent;
    } else {
      // eger ekranda "0" yoksa yanina yazdir
      screen.textContent += number.textContent;
    }

    sonBasilanButonTipi = "number";
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    // ilk once operator-active classina sahip butun operatorlerden classi kaldir
    // operator-active classina sahip elementleri secelim
    const aktifOperatorler = document.querySelectorAll(".operator-active");

    aktifOperatorler.forEach((aktifOperator) => {
      // her bir aktif operatorun classindan operator-active classini kaldir
      aktifOperator.classList.remove("operator-active");
    });
    // sonra suanki operatoru active yap
    operator.classList.add("operator-active");
    sonBasilanOperator = operator.textContent;
    sonBasilanButonTipi = "operator";
    if (suankiSayi === "birinci") {
      sayi1 = screen.textContent;
      suankiSayi = "ikinci";
      return;
    }
    if (suankiSayi === "ikinci") {
      sayi2 = screen.textContent;
    }
  });
});

// Esittir butonuna tiklandiginda yapilacaklar
equalsBtn.addEventListener("click", () => {
    const aktifOperatorler = document.querySelectorAll(".operator-active");

    aktifOperatorler.forEach((aktifOperator) => {
      // her bir aktif operatorun classindan operator-active classini kaldir
      aktifOperator.classList.remove("operator-active");
    })
  // suanki sayi ikinci ise sayi2 yi al ve sonucu bul
  if (suankiSayi === "ikinci" && sonBasilanButonTipi === "number") {
    sayi2 = screen.textContent;
    console.log(sayi1, sayi2, sonBasilanOperator);
    console.log("EMRENIN CEVABI");
    const cevap = hesapla(sayi1, sayi2, sonBasilanOperator);
    screen.textContent = cevap;
    console.log(cevap);
  }
});

removeBtn.addEventListener("click", () => {
  // remove tusuna basilginda ekrandaki sayinin son karakterini sil
  // eger ekrandaki sayi 1 karakterli ise 0 yap
  if (screen.textContent.length === 1) {
    screen.textContent = "0";
  } else {
    // "55" => "5"
    // "123" => "12"
    screen.textContent = screen.textContent.slice(0, -1);
  }
});

resetBtn.addEventListener("click", () => {
  // hesap makinesini sifirla
  // once ekrandaki sayiyi 0 yap
  screen.textContent = "0";
  // sonra diger degiskenleri sifirla
  suankiSayi = "birinci";
  sayi1 = "0";
  sayi2 = "0";
  sonBasilanOperator = "";
  sonBasilanButonTipi = "";
});
// Bu fonksiyon a ve b parametrelerini alacak ve operator parametresine gore islem yapacak
function hesapla(a, b, operator) {
  a = Number(a);
  b = Number(b);
  if (operator === "+") {
    return a + b;
  } else if (operator === "-") {
    return a - b;
  } else if (operator === "X") {
    return a * b;
  } else if (operator === "÷") {
    return a / b;
  }
}
