## tester la fonctionnalité AVEV ses dépendances 

```bash 
npm install --save-dev supertest
```

permet de réaliser des requête http 

post 
get
put delete 


// dans le fichier app.ts => ajouter un export devant la variable qui permet de créer votre application

```ts
export const app = express()
```

```ts
import request from 'supertest';
import app from '../src/app'; // Assurez-vous d'exporter votre application Express

describe('GET /posts', () => {
  it('should return all posts', async () => {
                    // effectuer une requête http sur votre application express
                    // get('/')
                    // post("/comments/1")
    const response = await request(app).get('/posts');
    // [{} , {}]
    //  effectue une requête http sur la route get posts 
    // mais on attend aussi les valeurs depuis la base de données 
    // test d'intégration 
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
```

// exécuter la même manière que les fichiers de test unitaires 