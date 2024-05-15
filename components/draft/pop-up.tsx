"use client";

import React from "react";
import WebApp from "@twa-dev/sdk";

import { Button } from "../ui/button";

const PopUp = () => {
  return <Button onClick={() => WebApp.showAlert("Hey there!")}> </Button>;
};

export default PopUp;
