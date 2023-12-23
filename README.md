# Epic Adventure Game Quest Organizer

## - Description -

During my journey creating my dream video game, I have tried many different methods of organizing my data. I've tried notebooks, excel spreadsheets, and many online organizer apps. None of them have fully fit my needs to my liking. When designing a game at this scale, there are many interconnected pieces that are constantly changing as I do new iterations. Every organization method I've tried results in to many reduntant changeing and editing. I need a system that does all of the changing behind the scenes so I can make one change in one place and have everything else update on its own. This project is designed to fix this problem for me, so I can spend more time creating and less time updating notes and flowcharts.

This project will focus on organizing my quests and quest-chains. Quest chains can range from simple to very complex and encapsulate almost every component of my project, from NPCs, to enemies, to reward systems and progression systems.

## - Features -

#### Home Page:

The home page will list the 3 different methods of viewing my quest and quest-chain data, all of which are required to achieve different goals. You can navigate to each page on this main navigation page.

#### 🗺️ Zones:

The Zones pages allow you to view quests from the lense of a single zone. Each zone has a list of required amount of quests, quest types, and some other miscellaneous requirements. This view enables you to quickly view your progress in reaching your requirements, as well as seeing info about all of the quests for each individual zone.

In this page, you can create new Zones, as well as update or delete existing Zones. Each zone needs the following data:

- Name
- map image

#### ❓Quests:

The Quests page is a database of all quests, and will provide statistics on your quests so you can make sure to balance your quests and make changes as needed.

on this page you can filter, create, update, and delete quests. each quest requires the following data:

- name
- type
- description
- reward
- quest chain: {
  name:
  number:
  }

#### 🔗 Quest Chains:

the Quest Chains page allows you to view your quest chains. Viewing your quests in this fashion is vital to balancing the content in the game world. This page will show the pathway for each quest-chain so you know what zones need more content.

on this page, you can create new quest chains and add or remove quests to the quest chain. Quest Chains take in the following data:

- name
- quests
