"use strict";
var A01_RandomPoem;
(function (A01_RandomPoem) {
    let subject = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let verb = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let object = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    console.log(subject, verb, object);
    //Schleife:
    for (let i = subject.length; i > 0; i--) {
        // console.log(i);
        console.log(getVerse(subject, verb, object));
    }
    //console.log(subjekt, verb, objekt, satz);
    function getVerse(_subject, _verb, _object) {
        let verse = "";
        let sub = Math.floor(Math.random() * _subject.length);
        let ver = Math.floor(Math.random() * _verb.length);
        let obj = Math.floor(Math.random() * _object.length);
        verse = _subject.splice(sub, 1)[0] + " " + _verb.splice(ver, 1)[0] + " " + _object.splice(obj, 1)[0] + ".";
        return verse;
    }
})(A01_RandomPoem || (A01_RandomPoem = {}));
//# sourceMappingURL=A01_RandomPoem.js.map