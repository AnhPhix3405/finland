import { PropertyCard } from "../../../components/property/PropertyCard";
import { PropertyFilter } from "../../../components/property/PropertyFilter";
import { Pagination } from "../../../components/shared/Pagination";

export default function MuaBanPage() {
  const properties = [
    {
      id: "1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH-qH24_KE8TIFtAOlg2VMxFw51PbmagHsDz-fp6Y_o13wCplh0YpY5tUVGtFy_1YJB66cE-ffhS1bk0Khp5Id5HsZm2Vn7isAq4e3dgAm2smw-oxIc6ZJMRAczbqKi_kj0UIofIfDnHxU34GvPlK-Og0xGinm9wGIfWLsRQ9fqzoYOYfmBA-cQ32_dFeyQ0cYN5hgai2CsH15n0rd3N0dVC5HbLBDzPaUbpyyq_mUnWXQDljSIAPURnziqfdaHPhnGT183UxhHGub",
      price: "5.2 Tỷ",
      area: "80 m²",
      title: "Bán gấp nhà phố mặt tiền kinh doanh, sổ hồng chính chủ tại trung tâm Quận 10",
      location: "Quận 10, TP.HCM",
      tags: ["mặt-phố", "chính-chủ", "nở-hậu"],
      isPriority: true,
    },
    {
      id: "2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHEygKj-4u02EaJd0shuTZJy2lVoUGpcNJwArji3ty1dg7HFVvYACu6NYOaGRwsTDsha5l-sKncleTC-oiYq0_gnTGLjA4v5A-v67gKoZFKTjvahIhf-nqBYJL685ahS1AFJVxazKI1Lc5HwDovTWsoA-r8I3YhniG8ufBDFLSbSnzu8MS0iWXbDPRsiB68x_d36LRZ8eA2ur4daLkNeM_MYpYuSI1yoMIeeSTXqX-IaSp949bpmaWOiJK9uqXCM695EtGVGjblaj9",
      price: "3.5 Tỷ",
      area: "65 m²",
      title: "Căn hộ 2PN full nội thất, view Landmark 81 cực đẹp, tầng cao thoáng mát",
      location: "Bình Thạnh, TP.HCM",
      tags: ["view-đẹp", "full-nội-thất"],
    },
    {
      id: "3",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKT20xNFPkK05zwidG5gIm_MLmWHPATsYLMlK6c1DLvtXiMVcy1hKQ8NNjgJgNhO46fQfp53Umbcfic_Bxg25Mu295ktjujSjdxWggq7Is8gc2prO3uEDu181_87VZ9XwgEPZNJ4P1nVFUqWxjrBaerQldfwKUdvawN-1uNuOyrF_PMWKpH8HUxYeyLx2XcQHUEx9CcAlVzec6BvqnULpwq-CozLCoDUI-W8zds7tJYSlKRjAlk9eV8Cm9OQaSuqKXgE3mRgxdv3uO",
      price: "15 Tỷ",
      area: "200 m²",
      title: "Biệt thự đơn lập khu đô thị mới, đầy đủ tiện ích cao cấp, an ninh 24/7",
      location: "Quận 2, TP.HCM",
      tags: ["biệt-thự", "cao-cấp", "giá-tốt"],
    },
    {
      id: "4",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz0njNhJ8bDgswxZuD_FfSmmMxHRNBPAhcPOhylwZbMbiKoySFTTZOVVdGanmDgqW1c8B61uEtLCDy-breOBFLvAWnuPyDEtQeM-eD0Hg6FxUGBjjbWq9okD7ZRFq7wBLPwhMByLHbCd9aQACm2KlWZRdqUISoKDaInZRrVEoVl3OgWYlEj_Wi3cbJmnj1FxhtmhLjHuxHUDvysUDhbKmpujzwe_vl-jpfE6SV1Dl1caX3y4jOiWtEIgRbZftyusZz-tLBH_o72RA5",
      price: "2.1 Tỷ",
      area: "100 m²",
      title: "Lô đất vuông vức, đường nhựa 8m, kinh doanh ngay, dân cư đông đúc",
      location: "Bình Chánh, TP.HCM",
      tags: ["đất-nền", "đầu-tư"],
    },
    {
      id: "5",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQL0HMevDE7EqzQydhZ-A_ZzNsJtx4fRjsMgu5H6QZh6miSHCjRYe907Q5apMQwr4YGxU2H101RZUlVbzO65L3pQ8GxZpeOgvLskfU_u7IM3PTtQOnhzBD4kbGy-LBHdmMaQe7r-tJWfXmaG25PkTQ8A0-nOuWHeJiE5bqqjtU7iKzTHSJolP1TQXyT3eulSiKDG-gtSbxl7EkzDDk06s73yxJvtwxUAzUvARy5uorVSuUtTK5CBwHz6Kr-x-nxAzONnKsk55blPPw",
      price: "4.8 Tỷ",
      area: "75 m²",
      title: "Nhà 1 trệt 2 lầu mới xây, hẻm xe hơi thông thoáng, gần chợ và trường học",
      location: "Gò Vấp, TP.HCM",
      tags: ["nhà-mới", "hẻm-xe-hơi"],
    },
    {
      id: "6",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_JAgSZKfJpmCwDoNBESbOOJbTEoEgFd6MbnZOPY5JFxpGR6Uf37N8_iMejsXeAzZhUoGoyyNixZsaYaeY7-YJ3aLtKqmzmAW6kQ972GtzdK9wRrcpM01j7LT3Z9qCXNjwhnpz7uZCXBwAin_GHae1dFllDA-dXGr-q6f_tO9pQ1Ys-HJlnIsK-aSdOD1-11gvvHTbod2Wvv8iX61OO6ad1-v60Bi13vl7EkPwnQkrn2ziT0WEO2YodAx4Cmzy1oxrQj4OMgLXgYfd",
      price: "2.9 Tỷ",
      area: "45 m²",
      title: "Căn hộ studio đang cho thuê ổn định, ngay trung tâm tài chính Quận 1",
      location: "Quận 1, TP.HCM",
      tags: ["trung-tâm", "thu-nhập-ổn-định"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
          Bất động sản Mua Bán toàn quốc
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Tìm kiếm ngôi nhà mơ ước của bạn tại Finland.vn
        </p>
      </div>

      <PropertyFilter />

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}
