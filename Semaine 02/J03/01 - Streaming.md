# Streaming


## Introduction 

Il est commun de vouloir faire appel à des ressources vidéos ou audios dans une application web. Souvent, pour afficher une vidéo stockée par notre serveur, on utilise la balise `<video>` en HTML, qui pointe vers une ressource vidéo statique. Comme par exemple:

```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

Et il s'avère que ce n'est pas forcément la meilleure solution pour diffuser des vidéos en streaming. Pourquoi ? Car le navigateur va charger la vidéo en entier avant de la lire. C'est-à-dire que si vous avez une vidéo de 1Go, le navigateur va charger 1Go de données avant de commencer à lire la vidéo. C'est pas très optimal, surtout si vous avez une connexion internet moyenne, et surtout pas très respectueux de la bande passante.

La solution, le streaming.

## Streaming

Le streaming est une technique qui permet de diffuser des données multimédias en temps réel. C'est-à-dire que le navigateur va lire la vidéo au fur et à mesure qu'elle est téléchargée. C'est une technique qui permet de réduire le temps de chargement, et de ne pas surcharger la bande passante.

En théorie, ca veut dire qu'on voudra télécharger, par exemple, les 10 premières secondes de la vidéo, et commencer à les lire, puis télécharger les 10 secondes suivantes, et ainsi de suite.

Si on place le curseur de la vidéo à 1 minute, on va télécharger les 10 secondes suivantes à partir de ce point précis, et ainsi de suite, jusqu'arriver à la fin de la vidéo.

## Ce qu'on va aborder

- Les status codes HTTP 200, 206 et 400
- Les Range et Content-Range headers
- Les types de streams
- Ce qu'est un pipe

## Le Range

Tout d'abord, il faut savoir que le header range est **optionnel**. Entre autre, il est possible qu'il vous retourne `undefined` si vous essayez d'y accéder par des méthodes autre que du _seeking_.

Vous ne pouvez y accéder qu’à travers la recherche d’un téléchargement partiel ou complet d’une ressource. Du coup, vous devez inclure la route qui demande le header range à travers une ressource dans votre front, **mais vous ne pourrez pas y accéder directement depuis votre navigateur** (du moins, sans carabistouille)

Mais ce header, à quoi il sert au juste? Il sert à demander à votre serveur une partie du document, en bytes par défaut. Il demande une **rangée** (d’où le mot range)

Généralement, il sera sous ce format là:

```http
Range: <unit>=<range-start>-<range-end>
```

`unit` étant majoritairement en bytes, et `range-start` et `range-end` étant des nombres qui correspondent à la rangée en byte de la ressource demandée.

Un example de range valide par example:

```http
Range: bytes=4161536-19257537
```

Avec ce header, je comprends que je souhaite une part d’une ressource, qui se situe entre le 4161536 et 19257537ème byte.

Il y a d’autre format d’écriture, mais restons concentré sur celui-ci pour l’instant. Du coup, on doit récupérer ce header dans notre code. Mais rappelons qu’il est **facultatif**, on doit donc gérer le cas où il nous retourne `undefined`.

Nous allons, avant de passer par l'architecture hexagonale, montrer le cas le plus classique dans le cadre d'une application express, une simple route sans fonction annexes, services ou autre.

```js
app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        /* Une erreur 400 (Bad Request) est retournée si le header range n'est pas présent */
        res.status(400).send("Requires Range header");
    }
})
```

Nous allons avoir également besoin de `fs`. Nous l'avons utilisé dans la première semaine pour lire les mocks, ca veut dire "file system". C'est un module qui permet de lire des fichiers, et qui est natif à Node.js.

```js
app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        /* Une erreur 400 (Bad Request) est retournée si le header range n'est pas présent */
        res.status(400).send("Requires Range header");
    }

    // on récupère le chemin du fichier mp4
    const path = 'video.mp4';

    // et sa taille en bytes
    const size = fs.statSync(path).size;
})
```

### Content-Range

Vous vous en souvenez du `range` ? On en a parlé y’a 15 secondes. Ce header était dans la **requête**, tandis que le `Content-Range` est dans la **réponse**.

Nous avons besoin d’indiquer au client depuis le serveur une rangée de la vidéo que nous souhaitons diffuser. Son formatage est presque similaire à celui du header range:

```http
Content-Range: <unit> <range-start>-<range-end>/<size>
```

Les valeurs sont toujours en **bytes**. Et cette fois-ci, on doit préciser la taille totale de la ressource que nous avons récupéré plus tôt.

La valeur start correspondra au **header range**. Car le client nous envoie où l’utilisateur en est dans son utilisation de la ressource (du coup de la vidéo). Et, par gentillesse, elle ne nous précise pas de end, du coup le parsing est d’autant plus facilité !

Alors, petit cours de regex, vu que vous n’aimez certainement pas ça. Nous cherchons à supprimer tout les caractères qui ne sont pas des chiffres de notre header range:

- Pour supprimer tout les caractères qui ne sont pas des chiffres: `\D`
- Pour ne pas s’arrêter seulement à la première itération, mais tout les matches de la chaîne de caractère, on utilise un flag: `/g`.

Une fois tout trié, forcément, on obtient une chaîne de caractères, mais pour son utilisation, on aura besoin de le convertir en nombre. C’est pourquoi la fonction `Number()` nous sera utile.

Ce qui nous donne donc:

```js
app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        /* Une erreur 400 (Bad Request) est retournée si le header range n'est pas présent */
        res.status(400).send("Requires Range header");
    }

    // on récupère le chemin du fichier mp4
    const path = 'video.mp4';

    // et sa taille en bytes
    const size = fs.statSync(path).size;

    // On remplace tout les caractères qui ne sont pas des chiffres par rien, pour obtenir le start du range
    const start = Number(range.replace(/\D/g, ''));
})
```

Maintenant, on a besoin du end. Alors comment on fait ? On mets la taille du fichier ? **CERTAINEMENT PAS**. Je vous rappelle, le but c’est de télécharger petit à petit.

Alors allons juste un peu après le start que le client nous a envoyé, pour y offrir un end convenable. Disons 1 MB c’est bien, ce qui donne ? … **1000000 bytes** bien évidemment.

On enregistre ça dans une variable quand même !

```js
app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        /* Une erreur 400 (Bad Request) est retournée si le header range n'est pas présent */
        res.status(400).send("Requires Range header");
    }

    // on récupère le chemin du fichier mp4
    const path = 'video.mp4';

    // et sa taille en bytes
    const size = fs.statSync(path).size;

    // On remplace tout les caractères qui ne sont pas des chiffres par rien, pour obtenir le start du range
    const start = Number(range.replace(/\D/g, ''));

    // 1MB qu'on lira petit à petit dans la vidéo
    const part = 1 * 1e6;
    // On peut aussi écrire 1e6 comme 1000000

    // end qui correspond au point start + 1mb supplémentaire
    const end = start + part;
})
```
Maintenant qu’on a tout, la taille, le start, et le end… On peut y aller ? **CERTAINEMENT PAS**.

Avez-vous remarquer l’erreur ? Je vous laisse la trouver. Soyez honnête, trouvez la, et passez à la solution et son explication ensuite !

_**Indice** : il y a un byte null à la fin du fichier qu’il faut dégager._

### Solution

```js
app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        /* Une erreur 400 (Bad Request) est retournée si le header range n'est pas présent */
        res.status(400).send("Requires Range header");
    }

    // on récupère le chemin du fichier mp4
    const path = 'video.mp4';

    // et sa taille en bytes
    const size = fs.statSync(path).size;

    // On remplace tout les caractères qui ne sont pas des chiffres par rien, pour obtenir le start du range
    const start = Number(range.replace(/\D/g, ''));

    // 1MB qu'on lira petit à petit dans la vidéo
    const part = 1 * 1e6;
    // On peut aussi écrire 1e6 comme 1000000

    // end qui correspond au point start + 1mb supplémentaire
    const end = Math.min(start + part, size - 1);
})
```

---

Mais, pourquoi ce retournement de situation ?

L’explication est simple. Imaginez que votre vidéo fait 4.5 MB. Votre start + part donne 5 MB. **D’où sortez vous les 0.5 MB de différence** ? Ils n’existent pas !

`Math.min()` nous retourne la plus petite valeur des deux valeurs entrées en paramètres. Du coup, on est certain de ne jamais dépasser la taille maximale du fichier en lecture.

### Content-Length

C’est aussi un header de **réponse**. Tout simplement, c’est la taille de la ressource envoyé au client. Rien de plus. Du coup, la différence entre **end** et **start**, en ajoutant un **byte null** (du coup +1). Rien de spectaculaire.

---

### Ecriture du header

Bien, nous avons toutes nos informations, le **Content-Range**, le **Content-Length**, simplement à définir le **Accept-Ranges** qui indique l’unité de la range, et Content-Type qui correspond au mimetype de la ressource à envoyer. On écrit notre petit objet tout prêt, tout sympa que voici :

```js
app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        /* Une erreur 400 (Bad Request) est retournée si le header range n'est pas présent */
        res.status(400).send("Requires Range header");
    }

    // on récupère le chemin du fichier mp4
    const path = 'video.mp4';

    // et sa taille en bytes
    const size = fs.statSync(path).size;

    // On remplace tout les caractères qui ne sont pas des chiffres par rien, pour obtenir le start du range
    const start = Number(range.replace(/\D/g, ''));

    // 1MB qu'on lira petit à petit dans la vidéo
    const part = 1 * 1e6;
    // On peut aussi écrire 1e6 comme 1000000

    // end qui correspond au point start + 1mb supplémentaire
    const end = Math.min(start + part, size - 1);

    // La taille de la ressource à envoyer + 1 byte null
    const contentLength = end - start + 1;

    // Le header de la réponse à envoyer au client (front)
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };
})
```

Bien, nous avons notre header. Notre route retournera donc une partie d’une vidéo mp4. Il ne reste qu’à l’écrire sur la réponse, en précisant que le statut sera **206** : une ressource partielle.

```js
app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        /* Une erreur 400 (Bad Request) est retournée si le header range n'est pas présent */
        res.status(400).send("Requires Range header");
    }

    // on récupère le chemin du fichier mp4
    const path = 'video.mp4';

    // et sa taille en bytes
    const size = fs.statSync(path).size;

    // On remplace tout les caractères qui ne sont pas des chiffres par rien, pour obtenir le start du range
    const start = Number(range.replace(/\D/g, ''));

    // 1MB qu'on lira petit à petit dans la vidéo
    const part = 1 * 1e6;
    // On peut aussi écrire 1e6 comme 1000000

    // end qui correspond au point start + 1mb supplémentaire
    const end = Math.min(start + part, size - 1);

    // La taille de la ressource à envoyer + 1 byte null
    const contentLength = end - start + 1;

    // Le header de la réponse à envoyer au client (front)
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };

    res.writeHead(206, headers);
})
```

## Le streaming

_Bon c’est bien tout ces trucs de header, mais mon streaming alors ?_

Je vous ai parlé de fs précédemment, que ca traiter des fichiers, etc… Il gère aussi **les streams**.

Alors oui, vous dites “streaming” “streaming” mais est-ce-que vous savez ce que c’est déjà, en code, un **stream** ?

Un stream, c’est une méthode pour gérer une ressource partie par partie. Comme vous l’avez vous avec le **Content-Range**. Il permet donc d’économiser de la mémoire, autant dans votre serveur que chez le client. Il existe quatre types de Stream:

- Les streams **Writable**: donne la capacité d’écrire dans un document en stream, c’est à dire écrire dans un morceau de document.
- Les streams **Readable**: donne la capacité de lire dans un document en stream, _**c’est ce qui nous intéresse donc**_.
- Les streams **Duplex**: c’est à la fois **writable** et **readable**. Un exemple serait les **WebSockets** où l’on reçoit et écrit du stream simultanément (cf le cours précédent).
- Les streams **Transform**: assez particulier. Il transforme et modifie la donnée streamée entre les différents types de stream. Par exemple, il va transformer un contenu écrit vers un contenu lisible : comme de la compression par exemple (**zlib**).

Du coup, nous allons créer un stream lisible (**readable**) de notre extrait de vidéo, contenue entre start et end:

```js
app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        /* Une erreur 400 (Bad Request) est retournée si le header range n'est pas présent */
        res.status(400).send("Requires Range header");
    }

    // on récupère le chemin du fichier mp4
    const path = 'video.mp4';

    // et sa taille en bytes
    const size = fs.statSync(path).size;

    // On remplace tout les caractères qui ne sont pas des chiffres par rien, pour obtenir le start du range
    const start = Number(range.replace(/\D/g, ''));

    // 1MB qu'on lira petit à petit dans la vidéo
    const part = 1 * 1e6;
    // On peut aussi écrire 1e6 comme 1000000

    // end qui correspond au point start + 1mb supplémentaire
    const end = Math.min(start + part, size - 1);

    // La taille de la ressource à envoyer + 1 byte null
    const contentLength = end - start + 1;

    // Le header de la réponse à envoyer au client (front)
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };

    res.writeHead(206, headers);

    // création du stream du fichier mp4 entre le start et le end renseignés plus tôt
    const stream = fs.createReadStream(path, { start, end });
})
```

On a donc crée un **stream readable** de notre vidéo, situé entre start et end. C’est parfait. Il nous reste qu’à la diffuser, avec pipe.

## Le pipe

Pour commencer, je vais vous donner une anecdote intéressante: **response est un writable stream**.

Oui, votre réponse **est aussi un stream** ! Nous avons un **readable stream**, et un **writable stream**. Il faut qu’on fasse la connexion entre les deux : c’est là que pipe (tuyau) est là pour nous sauver la mise.

Nous allons continuellement envoyer notre ressource partiel au client en **connectant notre response à la vidéo**.

```js
app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        /* Une erreur 400 (Bad Request) est retournée si le header range n'est pas présent */
        res.status(400).send("Requires Range header");
    }

    // on récupère le chemin du fichier mp4
    const path = 'video.mp4';

    // et sa taille en bytes
    const size = fs.statSync(path).size;

    // On remplace tout les caractères qui ne sont pas des chiffres par rien, pour obtenir le start du range
    const start = Number(range.replace(/\D/g, ''));

    // 1MB qu'on lira petit à petit dans la vidéo
    const part = 1 * 1e6;
    // On peut aussi écrire 1e6 comme 1000000

    // end qui correspond au point start + 1mb supplémentaire
    const end = Math.min(start + part, size - 1);

    // La taille de la ressource à envoyer + 1 byte null
    const contentLength = end - start + 1;

    // Le header de la réponse à envoyer au client (front)
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };

    res.writeHead(206, headers);

    // création du stream du fichier mp4 entre le start et le end renseignés plus tôt
    const stream = fs.createReadStream(path, { start, end });

    // On attache notre readable stream à notre writable stream pour diffuser la vidéo avec le header défini
    stream.pipe(res);
})
```

## Conclusion

On peut enfin modifier notre code client side pour qu’il puisse lire notre vidéo en streaming. On peut donc enlever la balise `<video>` et la remplacer par un lecteur vidéo qui peut lire des vidéos en streaming.

```html
<video controls>
    <source src="https://api.monsite.com/video" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

Et voilà, vous avez une vidéo en streaming. Vous avez économisé de la bande passante, et vous avez une vidéo qui se charge plus rapidement. C’est pas beau ça ?

Il y a bien entendu des pistes d'améliorations, comme par exemple :
- Gérer les erreurs de lecture de fichier
- Préciser un id de vidéo pour pouvoir streamer plusieurs vidéos
- Utiliser **ffmpeg** pour d'autres formats de vidéos et y jouer avec

Mais pour l'instant, vous avez une base solide pour streamer des vidéos en toute simplicité.

Nous allons, dans la suite du cours, explorer le cas du streaming dans le cadre de notre architecture hexagonale.