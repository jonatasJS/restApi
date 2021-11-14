import db from "./connection.js";

export const selectId = async (id) =>
  new Promise((resolve, reject) => {
    db.query("SELECT * FROM people WHERE id = ?", [id], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });

export const addPerson = async (name, age) =>
  new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO people (name, age) VALUES (coalesce(?, name), coalesce(?, name))",
      [name, age],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      }
    );
  });

export const getPeople = async () =>
  new Promise((resolve, reject) => {
    db.query("SELECT * FROM people", [], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });

export const deletePerson = async (id) =>
  new Promise((resolve, reject) => {
    db.query(
      "UPDATE people SET deleted_at = ? WHERE id = ?",
      [new Date(), id],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      }
    );
  });

export const updatePerson = async (id, name, age) =>
  new Promise((resolve, reject) => {
    db.query(
      "UPDATE people SET name = coalesce(?, name), age = coalesce(?, age) WHERE id = ?",
      [name, age, id],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      }
    );
  });
