namespace A01_RandomPoem {
    let subject: string[] = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let verb: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let object: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    
    console.log(subject, verb, object);

    //Schleife:
    for (let i: number = subject.length; i > 0; i--) {
        // console.log(i);
        console.log(getVerse(subject, verb, object));
    }
    //console.log(subjekt, verb, objekt, satz);

    function getVerse (_subject:string[], _verb:string[], _object:string[]): string {
        let verse: string = "";
        let sub: number = Math.floor(Math.random() * _subject.length);
        let ver: number = Math.floor(Math.random() * _verb.length);
        let obj: number = Math.floor(Math.random() * _object.length);
        verse = _subject.splice(sub,1)[0] + " " + _verb.splice(ver,1)[0] + " " + _object.splice(obj,1)[0] + ".";
        return verse;
    }
}