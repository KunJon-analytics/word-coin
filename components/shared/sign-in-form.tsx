"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useLaunchParams } from "@tma.js/sdk-react";

import { cn } from "@/lib/utils";
import { login } from "@/actions/session";

import { useToast } from "../ui/use-toast";
import FormButton from "../shared/form-button";
import { Button } from "../ui/button";

type SignInFormProps = {} & React.ComponentProps<"form">;

export default function SignInForm({ className }: SignInFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const initDataRaw = useLaunchParams().initDataRaw;

  if (!initDataRaw) {
    return (
      <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
        <Button variant="default" disabled>
          Unauthorized
        </Button>
      </div>
    );
  }

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      action={async () => {
        try {
          const result = await login(initDataRaw);
          if (!result.success) {
            return toast({
              variant: "destructive",
              title: "Error",
              description: result.message,
            });
          }
          // toast message
          toast({
            title: "Success",
            description: result.message,
          });
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
