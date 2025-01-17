
# lib-graphql-store

Une bibliothèque légère et simple permettant de gérer un contexte local asynchrone pour vos projets GraphQL. Utilisez cette librairie pour stocker et partager des informations tout au long du cycle de vie de vos requêtes, sans collisions entre les différents appels.

---

## 🛠️ Installation

Pour installer la librairie, utilisez la commande suivante :

```bash
npm install git@github.com:aidalinfo/lib-graphql-store.git
```

---

## 🚀 Fonctionnalités principales

- Stockage contextuel asynchrone grâce à `AsyncLocalStorage`.
- Partage sécurisé d'informations entre les résolveurs GraphQL.
- Interface simple avec des méthodes pour **définir** et **récupérer** des données.

---

## ✨ Utilisation

### Configuration de la librairie

Importez et utilisez la bibliothèque dans votre projet. Voici un exemple basique :

```javascript
import Store from 'lib-graphql-store';

// Définir une valeur dans le contexte
Store.set('userId', 123);

// Récupérer une valeur depuis le contexte
const userId = Store.get('userId');
console.log(userId); // 123
```

### Intégration avec un serveur GraphQL

Ajoutez `lib-graphql-store` à votre serveur GraphQL pour gérer les données dans le contexte de vos requêtes.

#### Exemple avec Apollo Server

```javascript
import { ApolloServer, gql } from 'apollo-server';
import Store from 'lib-graphql-store';

// Exemple de schéma GraphQL
const typeDefs = gql\`
  type Query {
    user: String
  }
\`;

// Exemple de résolveur
const resolvers = {
  Query: {
    user: () => {
      // Récupérer l'utilisateur stocké dans le contexte
      const userId = Store.get('userId');
      return \`Utilisateur avec l'ID \${userId}\`;
    },
  },
};

// Middleware pour initialiser le contexte de chaque requête
const context = ({ req }) => {
  // Créer un contexte local pour chaque requête
  Store.ensureContext();
  Store.set('userId', req.headers['user-id'] || 'inconnu');
  return {};
};

// Créer et démarrer le serveur Apollo
const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => {
  console.log(\`🚀 Serveur prêt à l'adresse \${url}\`);
});
```

#### Test avec une requête GraphQL

Vous pouvez utiliser un client GraphQL comme Apollo Client ou Postman pour tester votre serveur :

```graphql
query {
  user
}
```

Avec un en-tête personnalisé `user-id`, par exemple :

```json
{
  "user-id": "456"
}
```

La réponse sera :

```json
{
  "data": {
    "user": "Utilisateur avec l'ID 456"
  }
}
```

---

## 📦 Méthodes de la librairie

### `Store.set(key: string, value: any): void`

Définit une valeur associée à une clé dans le contexte asynchrone.

### `Store.get(key?: string): any`

Récupère une valeur associée à une clé ou retourne tout le contexte si aucune clé n'est fournie.

### `Store.ensureContext(): void`

Assure qu'un contexte asynchrone est présent pour stocker les données.

---

<!-- ## 🌟 Contribuer

Les contributions sont les bienvenues ! Si vous trouvez un bug ou souhaitez ajouter une fonctionnalité, n'hésitez pas à soumettre une issue ou une pull request.

--- -->

<!-- ## 📝 Licence

Ce projet est sous licence **MIT**. Consultez le fichier [LICENSE](./LICENSE) pour plus de détails.

--- -->
