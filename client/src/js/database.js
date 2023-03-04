import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to database");

  // create a connection to the database
  const contactDb = await openDB("jate", 1);

  //create a new transaction with readwrite access
  const tx = contactDb.transaction("jate", "readwrite");

  //create a new object store
  const store = tx.objectStore("jate");

  //create a new request to add the content
  const request = store.put({ id: 1, value: content });

  //wait for the request to complete
  const result = await request;
  console.log("PUT result", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from database");
  // create a connection to the database
  const contactDb = await openDB("jate", 1);

  //create a new transaction with readonly access
  const tx = contactDb.transaction("jate", "readonly");

  //create a new object store
  const store = tx.objectStore("jate");

  //create a new request to get all the content
  const request = store.getAll();

  //wait for the request to complete
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

initdb();
