import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

import { env } from "@/env.mjs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

type Props = { referralCode: number };

const ReferralLinkCard = ({ referralCode }: Props) => {
  const referralLink = `${env.NEXT_PUBLIC_TELEGRAM_URL}?startapp=${referralCode}`;

  const { toast } = useToast();

  const onCopyText = () => {
    toast({
      title: "Referral link Copied",
      description: referralLink,
    });
  };

  return (
    <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>Spread the Word</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Share your unique referral link and unlock exclusive benefits for each
          friend who joins.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <CopyToClipboard text={referralLink} onCopy={onCopyText}>
          <Button>
            <Copy className="mr-2 h-4 w-4" /> Invite Now
          </Button>
        </CopyToClipboard>
      </CardFooter>
    </Card>
  );
};

export default ReferralLinkCard;
