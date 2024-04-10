import  getData  from "./dbb.js"

// tester des chiffres 
export const valeurAbsolu = (chiffre) => {
    /* if(chiffre > 0) return chiffre ;
    if(chiffre < 0) return -chiffre ;
    return 0 */
    return chiffre >= 0 ? chiffre : -chiffre ; 
}
// tester des chaines de caractères
// dans le fichier lib.spec.js importer la fonction bonjour
// vérifier que le retour de la fonction contient toujours le mot bonjour
// et le nom qui a été passé en paramètre
export const bonjour = (prenom) => {
    return `Bonjour ${prenom}`;
}
// tester des tableaux 
// dans le fichier lib.spec.js importer la fonction jour
// vérifier que le retour de la fonction contient toujours le mot lundi
// et jeudi
export const jour = () => {
    return ["lundi", "mardi", "mercredi", "jeudi"];
}
// tester des tableaux 
// dans le fichier lib.spec.js importer la fonction getArticle
// vérifier que le retour de la fonction contient toujours une clé id qui aura la valeur passée en paramètre
export const getArticle = (id) => {
    return {id : id , titre : "Article 1" , contenu : "lorem ipsum"}
}
export const creationProfilUtilisateur = (email , password) => {
    if(!email || !password ){
        throw new Error("identifiants manquants");
    }
    return {
        email , 
        password , 
        status : false , 
        dt_creation : Date.now() 
    };
}
export function getPost(id){
    const data = getData() ; // dépendance 
    return data.filter(function(item){
        return item.id === id
    })
}