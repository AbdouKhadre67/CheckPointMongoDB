const { MongoClient } = require('mongodb');

// URL de connexion MongoDB
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main() {
  try {
    // Connexion au serveur MongoDB
    await client.connect();
    console.log("Connexion à MongoDB réussie");

    // Accéder à la base de données "contact" 
    const db = client.db('contact');

    // Accéder à la collection "contactlist"
    const collection = db.collection('contactlist');

    // Insérer des documents dans la collection
    await collection.insertMany([
      { "nom": "Ben", "prenom": "Moris", "email": "ben@gmail.com", "age": 26 },
      { "nom": "Kefi", "prenom": "Seif", "email": "kefi@gmail.com", "age": 15 },
      { "nom": "Emilie", "prenom": "Brouge", "email": "emilie.b@gmail.com", "age": 40 },
      { "nom": "Alex", "prenom": "Marron", "age": 4 },
      { "nom": "Denzel", "prenom": "Washington", "age": 3 }
    ]);
    console.log("Documents insérés");

    // Afficher tous les contacts
    const contacts = await collection.find().toArray();
    console.log("Liste des contacts :", contacts);

    // Afficher les contacts avec un âge > 18
    const adults = await collection.find({ "age": { $gt: 18 } }).toArray();
    console.log("Contacts avec un âge > 18 :", adults);

    // Modifier le prénom de "Kefi Seif" en "Kefi Anis"
    await collection.updateOne(
      { "prenom": "Seif" },
      { $set: { "prenom": "Anis" } }
    );
    console.log("Prénom de Kefi Seif changé en Kefi Anis");

    // Supprimer les contacts ayant moins de 5 ans
    await collection.deleteMany({ "age": { $lt: 5 } });
    console.log("Contacts de moins de 5 ans supprimés");

    // Afficher la liste après suppression
    const updatedContacts = await collection.find().toArray();
    console.log("Liste mise à jour des contacts :", updatedContacts);

  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
