import React from "react";
import { Button } from "./";
import { MenuText } from "./MenuItems";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ButtonGroupProps {
  setActive: React.Dispatch<React.SetStateAction<MenuText>>;
  router: AppRouterInstance;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ setActive, router }) => {
  const hasConnected = true;

  return hasConnected ? (
    <Button
      classStyles="mx-2 rounded-xl"
      btnName="Create"
      handleClick={() => {
        setActive("");
        router.push("/create-nft");
      }}
    />
  ) : (
    <Button
      classStyles="mx-2 rounded-xl"
      btnName="Connect"
      handleClick={() => {
        //   connect MetaMask
      }}
    />
  );
};

export default ButtonGroup;
