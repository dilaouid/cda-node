// bien respecter le nom dossier __tests__ ET l'extension .spec.ts / .test.js
// npm run test 

// it() => fonction qui vient de la librairie jest
// "text de description en 1er paramètre " => expliquer ce que vous allez réaliser comme test
// callback => stocker le test 
// il est possible de grouper les test => scénario 

describe("réaliser nos premiers tests unitaires" , () => {
    it("1 should be equal to 1" , function(){
        const a = 1 ; 
        // assertion => m'attend à quelquechose et je veux le vérifier
        expect(a).toEqual(1); 
    })
    test("le tableau contient 1 valeur", function(){
        const a = [1];
        expect(a.length).toBe(1)
    })

    test("le tableau contient 1 puis 2 valeur", function(){
        const a = [1];
        expect(a.length).toBe(1)
        a.push(2);
        expect(a.length).toBe(2)
        // vous pouvez mettre autant d'assertion que vous voulez dans un test 
    })
    // astuce pour se concentrer sur un seul test 
    /* test.only("lui uniquement", function(){
        const phrase = "Bonjour" ;
        expect(phrase.includes("n")).toBeTruthy();
    }) */
})

