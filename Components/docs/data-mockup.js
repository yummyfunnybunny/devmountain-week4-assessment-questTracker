// Zone Data Mockup

[
  {
    id: "id-string",
    name: "zone-name",
    map: "image-file",
    image: "image-file",
    requirements: {
      quests: "number",
      npcs: "number",
      dungeons: "number",
      bosses: "number",
      minibosses: "number",
      pointsOfInterest: "number",
    },
  },
];

// Chain Data Mockup

[
  {
    id: "id-string",
    name: "chain name",
    quests: ["quest-id", "quest-id", "quest-id"],
  },
];

// Quest Data Mockup
[
  {
    id: "quest-id",
    name: "quest name",
    type: "quest type",
    description: "quest description",
    zone: "zone",
    reward: { type: "reward type", description: "reward description" },
    chain: { id: "chain-id", position: "number" },
  },
];
