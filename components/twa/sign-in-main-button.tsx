"use client";

import { useCallback, useEffect } from "react";
import { useMainButton } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";

import useUser from "@/hooks/use-user";
import { useToast } from "../ui/use-toast";

type SignInMainButtonProps = { pageAction: () => void; pageActionText: string };

const SignInMainButton = ({
  pageAction,
  pageActionText,
}: SignInMainButtonProps) => {
  const { user, isError, isLoading, login, loginLoading, loginError } =
    useUser();
  const mb = useMainButton(true);
  const { refresh } = useRouter();
  const { toast } = useToast();

  const buttonLoading = isLoading || !mb || loginLoading;
  const isErrorButton = isError || loginError;

  const mainButtonAction = useCallback(async () => {
    if (buttonLoading) {
      return;
    }

    if (isErrorButton) {
      return;
    }

    if (!user) {
      try {
        await login();
        refresh();
      } catch (error) {
        console.log(error);
        // toast error
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          variant: "destructive",
        });
      } finally {
        return;
      }
    }

    return pageAction();
  }, [isErrorButton, buttonLoading, user, login, pageAction]);

  useEffect(() => {
    if (buttonLoading) {
      mb?.setParams({ isLoaderVisible: true, isEnabled: false });
    } else if (isErrorButton) {
      mb?.setParams({
        text: "Request Error",
        backgroundColor: "#FF3333",
        isLoaderVisible: false,
        isEnabled: true,
      });
    } else if (!user) {
      mb?.setParams({
        text: "Sign In",
        backgroundColor: undefined,
        isLoaderVisible: false,
        isEnabled: true,
      });
    } else {
      mb?.setParams({
        text: pageActionText,
        backgroundColor: undefined,
        isLoaderVisible: false,
        isEnabled: true,
      });
    }

    return mb?.on("click", mainButtonAction);
  }, [
    buttonLoading,
    mb,
    isErrorButton,
    user,
    mainButtonAction,
    pageActionText,
  ]);

  return null;
};

export default SignInMainButton;
