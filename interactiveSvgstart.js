

document.addEventListener("DOMContentLoaded", function () {
    runProgram();
});

const lokationer = [
    {
      "lokation":"Nørrebro",
      "tekst":"Jeg er vokset op på Nørrebro. På Nørrebro har jeg skabt mange minder, mødt mange gode mennesker og været en del af fællesskabet - derfor vil Nørrebro altid være mit favorit sted i København.",
      "billede":"nørrebro"
    },
    {
      "lokation":"Fælledparken",
      "tekst":"Fælledparken er min yndlings park, jeg går og løber mange ture der. Der er altid roligt og dejligt at være.",
      "billede":"fælledparken"
    }
    
    ]

// global definition af variabler
async function runProgram() {
let selected;
let selectedId;
let fillcolor;
let active;
const popover = document.querySelector("#lokationer");

    // 1. Load svg map
    //------------------------------------------------------------------------------------	
let rawSvg = await fetch("københavn-kort.svg");  // henter svg ind
let svg = await rawSvg.text(); 
document.querySelector("#mit-kort").innerHTML = svg; // smider den ind i html

    // 2. Skift farve ved klik, og vis tekst
    //-----------------------------------------------------------------------
document.querySelector("#mit-kort #Layer_2").addEventListener("click", (evt) => clicked(evt)); 

    //function clicked
    //--------------------------------------------------------------------

function clicked(evt) {
  // a. find det klikkede element
    //----------------------------------------------
    selected = evt.target;

  // b. find det klikkede elementets ID
    //---------------------------------------------
    selectedId = selected.id;

  // c. find  det klikkede elements fillfarve
    //---------------------------------------------
    fillcolor = selected.getAttribute("fill");

  
    // d. vis info
    //--------------------------------------------
lokationer.forEach(lokation => {
    if (lokation.lokation === selectedId) {
        document.querySelector("#lokationtekst").textContent = lokation.tekst;
        document.querySelector("#lokationbillede").src ="billeder/" + lokation.billede + ".jpeg";
        
    }
});

    // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
    //------------------------------------------------------------------------------------
if(active){
    active.setAttribute("fill", fillcolor);
}

    //gør det klikkede til det aktive
    //-------------------------------------------------------------------------
active = selected; 

    //skift farve på det valgte
    //-------------------------------------------------------------------------
if (fillcolor == "#b62300"){
    document.querySelector("#" + selectedId).setAttribute("fill", "#123456");
}

    //reset farve og skjul tekst hvis valgt elementet allerede er aktivt
    //--------------------------------------------------------------------------
    else {
        document.querySelector("#" + selectedId).setAttribute("fill", "#b62300");
    }
popover.togglePopover();
}

document.addEventListener("click", () => {
if (!popover.matches(":popover-open")){
    selected.setAttribute("fill", "#b62300");
}
});
};
