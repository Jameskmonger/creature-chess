import React from "react";
import { Meta, Story } from "@storybook/react";

import { CreatureType, DefinitionClass } from "@creature-chess/models";
import { Piece } from "./Piece";

import "./Piece.stories.css";
import { PieceContextProvider } from "./PieceContext";

export default {
  title: "Piece",
  component: Piece,
  argTypes: {},
} as Meta;

const PieceTile = ({
  color,
  children,
}: {
  color: "dark" | "light";
  children?: React.ReactNode;
}) => <div className={`piece-story ${color}`}>{children}</div>;

const ownerId = "123";

const Template: Story<any> = (args) => {
  const { healthbar, piece } = createProps(args);

  return (
    <div className="piece-story-tiles">
      <PieceTile color="light" />
      <PieceTile color="dark">
        <PieceContextProvider value={{ piece, viewingPlayerId: ownerId }}>
          <Piece healthbar={healthbar} />
        </PieceContextProvider>
      </PieceTile>
      <PieceTile color="light" />
      <PieceTile color="dark" />
      <PieceTile color="light" />
      <PieceTile color="dark" />
      <PieceTile color="light" />
      <PieceTile color="dark" />
      <PieceTile color="light">
        <PieceContextProvider value={{ piece, viewingPlayerId: "123" }}>
          <Piece healthbar={healthbar} />
        </PieceContextProvider>
      </PieceTile>
      <PieceTile color="dark" />
    </div>
  );
};

const createProps = (args: any) => ({
  healthbar: args.healthbar,
  piece: {
    id: "123",
    ownerId,
    definitionId: args.definitionId || 10,
    definition: {
      id: args.definitionId || 10,
      name: "",
      class: args.creatureClass || DefinitionClass.VALIANT,
      type: args.creatureType || CreatureType.Fire,
      cost: args.creatureCost || 5,
      stages: [],
    },
    facingAway: args.facingAway,
    maxHealth: args.maxHealth || 100,
    currentHealth: args.currentHealth || 50,
    stage: args.stage || 0,
  },
});

export const Friendly = Template.bind({});
Friendly.args = {
  healthbar: "friendly",
  definitionId: 20,
  currentHealth: 75,
  maxHealth: 100,
  stage: 1,
  facingAway: false,
  creatureClass: DefinitionClass.VALIANT,
  creatureType: CreatureType.Earth,
  creatureCost: 3,
};
