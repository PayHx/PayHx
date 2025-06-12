import { PiggyBankIcon } from "lucide-react";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="flex gap-2">
        <PiggyBankIcon />
        <h1>PayHx</h1>
      </div>
    </Link>
  );
};
