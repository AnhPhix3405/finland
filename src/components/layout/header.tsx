import { ChevronDownIcon, MenuSquare, DollarSignIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import "./header.css";
import Link from "next/link";
export default function Header() {
    return (
        <header className="w-full bg-white border-b border-gray-200 px-2 py-2">
            {/* Top Row: Logo/Slogan + Navigation */}
            <div className="flex items-center justify-between">
                {/* Left: Logo + Slogan */}
                <div className="flex flex-col">
                    <div className="logo">
                    </div>
                    {/* <h1 className="text-lg font-bold text-[#003580]">GULAND</h1> */}
                    <p className="text-xs text-[#003580] mt-1 font-bold text-center">SLOGAN TEXT</p>
                </div>

                {/* Right: Navigation Icons */}
                <div className="flex items-center gap-3">
                    <Link href="/quy-hoach">
                        <button className="flex flex-col items-center gap-1 py-1">
                            <img src="imgs/search.png" alt=""
                                className="block w-8 h-6"
                            />
                            <span className="text-[11px] text-[#343a40]">Quy hoạch</span>
                        </button>
                    </Link>
                    <Link href="/check-gia">
                        <button className="flex flex-col items-center gap-1 py-1">
                            <DollarSignIcon className="w-8 h-6 text-black" />
                            <span className="text-[11px] text-[#343a40]">Check giá</span>
                        </button>
                    </Link>
                    <Link href="/danh-muc">
                        <button className="flex flex-col items-center gap-1 py-1">
                            <MenuSquare className="w-8 h-6 text-black" />
                            <span className="text-[11px] text-[#343a40]">Danh mục</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Bottom Row: Location Search + Search Button */}
            <div className="flex items-center gap-2 bg-gray-50">
                {/* Location Input with GPS */}
                <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
                    <Image
                        src="/svgs/target-icon.svg"
                        alt="GPS Icon"
                        width={20}
                        height={20}
                        className="w-5 h-5 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Vĩnh Long"
                        className="flex-1 text-sm text-black placeholder-gray-500 border-none outline-none"
                        defaultValue="Vĩnh Long"
                    />
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 ml-2" />
                </div>

                {/* Search Button */}
                <button className="bg-white p-2 rounded-lg border border-black">
                    <SearchIcon className="w-5 h-5 text-black" />
                </button>
            </div>
        </header>
    );
}