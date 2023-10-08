let gameField = document.getElementById("check-section");
let checkTemplate = document.getElementById("checkID");
let foodTemplate = document.getElementById("foodID");

let startMenuPage = document.getElementById("start-menu-page");
let configPage = document.getElementById("config-page");
let gamePage = document.getElementById("game-page");
configPage.classList.add("hidden");
gamePage.classList.add("hidden");

let generateBtn = document.getElementById("generate-btn");
let toCofigBtn = document.getElementById("to-config-btn");
let applyBtn = document.getElementById("apply-btn");
let cofigBackBtn = document.getElementById("conf-back-btn");
let rememberBtn = document.getElementById("remember-btn");
let gameBackBtn = document.getElementById("game-back-btn");

generateBtn.addEventListener("click", () => {
    gamePage.classList.remove("hidden");
    startMenuPage.classList.add("hidden");
    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }
    appendElements([gameField], makeChecks());
})

toCofigBtn.addEventListener("click", () => {
    startMenuPage.classList.add("hidden");
    configPage.classList.remove("hidden");
})

cofigBackBtn.addEventListener("click", () => {
    startMenuPage.classList.remove("hidden");
    configPage.classList.add("hidden");
})

gameBackBtn.addEventListener("click", () => {
    gamePage.classList.add("hidden");
    startMenuPage.classList.remove("hidden");
})

applyBtn.addEventListener("click", changeConfigurations);

let minCheckAmount = 1;
let maxCheckAmount = 3;

let minFoodAmount = 2;
let maxFoodAmount = 5;

function changeConfigurations() {
    let maxCecksConfiguration = document.getElementById("max-checks");
    let minCecksConfiguration = document.getElementById("min-checks");
    let maxFoodssConfiguration = document.getElementById("max-foods");
    let minFoodsConfiguration = document.getElementById("min-foods");
    
    minCheckAmount = parseInt(minCecksConfiguration.value);
    maxCheckAmount = parseInt(maxCecksConfiguration.value)
    minFoodAmount = parseInt(minFoodsConfiguration.value);
    maxFoodAmount = parseInt(maxFoodssConfiguration.value);
}

const ARRAY_OF_ID = [];
let weiterNames = ["Bill", "Jon", "Jānis", "Dāvis", "Kristīne", "Pēteris", "Ahabd", "Gulbis", "Maiga", "Līga", "Lāsma", "Terēza"];
let weiterSurenames = [" Paduse", " Gailis", " Ozols", " Maigais", " Pidriķīs", " Trumps", " Da chery", " The III", " Kāposts", " Dalbajots", " Kaplis"];

let names = ["Pizza", "Kapsalons", "Kebabs", "Giross", "Burgers", "Klasiskie-free"];
let pizzaTypes = ["salami", "margarita", "fungi", "panceta"];
let freeOpt = ["bez siera"];
let souces = ["bez merces", "ķiploku merc", "roza merc", "sinepju merc", "kečups", "majoneze", "gurķu merce", "assa čilli merc"];
let sizes = [" M", " V", " L"];
let otherBulshit = ["bez tomatiem", "bez gurkiem", "bez galas", "bez siera"];
let meets = ["Vistas", "Lielopa", "Mix"];

// let checkAmount = Math.floor(Math.random() * (maxCheckAmount - minCheckAmount + 1)) + minCheckAmount;
// let foodAmount = Math.floor(Math.random() * (maxFoodAmount - minFoodAmount + 1)) + minFoodAmount;

function randNr(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cloneElements(amount, original) {
    let arr = [];
    for(let i = 0; i < amount; i++){
        let clonedElement = changeID(original.cloneNode(true));
        arr.push(clonedElement);
    }
    return arr;
}

function changeID(element) {
    let newID;
    do{
        newID = randNr(1, 999);

    } while(ARRAY_OF_ID.includes(newID));

    element.id = element.id + "-" + newID;
    return element;
}

function appendElements(parentElements, childElements) {
    for(let parent of parentElements) {
        childElements.forEach(child => parent.appendChild(child.cloneNode(true)));
    }

    return parentElements;
}

function makeChecks() {
    let checks = cloneElements(randNr(minCheckAmount,maxCheckAmount), checkTemplate);
    let orders = [];

    for(let i = 0; i < checks.length; i++) {
        let foods = cloneElements(randNr(minFoodAmount, maxFoodAmount), foodTemplate);
        randomizeFoods(foods);
        orders.push(foods);
    };

    for(let c = 0, o = 0; c < checks.length; c++, o++){
        checks[c].querySelector(".check-nr").textContent = checks[c].id.split("").filter(i => /^[0-9]+$/.test(i)).join("");
        checks[c].querySelector(".weiter-surname").textContent = weiterSurenames[randNr(0, weiterSurenames.length - 1)];
        checks[c].querySelector(".weiter-name").textContent = weiterNames[randNr(0, weiterNames.length - 1)];
        checks[c].querySelector(".table-nr").textContent = randNr(1, 16);
        for(let i = 0; i < orders[o].length; i++) {
            checks[c].appendChild(orders[o][i].cloneNode(true));
        }
    }
    return checks;
}

function randomizeFoods(order) {
    for(let food of order) {

        let foodName = food.querySelector(".food-name");
        let foodSize = food.querySelector(".size");
        let options = food.getElementsByClassName("option");
        

        foodName.firstChild.textContent = names[randNr(0, names.length - 1)];
        
        if(["Kapsalons", "Kebabs", "Giross", "Klasiskie-free"].includes(foodName.textContent)) 
        foodSize.textContent = sizes[randNr(0, sizes.length - 1)];

        if(["Kebabs", "Giross", "Burgers", "Kapsalons"].includes(foodName.firstChild.textContent)) {
        
            let count = randNr(2, 3);
            for(let i = 0; i < count; i++) {
                if(i == 0) options[i].textContent = meets[randNr(0, meets.length - 1)];

                if(i == 1) {
                    if(randNr(1, 5) > 3) options[i].textContent = souces[randNr(0, souces.length - 1)];
                    else options[i].textContent = "ķiploku merc";
                }

                if(i == 2) options[i].textContent = otherBulshit[randNr(0, otherBulshit.length - 1)];
            }

        }

        if(foodName.firstChild.textContent == "Klasiskie-free") {
            let count = randNr(1, 2);
            for(let i = 0; i < count; i++) {
                if(i == 0) options[i].textContent = souces[randNr(0, souces.length - 1)];
                if(i == 1 && randNr(1, 5) > 3) options[i].textContent = freeOpt[randNr(0, freeOpt.length - 1)];
            }
        }

        if(foodName.firstChild.textContent == "Pizza") {
            let a = foodName.firstChild.textContent;
            let b = pizzaTypes[randNr(0, pizzaTypes.length - 1)];
            foodName.firstChild.textContent =a + "-" + b;
        }
    }



    return order;
}

// let checks = cloneElements(randNr(minCheckAmount,maxCheckAmount), checkTemplate);
// let foods = cloneElements(randNr(minFoodAmount, maxFoodAmount), foodTemplate);









