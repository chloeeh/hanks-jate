import { openDB } from 'idb';

const initdb = async () =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });

/* ------------------------- ACCEPT CONTENT; ADD TO DB ------------------------- */
export const putDb = async (content) => {
    // Connect to the db and define version
    const jateDB = await openDB('jate', 1);
    // Create transaction; specify db and data privileges
    const tx = jateDB.transaction('jate', 'readwrite');
    // Open the specified object store
    const store = tx.objectStore('jate');
    // Use put() on the store to update db with content
    const request = store.put({ id: 1, value: content });
    // Receive confirmation of PUT request
    const result = await request;
    console.log('😲 - Data saved to the database - 🙌', result);
};

/* ------------------------- GET CONTENT FROM DB ------------------------- */
export const getDb = async () => {
    console.log('GETting the data!');
    // Connect to the db and define version
    const jateDb = await openDB('jate', 1);
    // Create transaction; specify db and data privileges
    const tx = jateDb.transaction('jate', 'readonly');
    // Open the specified object store
    const store = tx.objectStore('jate');
    // Use get() to retrieve all the data from the database
    const request = store.get(1);
    // Receive confirmation of GET request
    const result = await request;
    console.log('result:', result);
    return result?.value;
};

initdb();
