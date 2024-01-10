// SECTION == IMPORTS ==
import express from 'express';
import ViteExpress from 'vite-express';
import multer from 'multer';
import fs from 'fs';

// !SECTION ========

// SECTION == INITIALIZERS ==
const app = express();

// !SECTION ========

// SECTION == MIDDLE-WARE==
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ANCHOR -  Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);
    let folder;
    file.fieldname === 'map' ? (folder = 'public/maps') : (folder = 'public/images');

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // add filenames to req.body
    let name = file.originalname.toLowerCase().split(' ');
    name = name.join('-');
    const fileName = `${Date.now()}-${name}`;
    if (file.fieldname === 'map') {
      req.body.map = fileName;
    } else if (file.fieldname === 'image') {
      req.body.image = fileName;
    }

    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

// !SECTION ========

// SECTION == FUNCTIONS ==

const updateChainQuests = () => {};

// !SECTION

// SECTION == ROUTES ==

// ANCHOR -- Get Quests
app.get('/questsData', (req, res) => {
  // 1: get needed data
  const questData = JSON.parse(fs.readFileSync('./Data/questData.json'));

  // 2: send response
  res.status(200).send(questData);
});

// ANCHOR -- Get quests by zone ID
app.get('/questsByZone/:id', (req, res) => {
  // 1: get needed data
  const questData = JSON.parse(fs.readFileSync('./Data/questData.json'));
  const zoneData = JSON.parse(fs.readFileSync('./Data/zoneData.json'));
  const zoneId = +req.params.id;

  // 2: get full zone data of the zone id provided
  const zone = zoneData.filter((zone) => {
    return zone.id === zoneId;
  });

  // 3: filter quests by the zone just retrieved
  const quests = questData.filter((quest) => {
    return quest.zone === zone[0].name;
  });

  // 4: send response
  if (!quests) {
    res.status(400).send({ message: 'No zone by that ID found...' });
  } else {
    res.status(200).send(quests);
  }
});

// ANCHOR -- Post Quest
app.post('/quest', (req, res) => {
  // 1: get needed data
  let questData = JSON.parse(fs.readFileSync('./Data/questData.json'));
  const newQuest = req.body;
  // console.log(newQuest);

  // Check for duplicate quest name
  const duplicateQuest = questData.filter((quest) => {
    return quest.name === newQuest.name;
  });

  // console.log('duplicate quest');
  // console.log(duplicateQuest);

  // if duplicate, return with error
  if (duplicateQuest.length > 0) {
    console.log('FOUND DUPLICATE! FAILED');
    res.status(402).send({
      message: 'A quest with that name already exists!',
    });
  } else {
    console.log('no duplicated! CONTINUE');

    // 2: create ID and append it to the new quest object
    let questName = newQuest.name.toLowerCase().split(' ');
    questName = questName.join('-');
    const newQuestId = `${Date.now()}-${questName}`;
    newQuest.id = newQuestId;

    // 3: add new quest to database
    questData = [...questData, newQuest];

    // 4: write updates to the JSON file
    fs.writeFileSync('./Data/questData.json', JSON.stringify(questData));

    // 5: if Chain selected, update the chain quest array

    // 5: send response
    res.status(201).send({
      message: 'New quest created successfully!',
      questData: questData,
    });
  }
});

// ANCHOR -- Put Quest
app.put('/quest', (req, res) => {
  // console.log(' -- PUT QUEST --');
  // 1: get needed data
  const questData = JSON.parse(fs.readFileSync('./Data/questData.json'));
  const chainData = JSON.parse(fs.readFileSync('./Data/chainData.json'));
  const questId = req.body.id;
  // console.log(questId);
  const updatedQuest = req.body;
  // console.log('updatedQuest:');
  // console.log(updatedQuest);

  // 2: find appropriate quest and update it
  questData.forEach((quest, index) => {
    if (quest.id === updatedQuest.id) {
      questData.splice(index, 1, updatedQuest);
    }
  });

  // 3: change chain order if it was changed
  // pull the appropriate chain from the chainData
  // NOTE - DESABLED, this is currently broken and will require more work to complete; not needed to meet project requirements
  /*
  const updatedChainIndex = chainData.findIndex(
    (c) => c.id === updatedQuest.chain.id
  );

  console.log(updatedChainIndex);

  // if chain was set to none, find any previous instances of this quests ID from the chainData and remove it
  if (updatedChainIndex === -1) {
    chainData.forEach((c, idx) => {
      c.quests.forEach((qId, i) => {
        console.log(qId);
        console.log(questId);
        if (qId === questId) {
          console.log("MATCH");
          console.log(chainData[idx].quests[i]);
          chainData[idx].quests.splice(i, 1);
        }
      });
    });
  } else {
    // get the old array index of the quest that is being updated from the chain quest array
    const updatedQuestIndex = chainData[updatedChainIndex].quests.findIndex(
      (qId) => qId === questId
    );

    chainData[updatedChainIndex].quests.splice(updatedQuestIndex, 1);
    chainData[updatedChainIndex].quests.splice(
      updatedQuest.chain.position,
      0,
      questId
    );
  }
  */
  // Update the chainData JSON File
  fs.writeFileSync('./Data/chainData.json', JSON.stringify(chainData));
  // write changes to the JSON file
  fs.writeFileSync('./Data/questData.json', JSON.stringify(questData));

  // 4: send response
  res.status(200).send({
    message: 'Quest updated succeffully',
    questData: questData,
    chainData: chainData,
  });
});

