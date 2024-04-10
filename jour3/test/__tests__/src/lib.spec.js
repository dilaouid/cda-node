import { valeurAbsolu , bonjour , jour , getArticle , creationProfilUtilisateur , getPost  } from "../../src/lib.js"; 
import  getData  from "../../src/dbb.js"
import { jest } from '@jest/globals' 

describe("tester le fonction valeurAbsolu" , function(){
    // étant donné que j'ai 3 return dans la fonction valeurAbsolu
    // je dois créer 3 tests au minimum dans mon scénario 
    it("should be equal to 1 if valeur = 1", function(){
            const resultat = valeurAbsolu(1)
            expect(resultat).toBe(1)
    })
    it("should be equal to 1 if valeur = -1", function(){
        const resultat = valeurAbsolu(-1)
        expect(resultat).toBe(1)
    })

    it("should be equal to 0 if valeur = 0 " , function(){
        const resultat = valeurAbsolu(0)
        expect(resultat).toBe(0)
    })
})

describe("tester la fonction bonjour", function(){
    it("should always contain Bonjour and a name", function(){
        const resultat = bonjour("Alain")
        expect(resultat).toContain("Bonjour")
        expect(resultat).toContain("Alain")
    })
})

describe("tester la fonction jour", function(){
    it("should always contain an array with lundi and a jeudi", function(){
        const resultat = jour()
        expect(resultat).toContain("lundi")
        expect(resultat).toContain("jeudi")
    })
})

describe("tester la fonction getArticle", function(){
    it("should always contain property id with a value of 1", function(){
        const resultat = getArticle(1)
        expect(resultat).toHaveProperty("id" , 1)
    })
}) 

describe("tester la fonction creationProfilUtilisateur", function(){
    it("should always throw error if  email null", function(){
        expect(() => creationProfilUtilisateur(null)).toThrow()
    })

    it("should always throw error if  password undefined", function(){
        expect(() => creationProfilUtilisateur("a@yahoo.fr")).toThrow()
    })

    it("should always return an object with an email if email and password supplied", function(){
       const resultat = creationProfilUtilisateur("a@yahoo.fr", "azerty")
       expect(resultat).toHaveProperty("email")
    })

}) 

jest.mock("../../src/dbb.js" , () => () => [{id : 1}] );  

// tout le contenu du fichier et surtout son export default va être intercepté et simulé par la librairie jest 

describe("test la fonction getPost", function(){
    // getData = jest.fn().mockReturnValue([{id : 1}]) 
   const resultat =  getPost(1);
   expect(resultat.length).toBe(1); 
})