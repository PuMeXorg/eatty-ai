import Image from "next/image";
import Link from "next/link";

export default function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3 font-extrabold text-[18px]">
      <Image
        src="/assets/eatty-icon.png"
        alt=""
        width={compact ? 32 : 38}
        height={compact ? 32 : 38}
        className="rounded-[11px] shadow-[0_10px_22px_-12px_rgba(46,126,87,.7)]"
        priority
      />
      <span>Eatty AI</span>
    </Link>
  );
}
