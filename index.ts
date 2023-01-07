
// Number 1 - City Directory
showTableData();
var form = document.getElementById("form-places");
function submitForm(event: Event) {
  //Preventing page refresh after submitting form
  event.preventDefault();
}
form!.addEventListener("submit", submitForm);

function saveData(city: string, country: string, population: number) {
  var newCity = city ? city : "Pasig";
  var newCountry = country ? country : "Philippines";
  var newPopulation = population ? population : 100;

  var newMergedCityInfo = newCity + ", " + newCountry + ", " + newPopulation;

  if (localStorage.getItem("mergedCityInfo") == null) {
    localStorage.setItem("mergedCityInfo", "[]");
  }

  var oldMergedCityInfo = JSON.parse(
    localStorage.getItem("mergedCityInfo") || "{}"
  );
  oldMergedCityInfo.push(newMergedCityInfo);

  localStorage.setItem("mergedCityInfo", JSON.stringify(oldMergedCityInfo));
  showTableData();
}
function showTableData() {
  document.getElementById(
    "list-of-cities"
  )!.innerHTML = `<li class="list-group-item active">List of Cities</li>`;
  if (localStorage.getItem("mergedCityInfo") != null) {
    var lengthOfDataArray: number = JSON.parse(
      localStorage.getItem("mergedCityInfo") || "{}"
    ).length;
    for (let i = 0; i < lengthOfDataArray; i++) {
      let itemCity = JSON.parse(localStorage.getItem("mergedCityInfo") || "{}")[
        i
      ];
      document.getElementById(
        "list-of-cities"
      )!.innerHTML += `<li class="list-group-item">${itemCity}</li>`;
    }
  }
}

function showSearchResult(searchString: string) {
  document.getElementById(
    "list-of-cities"
  )!.innerHTML = `<li class="list-group-item active">List of Cities</li>`;
  if (!searchString) {
    return;
  }
  if (localStorage.getItem("mergedCityInfo") != null) {
    var lengthOfDataArray: number = JSON.parse(
      localStorage.getItem("mergedCityInfo") || "{}"
    ).length;
    for (let i = 0; i < lengthOfDataArray; i++) {
      let itemCity = JSON.parse(localStorage.getItem("mergedCityInfo") || "{}")[
        i
      ];
      var indexOfPopulation: number = itemCity.lastIndexOf(',')
      var cityCountry = itemCity.substring(0, indexOfPopulation)
      var arrayCityCountry = cityCountry.split(', ').map(String)

      var persentInCity: boolean = arrayCityCountry[0].toUpperCase().includes(searchString.toLocaleUpperCase());
      var persentInCountry: boolean = arrayCityCountry[1].toUpperCase().includes(searchString.toLocaleUpperCase());

      if (persentInCity || persentInCountry) {
        document.getElementById(
          "list-of-cities"
        )!.innerHTML += `<li class="list-group-item">${itemCity}</li>`;
      }
    }
  }
}

// Number 2 - ISBN – 10 Validation

function validateISBN(isbn: string): boolean {
  if (!isbn) {
    return false;
  }
  var stringArray = isbn.split('').map(String);
  if (stringArray.length != 10) {
    return false
  }
  var addISBN: number = 0
  var temp: number

  for (let i = 0; i < 10; i++) {

    if ((stringArray[i] == "x" || stringArray[i] == "X") && i != 9) {

      return false;
    } else {
      if (stringArray[i] == "x" || stringArray[i] == "X") {
        stringArray[i] = '10'
      }
    }
    temp = +stringArray[i]
    if (isNaN(temp)) {
      return false;
    }
    addISBN += temp * (i + 1)
  }
  var computesISBN = (addISBN) % 11

  if (computesISBN == 0) {
    return true;
  }

  return false

}
// input test values here
var testValue: string = '1234554321'

console.log(testValue + ' -> ' + validateISBN(testValue))


// Number 3 - Change it up!

function changeItUp(input: string): string {
  if (!input) {
    return ''
  }
  var stringArray = input.split('').map(String);
  var charUpper1;

  for (var i = 0; i < stringArray.length; i++) {
    charUpper1 = stringArray[i].toUpperCase()
    if (charUpper1.charCodeAt(0) == 90) {
      stringArray[i] = "A"
    } else if (charUpper1.charCodeAt(0) <= 89 && charUpper1.charCodeAt(0) >= 65) {
      stringArray[i] = String.fromCharCode(charUpper1.charCodeAt(0) + 1);
      var charUpper2 = stringArray[i].toUpperCase()
      if (charUpper2 == 'A' || charUpper2 == 'E' || charUpper2 == 'I' || charUpper2 == 'O' || charUpper2 == 'U') {
        stringArray[i] = charUpper2
      } else {
        stringArray[i] = stringArray[i].toLowerCase()
      }
    }
  }

  return stringArray.join('')
}
var testValue2 = 'Cat30'
console.log(changeItUp(testValue2))


// Number 4 - Moving zeroes to the end


function moveZeros(params: any) {
  if (!params) {
    return ''
  }
  let inputArray = params
  let temp: any;
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] === 0) {

      for (let j = i; j < inputArray.length; j++) {
        temp = inputArray[j]
        if (j + 1 >= inputArray.length) {
          break
        }
        inputArray[j] = inputArray[j + 1]
        inputArray[j + 1] = temp
      }

    }

  }

  console.log(inputArray)
}
// sample input
let arr = [false, 1, 0, 1, 2, 0, 1, 3, "a"]
moveZeros(arr)