// ANCHOR -- Delete Quest
app.delete('/quest/:id', (req, res) => {
  // console.log('DELETE quest');
  // 1: get needed data
  const questData = JSON.parse(fs.readFileSync('./Data/questData.json'));
  const questId = req.params.id;
  // console.log(questId);

  // 2: find the quest that matches the ID provided and delete it
  questData.forEach((quest, index) => {
    if (quest.id === questId) {
      questData.splice(index, 1);
    }
  });
  // console.log(questData);

  // 3: write changes to the JSON file
  fs.writeFileSync('./Data/questData.json', JSON.stringify(questData));

  // 4: send response
  res.status(200).send({
    message: 'Quest deleted successfully',
    questData: questData,
  });
});

// ANCHOR -- Get ChainsData
app.get('/chainsData', (req, res) => {
  // 1: get needed data
  const chainData = JSON.parse(fs.readFileSync('./Data/chainData.json'));

  // 2: send response
  res.status(200).send(chainData);
});

// ANCHOR -- Post Chain
app.post('/chain', (req, res) => {
  // console.log('POST CHAIN');
  // 1: get needed data
  let chainData = JSON.parse(fs.readFileSync('./Data/chainData.json'));
  const newChain = req.body;
  // console.log(newChain);

  // check for duplicate chain name
  const duplicateChain = chainData.filter((chain) => {
    return chain.name === newChain.name;
  });

  if (duplicateChain.length > 0) {
    res.status(402).send({
      message: 'A chain by that name already exists!',
    });
  } else {
    // 2: create unique ID for new chain
    let chainName = newChain.name.toLowerCase().split(' ');
    chainName = chainName.join('-');
    const newQuestId = `${Date.now()}-${chainName}`;
    newChain.id = newQuestId;
    // console.log(newChain);

    // 3: add new chain to database
    chainData = [...chainData, newChain];

    // 4: write updates to the JSON file
    fs.writeFileSync('./Data/chainData.json', JSON.stringify(chainData));

    // 5: send response
    res.status(201).send({
      message: 'new chain added successfully!',
      chainData: chainData,
    });
  }
});

// ANCHOR -- Put Chain
app.put('/chain', (req, res) => {
  // console.log('PUT CHAIN');
  // 1: get needed data
  const chainData = JSON.parse(fs.readFileSync('./Data/chainData.json'));
  const chainId = req.body.id;
  // console.log(chainId);
  const updatedChain = req.body;
  // console.log(updatedChain);

  // 2: find appropriate chain and make update to it
  chainData.forEach((quest, index) => {
    if (quest.id === updatedChain.id) {
      chainData.splice(index, 1, updatedChain);
    }
  });

  // 3: write updates to the JSON file
  fs.writeFileSync('./Data/chainData.json', JSON.stringify(chainData));

  // 4: send response
  res.status(200).send({
    message: 'Chain updated succeffully',
    chainData: chainData,
  });
});

// ANCHOR -- Delete Chain
app.delete('/chain/:id', (req, res) => {
  // console.log('DELETE CHAIN');
  // 1: get needed data
  const chainData = JSON.parse(fs.readFileSync('./Data/chainData.json'));
  const chainId = req.params.id;
  // console.log(chainId);

  // 2: find appropriate chain and delete it
  chainData.forEach((quest, index) => {
    if (quest.id === chainId) {
      chainData.splice(index, 1);
    }
  });
  // console.log(chainData);

  // 3: write updates to the JSON file
  fs.writeFileSync('./Data/chainData.json', JSON.stringify(chainData));

  // 4: send response
  res.status(200).send({
    message: 'Chain deleted successfully',
    chainData: chainData,
  });
});

// ANCHOR -- Get Zones Data
app.get('/zonesData', (req, res) => {
  // 1: get needed data
  const zoneData = JSON.parse(fs.readFileSync('./Data/zoneData.json'));

  // 2: send response
  res.status(200).send(zoneData);
});

