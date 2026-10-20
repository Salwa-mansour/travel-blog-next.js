import Image from "next/image";
import Link from "next/link";

export default function Header(){
    return ( <header className="flex justify-between p-4">
                <Link href="/">
                <Image src="/next.svg" alt="" width={100} height={20}  priority />
                </Link>
                <nav className="flex items-center gap-4 text-sm font-medium">
                    <Link href="/" >Home</Link>
                    <Link href="/posts" >posts</Link>
                </nav>
             </header>
        )
}