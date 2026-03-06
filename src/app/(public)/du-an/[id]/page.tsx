import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chi Tiết Dự Án - finland.vn",
};

export default function ProjectDetail() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <nav aria-label="Breadcrumb" className="flex mb-4">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors" href="/">Trang chủ</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-gray-400 text-sm mx-1">chevron_right</span>
              <a className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors" href="/du-an">Danh sách dự án</a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-gray-400 text-sm mx-1">chevron_right</span>
              <span className="text-sm text-gray-900 dark:text-gray-200 font-medium">Vinhomes Ocean Park 3</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[70%] space-y-8">
          <div className="space-y-2">
            <div className="w-full h-[400px] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Vinhomes Ocean Park 3" className="w-full h-full object-cover border border-gray-200 dark:border-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWJfDSBkFjdb6NFuuYDqcJMh6JkD2nLssh6Uq-7Q7mkshnY3r0IP5SElerqpgjgaBV1mP2eHtJsNI6x_E88ILgKDI9P1ruGZnv32KffcEsSEclsEoD9qCVc3P92LEOlsyc24PbN_DsuS6oVKulSkhRSP-f7gIV2tsGJ1slTNfE1iql0csp1-BwnB7Ow-rV8TVxbFlwZZ9zVOEgvcKqZpJ46lEwIC0z39P7lOxIbRFYQRVUUg-IcVd-Cd1Ks4WriQioezc0lxKV76YR"/>
              <div className="absolute top-4 left-4 bg-emerald-600 text-white text-sm font-bold px-3 py-1.5 uppercase shadow-sm">
                Đang mở bán
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="h-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Thumbnail 1" className="w-full h-full object-cover border border-gray-200 dark:border-slate-700 hover:opacity-80 cursor-pointer transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvnjtkq-umSAX9_4zNL7fXEHql6XYUjta7LARjGDHImw0rURPD8nOJsMqVXnCdOkIPNvDqYFqZgoWJdXtfYE3iESto2MbseLE5Z7fsHGmksj7dOs17PM34SG569xs2Dn436xwloSTdd-xjULIf5UoTH3opC5q7KAM0dYyoxMpVelSlCIHSyLuNZaVmvAtf3DHVG7vEXULIpldmL0l5_1HVb3KCyXFjKp0_3DL0785qmMuZPjvloUOY0lb9B9LSYAAsHkd4hB3kITTN"/>
              </div>
              <div className="h-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Thumbnail 2" className="w-full h-full object-cover border border-gray-200 dark:border-slate-700 hover:opacity-80 cursor-pointer transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpMi0K5NOL3pmfLGBGNFlAeRzA5XjRDj977TD6h9mi4MML2x_HE4Uw-Kf02fR5beKEIFX4Jajs526KUZBUwoNAi90KEzaWL0IMb58E49tR1iCisL26aJrDwllTd3AYXc_PT-L19VoRrhPpshFD6eWWXAheZIxsJAc5Q9DCH29b3W4Dw3sRDWKa1N9EKfJdRsgJ9meSSyFVzoSgxHnlqYeRvNQnG5eH-Ub6zDMHtdl38FNF0efjeoej1k6gncNwKrrFwAl4CqVIPs4B"/>
              </div>
              <div className="h-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Thumbnail 3" className="w-full h-full object-cover border border-gray-200 dark:border-slate-700 hover:opacity-80 cursor-pointer transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4ImqaGtVLEoiTnQ7CVxQxIhh2JLjU7RmL7Ia7PAZ7rXTguwX3-oOKPEAVJp6148Dw_iHuKzN6jka7AL6b2f64RYPcsGozTrJE8dv3aq5rXj2BPzmzkXK7sc5XpEwFYRCCVbb7MBsPctsED5vKtM9wHbA2Q4LYcpqihuxoBRbDNl7tGnANA-hslWFJBiEZ1I6h-ADVPTCkWvxmAaGc5yJfL1gkOzOIPTOgiHYEaItA7AjlxJRpOV6mHBskyV71thWtQyN8FTmE8-rG"/>
              </div>
              <div className="h-24 relative cursor-pointer group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Thumbnail 4" className="w-full h-full object-cover border border-gray-200 dark:border-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWsfPtFAApzRkX7ysP838Y2Iz045fFX9HupLTjT_i0nvl-IGgrYoH4p56BNWyZjaR6uVmyvXYeEmAg9Br7lCZ6AkjaGKsGAUZkwT8pjZpTCHmH8jPF37qxDsg12Tt0LVfuahaNT_0yyRRimTkY3Q0HAiEwK8Aox4RsQUDwhmPns06heIZGLTYcwFHUuMYbSl54nl86pTSsuIAzQpAB4Ot_gl70iK-VAOOnKQIMkPX9Z7E29EutWnhCd9UZJUmkTKZxCPl9vnXJUhyw"/>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                  <span className="text-white font-medium">+12 ảnh</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Vinhomes Ocean Park 3 - The Crown</h1>
            <div className="flex items-center text-slate-500 dark:text-slate-400 mb-6">
              <span className="material-symbols-outlined text-[18px] mr-1.5">location_on</span>
              <span>Xã Tân Quang, Thị trấn Như Quỳnh, Huyện Văn Lâm và Huyện Văn Giang, Tỉnh Hưng Yên</span>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100 dark:border-slate-700">
              <div>
                <span className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Diện tích</span>
                <span className="text-xl font-semibold text-slate-900 dark:text-white">85 m² - 120 m²</span>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-slate-700 hidden sm:block"></div>
              <div>
                <span className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Loại hình</span>
                <span className="text-lg font-medium text-slate-900 dark:text-white">Biệt thự, Liền kề, Căn hộ</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wide border-b border-gray-100 dark:border-slate-700 pb-3">Mô tả chi tiết</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4 text-justify leading-relaxed">
              <p>Vinhomes Ocean Park 3 – The Crown là hợp phần cuối cùng của siêu quần thể đô thị biển 1.200ha của Vinhomes tại phía Đông Hà Nội. Kế thừa những tinh hoa của 2 giai đoạn trước, Vinhomes Ocean Park 3 được định vị là &quot;Vịnh biển bốn mùa - Tiên phong dẫn sóng&quot;, mang đến trải nghiệm sống thượng lưu đỉnh cao.</p>
              <p>Tọa lạc tại vị trí đắc địa, dự án sở hữu kết nối giao thông hoàn hảo khi nằm kề cận các tuyến đường huyết mạch như Quốc lộ 5A, 5B, đường vành đai 3.5. Từ đây, cư dân có thể dễ dàng di chuyển vào trung tâm thủ đô cũng như các tỉnh lân cận thuộc vùng kinh tế trọng điểm Bắc Bộ.</p>
              <p>Hệ thống tiện ích tại Vinhomes Ocean Park 3 được đầu tư bài bản và đồng bộ với điểm nhấn là tổ hợp Vịnh biển 4 mùa trong nhà và ngoài trời rộng tới 12ha, công viên nước mini Aqua Bay, hồ bơi chuẩn Olympic, cùng hệ thống trường học Vinschool, bệnh viện Vinmec, trung tâm thương mại Vincom Mega Mall quy mô lớn.</p>
              <p>Về pháp lý, dự án đã có đầy đủ giấy phép xây dựng, phê duyệt 1/500 và sổ hồng sở hữu lâu dài đối với người Việt Nam, 50 năm đối với người nước ngoài theo quy định hiện hành.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wide border-b border-gray-100 dark:border-slate-700 pb-3">Vị trí bản đồ</h2>
            <div className="relative w-full h-[300px] border border-gray-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-900">
              <div className="absolute inset-0 blurry-map"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-6 py-3 border border-gray-200 dark:border-slate-700 shadow-md">
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-emerald-600 animate-pulse">explore</span>
                    <span className="font-medium text-slate-900 dark:text-white">Đang cập nhật dữ liệu bản đồ...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%] space-y-6">
          <div className="sticky top-20 bg-white dark:bg-slate-800 p-6 border border-gray-200 dark:border-slate-700 shadow-sm text-center">
            <div className="w-24 h-24 mx-auto bg-gray-200 dark:bg-slate-700 rounded-full mb-4 overflow-hidden border-2 border-emerald-500 p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Chuyên viên tư vấn" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdt50jowWafDqQjbTSzVcN9Tg4TZjzl1rj9kXryD9l29_NQncjG9N8XT7m9nNITBwQR5Te7zN1T08wL3kM7MRUNKKsi-2rb25bobcWWDrZlENnpEVb7kisfnasMiVAct8DzHjQXRv3FWx4-sQnvIK-n-PKGgN0_Z1fZvCSU8TMPE_fSikflh8XcVXMbRmzhVoPWBWJiTDsXWk5tHGmg6I4M8qsVMLCbh6QMflsSLdEL0divbBGTE7xdAtuG1UbYwSNP16rjZlFID2P"/>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Nguyễn Văn A</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Chuyên viên tư vấn</p>
            <div className="space-y-3">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 flex flex-col items-center justify-center transition-colors shadow-lg shadow-emerald-600/30">
                <div className="flex items-center text-lg mb-1">
                  <span className="material-symbols-outlined mr-2 text-[24px]">call</span>
                  GỌI NGAY
                </div>
                <span className="text-xl tracking-wider">0987.654.321</span>
              </button>
              <button className="w-full bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-emerald-700 dark:text-emerald-500 border border-emerald-600 font-semibold py-2.5 px-4 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined mr-2 text-[20px]">chat</span>
                Nhắn tin Zalo
              </button>
              <button className="w-full bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-gray-300 dark:border-slate-600 font-semibold py-2.5 px-4 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined mr-2 text-[20px]">mail</span>
                Yêu cầu hỗ trợ
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide border-b border-gray-100 dark:border-slate-700 pb-2">Dự án lân cận</h3>
            <div className="space-y-4">
              <a className="group flex items-start space-x-3 pb-4 border-b border-gray-100 dark:border-slate-700 last:border-0 last:pb-0" href="#">
                <div className="w-20 h-20 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Ecopark" className="w-full h-full object-cover border border-gray-200 dark:border-slate-700 group-hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHzmEXG2sDZyn4SdqZJ1-EyGjXGTyWCq29yCI2iEeCUNqHYkw8keeSH5RgbENtU-QS3W74N3-k8xSWvD3xMLO_QUeK7bJYi1SIltN8TJgTLYlN1MXNkQgLiVMLDN3CzzOhPVq4ekYCEhB5OhGIfR_nxQm1GB2Xieu9zIrH7Csila080yttQQ9gQYBbw-LrqmCxt1lA7CicymrWfx3N0FAXq6sZZjVMUIxEoa253DPIBu63Kz4VFBUOPKdj4iqUUh-PIwEAV88wuLhS"/>
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-2 mb-1">Khu đô thị sinh thái Ecopark</h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center">
                    <span className="material-symbols-outlined text-[14px] mr-1">location_on</span> Văn Giang, Hưng Yên
                  </div>
                </div>
              </a>
              <a className="group flex items-start space-x-3 pb-4 border-b border-gray-100 dark:border-slate-700 last:border-0 last:pb-0" href="#">
                <div className="w-20 h-20 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Vinhomes Smart City" className="w-full h-full object-cover border border-gray-200 dark:border-slate-700 group-hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEHeX0wlmiUedADnYJ2J7WMsXD0OEsL5OHz4yobcvs1HkGHhx_84Ua76VbDul9PImaL9OFfaI3EvRVdfIb61PUIO1wMqKmBQQD9bCjnbzOSdID0Wlq7QcS7pzuKkr148HWr9IKKfoEN5A7iAJY6ynlFJ87ug12X0U2f7mykNdOOd344xwndtzc193QYtbXnmaB5EVXHE_Q91V7wc5fQGhGQaYeSUOwQ-3I0teDwmPdviL-SCuk7dRLb7FsPaPblh_esNcpOr8IKFuo"/>
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-2 mb-1">Vinhomes Smart City</h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center">
                    <span className="material-symbols-outlined text-[14px] mr-1">location_on</span> Nam Từ Liêm, HN
                  </div>
                </div>
              </a>
              <a className="group flex items-start space-x-3 pb-4 border-b border-gray-100 dark:border-slate-700 last:border-0 last:pb-0" href="#">
                <div className="w-20 h-20 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Masteri" className="w-full h-full object-cover border border-gray-200 dark:border-slate-700 group-hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXQmiXmsmrmjQw8Dx0S5hFABOnuOfc1l_XvIXtSJRSuMJ2F-3xVIzZKGDEMgS1DcxLqvKgjT33ImLR_0Lf_IFOujQaJ63aR_dA7GgyUau-atktO4fwE3Sy0cgaUS5HgTIiPE3olNEqbR_ccjiMyEx3Edno5o-VBadt6UIz5PP4p0-PPFye7CmrSOJYFIXPkZ4GtnGV6XUeeStgMnKWbieJGqH_lOe8kW1sAEa3SwSKVXdva-15ZncE-PL_6ke65I0Wn_fRXUjuP_m8"/>
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-2 mb-1">Masteri Waterfront</h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center">
                    <span className="material-symbols-outlined text-[14px] mr-1">location_on</span> Gia Lâm, HN
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
