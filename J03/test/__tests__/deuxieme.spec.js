// au differente manière de créer d'utiliser des assertions 

// https://jestjs.io/
// npm run test
// modifier le fichier package.json
// scripts "test": "jest --watchAll"

// plein de expect( ....  ) qui est suivi d'un matcher 

// tester des chiffres
// expect(1).toBe(1)
// expect(1).toEqual(1)
// expect(1).toBeGreaterThan(0)
// expect(1).toBeGreaterThanOrEqual(0)
// expect(1).toBeLessThanOrEqual(2)
// expect(1).toBeLessThan(2)

// test des string 
// expect("bonjour").toContain("n")
// expect("bonjour").toMatch(/nj/)
// expect("bonjour").toEqual("bonjour") pas conseillé

// test des boolean
// expect(2 > 1).toTruthy()
// expect(2 < 1).toFalsy()

// test des tableaux
// expect(["a", "b", "c"]).toContain("b")

// test des objets
// expect({ id : 1, nom : "Alain" }).toHaveProperty("id" , 1)
// expect({ id : 1, nom : "Alain" }).toMatchObject({id : 1})

it("test bidon", function(){
    const a = 1;
    expect(a).toBeDefined()
})