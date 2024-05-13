
/**
 * description ceci est ma première fonction annotée avec jsdoc
 * @param {number} a premier chiffre du calcul
 * @param {number} b deuxieme chiffre du calcul
 * @returns {number}
 * @see {@link https://jsdoc.app/tags-see}
 */
function addition(a, b){
    return a + b
}


/**
 * autre paramètre de jsdocs
 * @param {number} a 
 * @param {number} b 
 * @throws {Error} déclenche une erreur si les paramètres a ou b sont négatif
 * @returns {number}
 */
function calculPrix ( a, b ){
    if(a < 0 || b < 0){
        throw new Error("a et b  doivent être positifs")
    }
    return a * b
}

/** 
 * @typedef User
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} name - your name.
 */

/**
 * récupérer l'ensemble des users
 * @async 
 * @returns { User[] } liste des users
 */
async function getAllUser(){
    const response = await fetch("....");
    const data = await response.json()
    return data 
}

/**
 * récupérer l'ensemble des users manière 2
 * @async 
 * @returns { Array<User> } liste des users
 */
async function getAllUser2(){
    const response = await fetch("....");
    const data = await response.json()
    return data 
}

// pause rdv dans 15 min => typedoc (typescript)
// 11h10 !! 