/**
 * 
 * @param {number} prixHT 
 * @param {"café"|""} type  - typage littéral 
 * @returns {number}
 */
function calculPrix( prixHT , type ){
    if(type === "café"){
        return prixHT * 1.1
    }
    return prixHT  * 1.2 
}
