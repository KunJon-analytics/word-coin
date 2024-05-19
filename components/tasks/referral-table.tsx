import React from "react";
import { formatDistanceToNow } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaderboardUsers } from "@/types";

type Props = {
  users: LeaderboardUsers;
};

const ReferralTable = ({ users }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prospector</TableHead>
          <TableHead className="hidden md:table-cell">Joined</TableHead>
          <TableHead className="text-right">Referrals</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.firstName}>
            <TableCell>
              <div className="font-medium">
                {user.username || user.firstName}
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {formatDistanceToNow(user.createdAt, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </TableCell>
            <TableCell className="text-right">{user.noOfReferrals}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReferralTable;
