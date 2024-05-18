"use client";

import React from "react";
import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";
import { Icons } from "./icons";

type FormButtonProps = { buttonText: string };

const FormButton = ({ buttonText }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button variant="default" disabled={pending} type="submit">
      {pending ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.login className="mr-2 h-4 w-4" />
      )}
      {buttonText}
    </Button>
  );
};

export default FormButton;