// ANCHOR -- Get Zone by ID
app.get('/zoneData/:id', (req, res) => {
  // 1: get needed data
  const zoneData = JSON.parse(fs.readFileSync('./Data/zoneData.json'));
  const id = req.params.id;
  // console.log(id);

  // 2: find appropriate zone using the ID provided
  const zone = zoneData.filter((el) => {
    return el.id === id;
  });

  // console.log('get zoneData by ID:');
  console.log(zone);

  // 3: send response
  if (!zone) {
    res.status(400).send({ message: 'No zone by that ID found...' });
  } else {
    res.status(200).send(zoneData);
  }
});

// ANCHOR -- Post Zone
app.post('/zone', upload.fields([{ name: 'map' }, { name: 'image' }]), (req, res) => {
  // 1: get needed data
  const { name, map, image, quests, npcs, dungeons, bosses, minibosses, pointsOfInterest } = req.body;
  let zoneData = JSON.parse(fs.readFileSync('./Data/zoneData.json'));

  // check for duplicate zone name
  const duplicateZone = zoneData.filter((zone) => {
    return zone.name === name;
  });

  if (duplicateZone.length > 0) {
    res.status(402).send({
      message: 'A zone by that name already exists!',
    });
  } else {
    // 2: Create ID for the new zone
    let zoneName = name.toLowerCase().split(' ');
    zoneName = zoneName.join('-');
    const newZoneId = `${Date.now()}-${zoneName}`;

    // 3: put the new zone in the appropriate format
    const newZone = {
      id: newZoneId,
      name: name,
      map: map,
      image: image,
      requirements: {
        quests: quests,
        npcs: npcs,
        dungeons: dungeons,
        bosses: bosses,
        minibosses: minibosses,
        pointsOfInterest: pointsOfInterest,
      },
    };

    // console.log('newZone:');
    // console.log(newZone);

    // 4: add the new zone to the zone database
    zoneData = [...zoneData, newZone];

    // console.log('zoneData:');
    // console.log(zoneData);

    // 5: write the updates to the JSON file
    fs.writeFileSync('./Data/zoneData.json', JSON.stringify(zoneData));

    // 6: send response
    res.status(201).send({
      message: 'Zone created successfully!',
      zoneData: zoneData,
    });
  }
});

// ANCHOR -- Put Zone
app.put('/zone', upload.fields([{ name: 'map' }, { name: 'image' }]), (req, res) => {
  // console.log('PUT ZONE');
  // 1: get needed data
  const { id, name, map, image, quests, npcs, dungeons, bosses, minibosses, pointsOfInterest } = req.body;
  const zoneData = JSON.parse(fs.readFileSync('./Data/zoneData.json'));

  // 2: Structure the updatedZone object appropriately
  const updatedZone = {
    id: id,
    name: name,
    map: map,
    image: image,
    requirements: {
      quests: quests,
      npcs: npcs,
      dungeons: dungeons,
      bosses: bosses,
      minibosses: minibosses,
      pointsOfInterest: pointsOfInterest,
    },
  };

  // console.log('Updated Zone:');
  // console.log(updatedZone);

  // 2: find appropriate zone and make update to it
  zoneData.forEach((zone, index) => {
    if (zone.id === updatedZone.id) {
      // delete old map if it exists
      if (zone.map != updatedZone.map) {
        fs.unlinkSync(`./public/maps/${zone.map}`);
      }
      // delete old image if it exists
      if (zone.image != updatedZone.image) {
        fs.unlinkSync(`./public/images/${zone.image}`);
      }
      // replace old zonedata with updatedZone
      zoneData.splice(index, 1, updatedZone);
    }
  });

  // 3: write updates to the JSON file
  fs.writeFileSync('./Data/zoneData.json', JSON.stringify(zoneData));

  // 4: send response
  res.status(200).send({
    message: 'Zone updated succeffully',
    zoneData: zoneData,
  });
});

// ANCHOR -- Delete Zone
app.delete('/zone/:id', (req, res) => {
  // 1: get the needed data
  const zoneData = JSON.parse(fs.readFileSync('./Data/zoneData.json'));
  const zoneId = req.params.id;

  // 2: find the appropriate zone using the provided ID if it exists
  zoneData.forEach((zone, index) => {
    if (zone.id === zoneId) {
      // Find Map if it exists and delete it
      if (zone.map) {
        fs.unlinkSync(`./public/maps/${zone.map}`);
      }
      // Find Image if it exists and delete it
      if (zone.image) {
        fs.unlinkSync(`./public/images/${zone.image}`);
      }
      // delete the zone entirely
      zoneData.splice(index, 1);
    }
  });

  // 3: write the updates to the JSON file
  fs.writeFileSync('./Data/zoneData.json', JSON.stringify(zoneData));

  // 4: send response
  res.status(200).send({
    message: 'Zone deleted successfully!',
    zoneData: zoneData,
  });
});

// !SECTION ========

// SECTION == SERVER ==
ViteExpress.listen(app, 3000, () => {
  console.log('👂Listening to server on port 3000');
});

// !SECTION
