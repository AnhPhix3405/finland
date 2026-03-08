import { Metadata } from "next";
import Link from "next/link";
import { PropertyFilter } from "../../../components/property/PropertyFilter";
import { Pagination } from "../../../components/shared/Pagination";

export const metadata: Metadata = {
  title: "Danh Sách Dự Án - finland.vn",
};

export default function ProjectList() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <nav aria-label="Breadcrumb" className="flex mb-4">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link className="text-xs text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors uppercase tracking-wider font-semibold" href="/">Trang chủ</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="text-gray-400 text-xs mx-1">/</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Danh sách dự án</span>
            </div>
          </li>
        </ol>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">DANH SÁCH DỰ ÁN BẤT ĐỘNG SẢN</h1>
      
      <PropertyFilter hidePrice={true} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex flex-col hover:border-primary transition-colors shadow-sm">
          <div className="relative h-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Vinhomes Ocean Park 3" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDegODUZ6REUfZ6wkYPWzTvrGzNKwi9JzombB3Jm48DAIJ6gU_Hcip9JPHZawF2rOio2uMXLrU1OxdeQEccJN8BVYW3aLazAcmZuCXbn17s81oYARqRzA-VpwhKIjoRnPYKUdiVh2LRe0G7cZ-0UnMSkC8uZokSoX-EuTpK-RoVvRFwTlG0oEnHn3JFa5oYq9rSfn0VyqzW2enpvmLRt07e7y42Ow2L-dFD6LKIXCOG6f-ZQ2E3R6496POzsn00YuELKLh2o2H1XF1O"/>
            <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Đang mở bán
            </div>
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-2 hover:text-primary cursor-pointer transition-colors leading-tight">Vinhomes Ocean Park 3</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mb-3 truncate">
              <span className="material-symbols-outlined text-[14px] mr-1 text-gray-400">location_on</span>
              Văn Giang, Hưng Yên
            </div>
            <div className="flex justify-end items-center mb-4 mt-auto">
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400">75 m²</span>
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-slate-700">
              <a className="flex justify-center items-center w-full px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-xs font-bold uppercase tracking-wider transition-colors" href="/du-an/demo">
                XEM CHI TIẾT
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex flex-col hover:border-primary transition-colors shadow-sm">
          <div className="relative h-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Khu đô thị Aqua City" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsMeEiB-shjejI2MZohhnY1E4ZqZviwN4BtQM5XyfoKFguCaoH4EIbZMQhQGIDbelvkQNbHOY7ok5w3aKy5kDO-GK9fwG32LrAi64RwxkqKX31C8IvFMjpwS6DuzYPfUJ9DkoeXM7dgN5aPywVa8Oaz0vzCZ7w5zzNzU50GzO_gJdjiajPHmAVDuygloybiE3FCYNujYDXPICxDdTh0rs4ZxLWLVqsy3L7PfTtoXfL_9-5QMKrut-C2w0YkFBF1IDkxczDnFMBsPTX"/>
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Sắp bàn giao
            </div>
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-2 hover:text-primary cursor-pointer transition-colors leading-tight">Khu đô thị sinh thái thông minh Aqua City</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mb-3 truncate">
              <span className="material-symbols-outlined text-[14px] mr-1 text-gray-400">location_on</span>
              Biên Hòa, Đồng Nai
            </div>
            <div className="flex justify-end items-center mb-4 mt-auto">
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400">120 m²</span>
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-slate-700">
              <a className="flex justify-center items-center w-full px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-xs font-bold uppercase tracking-wider transition-colors" href="/du-an/demo">
                XEM CHI TIẾT
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex flex-col hover:border-primary transition-colors shadow-sm">
          <div className="relative h-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Masteri Centre Point" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9b2hFSFxaOuDlxVhafP7OzZUSTbxay9I4hadpxI_oHuHGJcdagL-ls1TQ57H7kADtmWdGELHQWeDxwJN0LEpJw2evOuCDRd1VyhAxpg0B3pZDd0SKPM4Z9a_72kjBO46KWmTzCh0ceySePMso8k_Gs3fxJy9TWc80-HIKCfNRugpvfUXiyTQM5TcdjVlHj-Q8GIuvoFEvAJvK6k5j44g-lRwsbnA2ILZutTVtyEtB67anekCfI14HlaogL0PbtR9mgdgf1dGYoTbY"/>
            <div className="absolute top-2 left-2 bg-gray-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Đã bàn giao
            </div>
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-2 hover:text-primary cursor-pointer transition-colors leading-tight">Khu căn hộ compound cao cấp Masteri Centre Point</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mb-3 truncate">
              <span className="material-symbols-outlined text-[14px] mr-1 text-gray-400">location_on</span>
              Quận 9, TP.HCM
            </div>
            <div className="flex justify-end items-center mb-4 mt-auto">
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400">50 m²</span>
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-slate-700">
              <a className="flex justify-center items-center w-full px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-xs font-bold uppercase tracking-wider transition-colors" href="/du-an/demo">
                XEM CHI TIẾT
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex flex-col hover:border-primary transition-colors shadow-sm">
          <div className="relative h-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="The Global City" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDegODUZ6REUfZ6wkYPWzTvrGzNKwi9JzombB3Jm48DAIJ6gU_Hcip9JPHZawF2rOio2uMXLrU1OxdeQEccJN8BVYW3aLazAcmZuCXbn17s81oYARqRzA-VpwhKIjoRnPYKUdiVh2LRe0G7cZ-0UnMSkC8uZokSoX-EuTpK-RoVvRFwTlG0oEnHn3JFa5oYq9rSfn0VyqzW2enpvmLRt07e7y42Ow2L-dFD6LKIXCOG6f-ZQ2E3R6496POzsn00YuELKLh2o2H1XF1O"/>
            <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Đang mở bán
            </div>
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-2 hover:text-primary cursor-pointer transition-colors leading-tight">The Global City</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mb-3 truncate">
              <span className="material-symbols-outlined text-[14px] mr-1 text-gray-400">location_on</span>
              TP. Thủ Đức, TP.HCM
            </div>
            <div className="flex justify-end items-center mb-4 mt-auto">
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400">95 m²</span>
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-slate-700">
              <a className="flex justify-center items-center w-full px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-xs font-bold uppercase tracking-wider transition-colors" href="/du-an/demo">
                XEM CHI TIẾT
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex flex-col hover:border-primary transition-colors shadow-sm">
          <div className="relative h-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Vinhomes Smart City" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsMeEiB-shjejI2MZohhnY1E4ZqZviwN4BtQM5XyfoKFguCaoH4EIbZMQhQGIDbelvkQNbHOY7ok5w3aKy5kDO-GK9fwG32LrAi64RwxkqKX31C8IvFMjpwS6DuzYPfUJ9DkoeXM7dgN5aPywVa8Oaz0vzCZ7w5zzNzU50GzO_gJdjiajPHmAVDuygloybiE3FCYNujYDXPICxDdTh0rs4ZxLWLVqsy3L7PfTtoXfL_9-5QMKrut-C2w0YkFBF1IDkxczDnFMBsPTX"/>
            <div className="absolute top-2 left-2 bg-gray-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Đã bàn giao
            </div>
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-2 hover:text-primary cursor-pointer transition-colors leading-tight">Vinhomes Smart City</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mb-3 truncate">
              <span className="material-symbols-outlined text-[14px] mr-1 text-gray-400">location_on</span>
              Nam Từ Liêm, Hà Nội
            </div>
            <div className="flex justify-end items-center mb-4 mt-auto">
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400">43 m²</span>
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-slate-700">
              <a className="flex justify-center items-center w-full px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-xs font-bold uppercase tracking-wider transition-colors" href="/du-an/demo">
                XEM CHI TIẾT
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex flex-col hover:border-primary transition-colors shadow-sm">
          <div className="relative h-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Ecopark" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9b2hFSFxaOuDlxVhafP7OzZUSTbxay9I4hadpxI_oHuHGJcdagL-ls1TQ57H7kADtmWdGELHQWeDxwJN0LEpJw2evOuCDRd1VyhAxpg0B3pZDd0SKPM4Z9a_72kjBO46KWmTzCh0ceySePMso8k_Gs3fxJy9TWc80-HIKCfNRugpvfUXiyTQM5TcdjVlHj-Q8GIuvoFEvAJvK6k5j44g-lRwsbnA2ILZutTVtyEtB67anekCfI14HlaogL0PbtR9mgdgf1dGYoTbY"/>
            <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Đang mở bán
            </div>
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-2 hover:text-primary cursor-pointer transition-colors leading-tight">Khu đô thị sinh thái Ecopark</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mb-3 truncate">
              <span className="material-symbols-outlined text-[14px] mr-1 text-gray-400">location_on</span>
              Văn Giang, Hưng Yên
            </div>
            <div className="flex justify-end items-center mb-4 mt-auto">
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400">65 m²</span>
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-slate-700">
              <a className="flex justify-center items-center w-full px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-xs font-bold uppercase tracking-wider transition-colors" href="/du-an/demo">
                XEM CHI TIẾT
              </a>
            </div>
          </div>
        </div>

      </div>

      <Pagination />
    </div>
  );
}
