import Link from "next/link";
import { Plus } from "lucide-react";
import { PropertyCard } from "../../../components/property/PropertyCard";
import { PropertyFilter } from "../../../components/property/PropertyFilter";
import { Pagination } from "../../../components/shared/Pagination";

export default function ChoThuePage() {
  const properties = [
    {
      id: "1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQtWu5btVqZmyF2VBBNrdilGuXgZxcFeYt6kqdOJSo6LZ3aCoBbbzQ8-fqfPGONtLv0prPsPuUFLVW91X9oc2T66K7v-lcZHjs3201CgjbpJMNi6blK5IZwQxT2TgsXV98JXprkieb8ycIkr2K4F6SZCufZ5s98EixLF9P6tphxeGjey43-jHGRq3vx8bN0u37VLFbWjVdSJlr3CeTnltPQurKVjBnHCC2VbuebEHhBTHUkJ27qRBMzU3GhcUhmXP_QDhNwzXauLmN",
      price: "12 Triệu / tháng",
      area: "45 m²",
      title: "Cho thuê căn hộ mini full nội thất, dọn vào ở ngay trung tâm",
      location: "Cầu Giấy, Hà Nội",
      tags: ["full-nội-thất", "gần-đại-học"],
      isPriority: true,
    },
    {
      id: "2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMYJlLRAeW0SjwvOpGCxSg_pvF-El0MhSmRZzichhM9M10q3cAf8XxSLthPSR35gI4XwzbZN1pcF-091U-OpS5Wb_MXeS7aZijMg6rsg8KCmwLHtG0wsshh1_l3UPyeXmQZ4TBPT_u3392y4OcRsDqECGXXC67r-afDmO3q8mLb4xhf4GWRK8mTcJzYynYVLs4INhrF5AffBsP2FSdgB7K4HSzVdJUR4Evivw2tGv4Afqt3i3Y21EMKbYX1y3u0NDHspU8dOdIRABn",
      price: "18 Triệu / tháng",
      area: "75 m²",
      title: "Căn hộ chung cư cao cấp view sông, 2 phòng ngủ đủ tiện nghi",
      location: "Quận 7, TP. HCM",
      tags: ["view-sông", "an-ninh-24/7"],
    },
    {
      id: "3",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0cmzaraR4_D9f-g0Y1Y_l_Q6z_oayH6U7lFlu2eJ_kiRUCBOJ0Ac_vCHDfPyppAa26ooKnqM-tmp46t6enm1YFJvZ6hVjGqMQxI76Bb1K5TtxyvVB6DmITznBmDeFJIDjffTFFLek9ek0dfQZiOJMwODr6g0FqY5id24AhHVaOOzEErHh_xaDYRCuxTEvaSSoreHsxAseU4xDrHMVH2IyW2b4WaAECvd32mQH_ByC_b4WpBCrZpHfyWoioi0FZTvo4xd9NcbIh23x",
      price: "25 Triệu / tháng",
      area: "120 m²",
      title: "Văn phòng hiện đại trung tâm Thanh Xuân, sàn trống bàn giao ngay",
      location: "Thanh Xuân, Hà Nội",
      tags: ["hạng-B", "mặt-phố"],
    },
    {
      id: "4",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMDF-OscMNvs2o2yUEbtgSvOBvy_UNrZoa1RQLkpdf_wI-P9MJU3AcCyAYFO7pHHA7oL7X9GerQsZVjDhDl2pJ2RitOLV_Un2at5D0WXVsiEqX5tRjl7-S4l0MIvW0ClcqbNTRZByHXJ4qwp4VMjxmEgHrP59GNnnFlsHyEztcEnArlYJScYyOk4kNMzzbFcJGkUOvL95mrKYKrOz33AYH76yI5oS4tNvTDzP00x-_YxhgAHbw0JFwZ4o5k_0ZtYMVUTt6Su6k_v6O",
      price: "3.5 Triệu / tháng",
      area: "20 m²",
      title: "Phòng trọ giá rẻ sinh viên gần Đại học, không chung chủ",
      location: "Quận 9, TP. HCM",
      tags: ["giá-rẻ", "tự-do"],
    },
    {
      id: "5",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGvrvM8TuNWIIN8av_oaApMCZWoQlJWpTwexfeFpO20nZO-4KMt9ejpHMqImBATQ-g00XhlLo8zwXZfEE85XtRNoT9eBTI_HLVL6_JK2KXm0wcIxUAHR1BP5HhgiFt6UA01SkTUXmU33OtkMHXaT-kR0Q9N37zs3zPe1xLJVh8R158qCCwLe8LdAasf2zJ5TdQkpd_7hxOg3Ci5k16Kj0QkZrn3JdZRZeHMx3IR2J7mjlNkngpqiL5oaaonmmsKbOrqQ2kTQqzTz3C",
      price: "40 Triệu / tháng",
      area: "80 m²",
      title: "Mặt bằng kinh doanh sầm uất mặt phố trung tâm Quận 1",
      location: "Quận 1, TP. HCM",
      tags: ["kinh-doanh", "góc-2-mặt-tiền"],
    },
    {
      id: "6",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAk9S582qYJvtyC9uvACfS3cGg9pwAlupfg0-mzStNgDzi6SeAMKoTzpCTjnBSRg36e1eThbsmN0ty7FMkvd1_zCkE5XI9Ws_22FS5XcCSC7q7KpJj8B_C-PpZeSX8BYccIw6HeSXQKHX7h5x9l-AUdf8UG5HA_MDyIJUvWhrkAAK98gELnaF9XabOH74LXg-2eRsilg2zeWkotZ0W-EhrwQz8pqDZ-AHh4PbsQwDczMFYPgaeoRTZc-nsYQJfTG0i-qKdv46k5yYCX",
      price: "10 Triệu / tháng",
      area: "60 m²",
      title: "Nhà nguyên căn hẻm xe hơi an ninh, 1 trệt 1 lầu sạch sẽ",
      location: "Gò Vấp, TP. HCM",
      tags: ["nhà-nguyên-căn", "hẻm-xe-hơi"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight">
            Bất động sản Cho Thuê toàn quốc
          </h2>
          <p className="text-slate-500 mt-1">
            Tìm kiếm hàng ngàn tin đăng cho thuê bất động sản chính chủ, uy tín.
          </p>
        </div>
        <Link
          href="/tao-bai-dang"
          className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-emerald-600 border border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 px-6 py-2.5 rounded-lg text-sm font-bold transition-all shrink-0 shadow-sm active:scale-95"
        >
          <Plus className="size-4" />
          Tạo bài đăng
        </Link>
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
