// SECTION == Imports ==
import express from "express";
import ViteExpress from "vite-express";
import zoneData from "./Data/zoneData.js";
import questData from "./Data/questData.js";
import chainData from "./Data/chainData.js";

// !SECTION ========

// SECTION == Initializers ==
const app = express();

// !SECTION ========

// SECTION == Middle-Ware ==
app.use(express.json());

// !SECTION ========

// SECTION == Routes ==

// ANCHOR Quests
app.get("/questsData", (req, res) => {
  res.status(200).send(questData);
});

app.get("/questsByZone/:id", (req, res) => {
  const zoneId = +req.params.id;
  // console.log(zoneId);

  const zone = zoneData.filter((zone) => {
    return zone.id === zoneId;
  });
  // console.log(zone[0]);

  const quests = questData.filter((quest) => {
    return quest.zone === zone[0].name;
  });
  console.log(quests);
  // Response
  if (!quests) {
    res.status(400).send({ message: "No zone by that ID found..." });
  } else {
    res.status(200).send(quests);
  }
});

// app.post("/quests", (req, res) => {});

// app.mountpath("/quests", (req, res) => {});

// app.delete("/quests", (req, res) => {});

// ANCHOR Chains
app.get("/chainsData", (req, res) => {
  res.status(200).send(chainData);
});

// app.post("/chains", (req, res) => {});

// app.mountpath("/chains", (req, res) => {});

// app.delete("/chains", (req, res) => {});

// ANCHOR Zones
app.get("/zonesData", (req, res) => {
  res.status(200).send(zoneData);
});

app.get("/zoneData/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const zone = zoneData.filter((el) => {
    return el.id === id;
  });

  console.log("get zoneData by ID:");
  console.log(zone);

  // Response
  if (!zone) {
    res.status(400).send({ message: "No zone by that ID found..." });
  } else {
    res.status(200).send(zoneData);
  }
});

// app.post("/zones", (req, res) => {});

// app.mountpath("/zones", (req, res) => {});

// app.delete("/zones", (req, res) => {});

// !SECTION ========

// ANCHOR == Run Server ==
ViteExpress.listen(app, 3000, () => {
  console.log("👂Listening to server on port 3000");
});
