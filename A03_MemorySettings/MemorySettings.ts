window.onload = function main(): void {
    handleStart();
};

function handleStart(): void {
    document.getElementById("startButton")?.addEventListener("click", createGame);
}

let cards: HTMLDivElement[] = [];
let oneCardRevealed: boolean = false;
let firstRevealedCard: HTMLDivElement;
let formData: FormData;

function createGame(): void {

    formData = new FormData(document.forms[0]);

    let cardAmount: number = parseInt(<string>formData.get("cardAmount"));

    for (let i: number = 0; i < cardAmount; i++) {

        let div0: HTMLDivElement = document.createElement("div");
        let div1: HTMLDivElement = document.createElement("div");
        div0.style.backgroundColor = <string>formData.get("colorPickBack");
        div0.style.width = <string>formData.get("cardSize") + "px";
        div0.style.height = <string>formData.get("cardSize") + "px";
        div0.id = "A";
        div1.style.backgroundColor = <string>formData.get("colorPickBack");
        div1.style.width = <string>formData.get("cardSize") + "px";
        div1.style.height = <string>formData.get("cardSize") + "px";
        div1.id = "B";

        let p0: HTMLParagraphElement = document.createElement("p");
        let p1: HTMLParagraphElement = document.createElement("p");
        p0.textContent = i.toString();
        p0.style.visibility = "hidden";
        p0.style.color = <string>formData.get("colorPickFont");
        p0.style.fontFamily = <string>formData.get("font");
        p1.textContent = i.toString();
        p1.style.visibility = "hidden";
        p1.style.color = <string>formData.get("colorPickFont");
        p1.style.fontFamily = <string>formData.get("font");
        
        div0.appendChild(p0);
        div1.appendChild(p1);
        cards.push(div0, div1);
    }

    cards = shuffleArray(cards);

    for (let j: number = 0; j < cardAmount * 2; j++) {
        document.getElementById("container").appendChild(cards[j]);
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

let card: HTMLDivElement;
let x: HTMLParagraphElement;
let y: HTMLParagraphElement;

function revealCard(_event: Event): void {
    card = <HTMLDivElement>_event.target;
    x = <HTMLParagraphElement>card.children[0];

    if (firstRevealedCard != null)
        y = <HTMLParagraphElement>firstRevealedCard.children[0];
    
    if (firstRevealedCard != null && card.id == firstRevealedCard.id && x.textContent == y.textContent) 
        return;
    
    x.style.visibility = "visible";
    card.style.backgroundColor = <string>formData.get("colorPickFront");
    
    if (oneCardRevealed) {
        
        if (x.textContent == y.textContent) {
            for (let a: number = 0; a < cards.length; a++) {
                let b: HTMLParagraphElement = <HTMLParagraphElement>cards[a].children[0];

                if (b.textContent == x.textContent)
                    cards.splice(a, 1) ;
            }
            
            setTimeout(removeCards, 1000);
        }

        else {
            setTimeout(hideCards, 1000);
        }
        oneCardRevealed = false;
    }
    else {
        firstRevealedCard = card;
        oneCardRevealed = true;
    }
    if (cards.length == 2) {
        let c: HTMLDivElement = <HTMLDivElement>document.getElementById("endScreen");
        c.style.visibility = "visible";
    }
}

function hideCards() {
    x.style.visibility = "hidden";
    y.style.visibility = "hidden";
    card.style.backgroundColor = <string>formData.get("colorPickBack");
    firstRevealedCard.style.backgroundColor = <string>formData.get("colorPickBack");
    firstRevealedCard = null;
}

function removeCards() {
    card.remove();
    firstRevealedCard.remove();
}