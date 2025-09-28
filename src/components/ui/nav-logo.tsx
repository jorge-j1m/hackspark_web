import { Zap } from "lucide-react";
import Link from "next/link";

const NavLogo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold">HackSpark</span>
      </div>
    </Link>
  );
};

export default NavLogo;
