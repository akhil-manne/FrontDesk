// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function ReadDoctor() {
//     const [doctors, setDoctors] = useState([]);
//     const [filters, setFilters] = useState({
//         specialization: "",
//         status: "",
//         id: "",
//     });

//     const fetchDoctors = async () => {
//         try {
//             let url = "http://localhost:3000/doctor";
//             const params = new URLSearchParams();

//             if (filters.specialization) params.append("specialization", filters.specialization);
//             if (filters.status) params.append("status", filters.status);
//             if (filters.id) url += `/${filters.id}`;

//             const { data } = await axios.get(filters.id ? url : `${url}?${params.toString()}`);
//             setDoctors(data);
//         } catch (error) {
//             console.error("Error fetching doctors:", error);
//             alert("Failed to fetch doctors.");
//         }
//     };

//     useEffect(() => {
//         if (!filters.id) fetchDoctors();
//     }, [filters]);

//     const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFilters((prev) => ({ ...prev, [name]: value }));
//     };

//     return (
//         <div className="space-y-6">
//             {/* Filters */}
//             <div className="space-y-4">
//                 <div>
//                     <label htmlFor="specialization" className="block font-semibold">
//                         Specialization
//                     </label>
//                     <input
//                         type="text"
//                         id="specialization"
//                         name="specialization"
//                         value={filters.specialization}
//                         onChange={handleFilterChange}
//                         className="border p-2 w-full"
//                         placeholder="Enter specialization"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="status" className="block font-semibold">
//                         Availability
//                     </label>
//                     <select
//                         id="status"
//                         name="status"
//                         value={filters.status}
//                         onChange={handleFilterChange}
//                         className="border p-2 w-full"
//                     >
//                         <option value="">All</option>
//                         <option value="available">Available</option>
//                         <option value="busy">Busy</option>
//                         <option value="off-duty">Off-duty</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="id" className="block font-semibold">
//                         Doctor ID
//                     </label>
//                     <input
//                         type="text"
//                         id="id"
//                         name="id"
//                         value={filters.id}
//                         onChange={handleFilterChange}
//                         className="border p-2 w-full"
//                         placeholder="Enter doctor ID"
//                     />
//                 </div>
//                 <button
//                     onClick={fetchDoctors}
//                     className="bg-blue-600 text-white p-2 rounded"
//                 >
//                     Apply Filters
//                 </button>
//             </div>

//             {/* Doctor List */}
//             <div>
//                 <h2 className="text-xl font-bold">Doctors List</h2>
//                 {doctors.length > 0 ? (
//                     <ul className="divide-y divide-gray-300">
//                         {doctors.map((doctor: any) => (
//                             <li key={doctor.doc_id} className="py-4">
//                                 <p>
//                                     <strong>ID:</strong> {doctor.doc_id}
//                                 </p>
//                                 <p>
//                                     <strong>Name:</strong> {doctor.doc_name}
//                                 </p>
//                                 <p>
//                                     <strong>Specialization:</strong>{" "}
//                                     {doctor.specialization}
//                                 </p>
//                                 <p>
//                                     <strong>Status:</strong> {doctor.doc_status}
//                                 </p>
//                                 <p>
//                                     <strong>Location:</strong> {doctor.location}
//                                 </p>
//                                 <p>
//                                     <strong>Next Available:</strong>{" "}
//                                     {doctor.next_available}
//                                 </p>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>No doctors found.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import axios from "axios";

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [filters, setFilters] = useState({
        specialization: "",
        status: "",
        id: "",
    });

    const fetchDoctors = async () => {
        try {
            const response = await axios.get("http://localhost:3000/doctor", {
                params: {
                    specialization: filters.specialization,
                    status: filters.status,
                    id: filters.id,
                },
            });
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [filters]); // Re-fetch doctors whenever filters change

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Doctor List</h1>
            <div className="flex flex-wrap space-x-4 mb-4">
                <input
                    type="text"
                    name="id"
                    value={filters.id}
                    onChange={handleInputChange}
                    placeholder="Search by ID"
                    className="border p-2"
                />
                <input
                    type="text"
                    name="specialization"
                    value={filters.specialization}
                    onChange={handleInputChange}
                    placeholder="Filter by specialization"
                    className="border p-2"
                />
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleInputChange}
                    className="border p-2"
                >
                    <option value="">Filter by status</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="off-duty">Off-duty</option>
                </select>
            </div>
            <ul className="divide-y divide-gray-300">
                {doctors.map((doctor: any, index: number) => (
                    <li key={doctor.doc_id || index} className="py-4">
                        <p>
                            <strong>ID:</strong> {doctor.doc_id}
                        </p>
                        <p>
                            <strong>Name:</strong> {doctor.doc_name}
                        </p>
                        <p>
                            <strong>Specialization:</strong> {doctor.specialization}
                        </p>
                        <p>
                            <strong>Status:</strong> {doctor.doc_status}
                        </p>
                        <p>
                            <strong>Location:</strong> {doctor.location}
                        </p>
                        <p>
                            <strong>Next Available:</strong> {doctor.next_available}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
