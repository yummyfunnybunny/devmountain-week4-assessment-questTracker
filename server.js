// SECTION == Imports ==
import express from "express";
import ViteExpress from "vite-express";
import multer from "multer";
// import path from "path";
// import url from "url";
import zoneData from "./Data/zoneData.js";
import questData from "./Data/questData.js";
import chainData from "./Data/chainData.js";

// !SECTION ========

// SECTION == Initializers ==
const app = express();
// const rootDir = url.fileURLToPath(new URL(".", import.meta.url));

// !SECTION ========

// SECTION == Middle-Ware ==
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(rootDir, "public")));

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    console.log("=== file ===");
    console.log(file);
    console.log("============");
    cb(null, `${Date.now()}- ${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

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

app.post("/quest", (req, res) => {
  console.log("POST QUEST");
  const newQuest = req.body;
  console.log(newQuest);
  let questName = newQuest.name.split(" ");
  questName = questName.join("-");
  const newQuestId = `${Date.now()}-${questName}`;
  newQuest.id = newQuestId;
  console.log(newQuest);

  questData.push(newQuest);

  res.status(200).send({
    message: "new quest added successfully!",
    questData: questData,
  });
});

app.put("/quest", (req, res) => {
  console.log("PUT QUEST");
  const questId = req.body.id;
  console.log(questId);
  const updatedQuest = req.body;
  console.log(updatedQuest);

  questData.forEach((quest, index) => {
    if (quest.id === updatedQuest.id) {
      questData.splice(index, 1, updatedQuest);
    }
  });

  res.status(200).send({
    message: "Quest updated succeffully",
    questData: questData,
  });
});

app.delete("/quest/:id", (req, res) => {
  console.log("DELETE quest");
  const questId = req.params.id;
  console.log(questId);

  questData.forEach((quest, index) => {
    if (quest.id === questId) {
      questData.splice(index, 1);
    }
  });
  console.log(questData);
  res.status(200).send({
    message: "Quest deleted successfully",
    questData: questData,
  });
});

// ANCHOR Chains
app.get("/chainsData", (req, res) => {
  res.status(200).send(chainData);
});

app.post("/chain", (req, res) => {
  console.log("POST CHAIN");
  const newChain = req.body;
  console.log(newChain);
  let chainName = newChain.name.split(" ");
  chainName = chainName.join("-");
  const newQuestId = `${Date.now()}-${chainName}`;
  newChain.id = newQuestId;
  console.log(newChain);

  chainData.push(newChain);

  res.status(200).send({
    message: "new chain added successfully!",
    chainData: chainData,
  });
});

app.put("/chain", (req, res) => {
  console.log("PUT CHAIN");
  const chainId = req.body.id;
  console.log(chainId);
  const updatedChain = req.body;
  console.log(updatedChain);

  chainData.forEach((quest, index) => {
    if (quest.id === updatedChain.id) {
      chainData.splice(index, 1, updatedChain);
    }
  });

  res.status(200).send({
    message: "Chain updated succeffully",
    chainData: chainData,
  });
});

app.delete("/chain/:id", (req, res) => {
  console.log("DELETE CHAIN");
  const chainId = req.params.id;
  console.log(chainId);

  chainData.forEach((quest, index) => {
    if (quest.id === chainId) {
      chainData.splice(index, 1);
    }
  });
  console.log(chainData);
  res.status(200).send({
    message: "Chain deleted successfully",
    chainData: chainData,
  });
});

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

app.post("/zone", upload.single("map"), (req, res) => {
  console.log("POST ZONE ========");
  console.log("req.file:");
  console.log(req.file);
  console.log("req.body:");
  console.log(req.body);
  console.log("POST ZONE ========");
  res.status(201).send({
    message: "Zone created successfully!",
    zoneData: zoneData,
  });
});

// app.mountpath("/zones", (req, res) => {});

// app.delete("/zones", (req, res) => {});

// !SECTION ========

// ANCHOR == Run Server ==
ViteExpress.listen(app, 3000, () => {
  console.log("👂Listening to server on port 3000");
});
