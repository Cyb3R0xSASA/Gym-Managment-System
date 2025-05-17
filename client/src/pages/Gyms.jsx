import React, { useState } from "react";
import { Link } from "react-router-dom";

const gyms = [
    {
        id: "G123",
        name: "IronFit Gym",
        image: "/images/avatar.jpg",
    },
    {
        id: "G456",
        name: "PowerHouse",
        image: "/images/avatar.jpg",
    },
    {
        id: "G789",
        name: "Beast Mode Gym",
        image: "/images/avatar.jpg",
    },
];

export default function Gyms() {
    const [search, setSearch] = useState("");

    const filteredGyms = gyms.filter((gym) =>
        gym.name.toLowerCase().includes(search.toLowerCase()) ||
        gym.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">الجيمات المتاحة للاشتراك</h1>

        <input
            type="text"
            placeholder="ابحث بالاسم أو ID الجيم"
            className="w-full max-w-md mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredGyms.length > 0 ? (
            filteredGyms.map((gym) => (
                <Link
                key={gym.id}
                to={`/gym-info?id=${gym.id}`}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200 hover:ring-2 hover:ring-blue-400"
                >
                <img
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-40 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">{gym.name}</h2>
                    <p className="text-sm text-gray-500">ID: {gym.id}</p>
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
    );
}
