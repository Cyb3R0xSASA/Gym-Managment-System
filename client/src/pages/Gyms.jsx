import PageModel from "@/layouts/PageModel";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const gyms = [
    {
        id: "G123",
        name: "نادى التوحيد والنور",
        image: "https://static.vecteezy.com/system/resources/previews/011/162/388/original/fitness-sport-gym-logo-design-vector.jpg",
    },
    {
        id: "G456",
        name: "PowerHouse",
        image: "https://static.vecteezy.com/system/resources/previews/017/504/043/original/bodybuilding-emblem-and-gym-logo-design-template-vector.jpg",
    },
    {
        id: "G789",
        name: "Beast Mode Gym",
        image: "https://www.creativefabrica.com/wp-content/uploads/2023/05/31/Gym-Logo-Fitness-Logo-Vector-Design-Graphics-70960661-1.jpg",
    },
    {
        id: "G123",
        name: "IronFit Gym",
        image: "https://marketplace.canva.com/EAFxdcos7WU/1/0/800w/canva-dark-blue-and-brown-illustrative-fitness-gym-logo-AloSwY9Vjm0.jpg",
    },
    {
        id: "G456",
        name: "PowerHouse",
        image: "https://static.vecteezy.com/system/resources/previews/018/844/399/large_2x/fitness-center-logo-sport-and-fitness-logo-design-gym-logo-icon-design-stock-or-emblem-with-woman-and-man-silhouette-woman-and-man-holding-dumbbells-vector.jpg",
    },
    {
        id: "G789",
        name: "Beast Mode Gym",
        image: "https://www.downgraf.com/wp-content/uploads/2017/06/Creative-Gym-and-Fitness-Logo-Designs-008.jpg",
    },
    {
        id: "G123",
        name: "IronFit Gym",
        image: "https://graphicsfamily.com/wp-content/uploads/edd/2021/02/Vector-Gym-Logo-PSD-Template-Download-scaled.jpg",
    },
    {
        id: "G456",
        name: "PowerHouse",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0c528e70012657.5b955cf7e20c8.jpg",
    },
];

export default function Gyms() {
    const [search, setSearch] = useState("");

    const filteredGyms = gyms.filter((gym) =>
        gym.name.toLowerCase().includes(search.toLowerCase()) ||
        gym.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <PageModel
                title="انضم لأفضل الصالات الرياضية المتاحة الآن بالقرب منك"
                subtitle={"استكشف مجموعة من أقوى الصالات الرياضية المتاحة للانضمام من خلال منصة ترينيكس."}
                content={
                    <div className="w-full max-w-[1130px] flex flex-col items-center px-[20px]">
                        <input
                            type="text"
                            placeholder="ابحث بالاسم أو ID الجيم"
                            className="w-full max-w-[250px] small-text md:normal-text md:max-w-[400px] mb-[40px] px-[10px] md:px-[16px] py-[10px] border border-gray-300 rounded-[10px] focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {filteredGyms.length > 0 ? (
                            filteredGyms.map((gym) => (
                                <Link
                                key={gym.id}
                                to={`/gym-info?id=${gym.id}`}
                                className="min-w-[250px] sm:min-w-[200px] md:min-w-[180px] xl:min-w-[230px] border bg-gray-200 border-gray-200 rounded-[15px] overflow-hidden card-shadow2 hover:card-shadow transition duration-200"
                                >
                                {gym.image ?
                                    (<img
                                        src={gym.image}
                                        alt={gym.name}
                                        className="sm:max-w-[230px] w-full h-[150px] object-cover"
                                    />) :
                                    (<div className="w-full h-[150px] text-black text-center content-center">لا يوجد صورة</div>)
                                }
                                <div className="p-4 bg-white flex flex-col items-center">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-1">{gym.name}</h2>
                                    <p className="text-sm text-gray-500">{gym.id}</p>
                                </div>
                                </Link>
                            ))
                            ) : (
                            <p className="text-gray-500 text-center col-span-full">
                                لا يوجد جيمات مطابقة للبحث.
                            </p>
                            )}
                        </div>
                    </div>
                }
                topG={1}
            />
        </div>
    );
}
