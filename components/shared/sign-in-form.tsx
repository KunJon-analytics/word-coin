"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import useUser from "@/hooks/use-user";

import { useToast } from "../ui/use-toast";
import FormButton from "../shared/form-button";
import ErrorButton from "./error-button";
import LoadingButton from "./loading-button";
import { useRouter } from "next/navigation";

type SignInFormProps = {} & React.ComponentProps<"form">;

export default function SignInForm({ className }: SignInFormProps) {
  const { toast } = useToast();
  const { initDataRaw, login, loginLoading, loginError } = useUser();
  const router = useRouter();

  if (!initDataRaw) {
    return (
      <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
        <ErrorButton buttonText="Unauthorized" />
      </div>
    );
  }
  if (loginLoading) {
    return (
      <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
        <LoadingButton />
      </div>
    );
  }
  if (loginError) {
    return (
      <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
        <ErrorButton buttonText="There was an error" />
      </div>
    );
  }

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      action={async () => {
        try {
          await login();
          router.refresh();
        } catch (error) {
          console.log(error);
          // toast error
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            variant: "destructive",
          });
        }
      }}
    >
      <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
        <FormButton buttonText="Sign In" />
      </div>
    </form>
  );
}
