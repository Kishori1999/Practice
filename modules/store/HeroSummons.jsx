import React, { useState } from "react";
import HeroesSection from "./HeroesSection";
import HeroSelection from "./HeroSelection";

const heroes = [
  {
    name: "Kharkuk",
    title: "Chieftan of the Deadlands",
    imgSrc: "/imgs/store/characters/surmaq.png",
    avatarSrc: "/imgs/store/characters/surmaq-avatar.jpg",
  },
  {
    name: "lia",
    title: "Priestess of Illuminiation",
    imgSrc: "/imgs/store/characters/lia.png",
    avatarSrc: "/imgs/store/characters/lia-avatar.jpg",
  },
  {
    name: "Cyrus",
    title: "Infernal Swordsman",
    imgSrc: "/imgs/store/characters/rummus.png",
    avatarSrc: "/imgs/store/characters/rummus-avatar.jpg",
  },
  {
    name: "Rufus",
    title: "Guardian of the Skies",
    imgSrc: "/imgs/store/characters/rufus.png",
    avatarSrc: "/imgs/store/characters/rufus-avatar.jpg",
  },
  {
    name: "Freia",
    title: "Bastion of Defense",
    imgSrc: "/imgs/store/characters/idisi.png",
    avatarSrc: "/imgs/store/characters/idisi-avatar.jpg",
  },
  {
    name: "Helia",
    title: "Princess of Flame",
    imgSrc: "/imgs/store/characters/echidna.png",
    avatarSrc: "/imgs/store/characters/echidna-avatar.jpg",
  },
  {
    name: "Tavros",
    title: "Archmage of Darkness",
    imgSrc: "/imgs/store/characters/tavros.png",
    avatarSrc: "/imgs/store/characters/tavros-avatar.jpg",
  },
  {
    name: "Tieroc",
    title: "Cursed Sorcerer",
    imgSrc: "/imgs/store/characters/tieroc.png",
    avatarSrc: "/imgs/store/characters/tieroc-avatar.jpg",
  },
];

const HeroSummons = () => {
  const [selectedHero, setSelectedHero] = useState(heroes[0]);

  return (
    <>
      <HeroesSection heroes={heroes} selectedHero={selectedHero} />
      <HeroSelection heroes={heroes} selectedHero={selectedHero} onSelect={setSelectedHero} />
    </>
  );
};

export default HeroSummons;
