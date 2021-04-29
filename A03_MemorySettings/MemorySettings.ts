window.onload = function main() {
    handleStart();
}

function handleStart() {
    document.getElementById("startButton")?.addEventListener("click", createGame);
}

let cards : HTMLDivElement[] = [];
let oneCardRevealed : boolean = false;
let firstRevealedCard : HTMLDivElement;

function sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function createGame() {

    let cardAmountInput: HTMLInputElement = <HTMLInputElement>document.getElementById("cardAmount");
    let cardAmount: number = parseInt(cardAmountInput.value);

    for (let i: number = 0; i < cardAmount; i++) {
        let div0: HTMLDivElement = document.createElement("div");
        let slider: HTMLInputElement = <HTMLInputElement>document.getElementById("cardSize");
        let colorPick: HTMLInputElement = <HTMLInputElement>document.getElementById("colorPickBack");
        div0.style.backgroundColor = colorPick.value;
        div0.style.width = slider.value + "px";
        div0.style.height = slider.value + "px";
        let p0: HTMLParagraphElement = document.createElement("p");
        p0.textContent = i.toString();
        p0.style.visibility = "hidden";
        let colorPickFont: HTMLInputElement = <HTMLInputElement>document.getElementById("colorPickFont");
        p0.style.color = colorPickFont.value;
        let fontPick: HTMLSelectElement = <HTMLSelectElement>document.getElementById("fontPick");
        p0.style.fontFamily = fontPick.value;
        div0.appendChild(p0);

        let div1: HTMLDivElement = document.createElement("div");
        div1.style.backgroundColor = colorPick.value;
        div1.style.width = slider.value + "px";
        div1.style.height = slider.value + "px";
        let p1: HTMLParagraphElement = document.createElement("p");
        p1.innerText = i.toString();
        p1.style.visibility = "hidden";
        p1.style.fontFamily = fontPick.value;
        div1.appendChild(p1);

        cards.push(div0, div1);
    }

    cards = shuffleArray(cards);

    for (let j: number = 0; j < cardAmount*2; j++){
        document.body.appendChild(cards[j]);
        cards[j].addEventListener("click", revealCard);
    }

}

function shuffleArray(array: HTMLDivElement[]): HTMLDivElement[] {
    for (let i: number = array.length - 1; i > 0; i--) {
        let j: number = Math.floor(Math.random() * (i + 1));
        let temp: HTMLDivElement = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function revealCard(_event: Event){
    let card : HTMLDivElement = <HTMLDivElement>_event.target;
    let x : HTMLParagraphElement = <HTMLParagraphElement>card.children[0];
    x.style.visibility = "visible";

    let colorPickFront: HTMLInputElement = <HTMLInputElement>document.getElementById("colorPickFront");
    let colorPickBack: HTMLInputElement = <HTMLInputElement>document.getElementById("colorPickBack");
    card.style.backgroundColor = colorPickFront.value;


    if (oneCardRevealed){
        //sleep(700);
        let y: HTMLParagraphElement = <HTMLParagraphElement>firstRevealedCard.children[0];
        if (x.textContent == y.textContent){
            for (let a: number = 0; a < cards.length; a++){
                let b: HTMLParagraphElement = <HTMLParagraphElement>cards[a].children[0];

                if (b.textContent == x.textContent)
                    cards.splice(a,1);
            }
            
            card.remove();
            firstRevealedCard.remove();
        }

        else {
            x.style.visibility = "hidden";
            y.style.visibility = "hidden";
            card.style.backgroundColor = colorPickBack.value;
            firstRevealedCard.style.backgroundColor = colorPickBack.value;
        }
        oneCardRevealed = false;
    }

    else {
        firstRevealedCard = card;
        oneCardRevealed = true;
    }

    if (cards.length == 1) {
        let c: HTMLDivElement = <HTMLDivElement>document.getElementById("endScreen");
        c.style.visibility = "visible";
    }
}