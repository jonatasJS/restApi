import express from "express";
import {
  selectId,
  getPeople,
  addPerson,
  deletePerson,
  updatePerson,
} from "../db/queries.js";

const router = express.Router();

router.get("/people", async (req, res) => {
  const people = await getPeople();

  const avaiblePeople = people.filter((person) => person.deleted_at == null);

  res.send(avaiblePeople);
});

router.get("/person", async (req, res) => {
  const { id } = req.query;

  const [selectedUser] = await selectId(id);

  if (selectedUser.deleted_at != null) {
    res.send("Pessoa não encontrada ou deletada!");
  } else {
    res.send(selectedUser);
  }
});

router.post("/person", async (req, res) => {
  const { name, age } = req.query;

  if (name && age) {
    const person = addPerson(name, age);
    res.send(person);
  } else {
    res.send("Não foi possível adicionar uma nova pessoa.");
  }
});

router.put("/person", async (req, res) => {
  const { id, name, age } = req.query;

  await updatePerson(id, name, age);
  res.send(`Pessoa com o id ${id} atualizada com sucesso!`);
});

router.delete("/person", async (req, res) => {
  const { id } = req.query;

  await deletePerson(id);
  res.send(`Pessoa com o id ${id} apagado com sucesso!`);
});

export default router;
