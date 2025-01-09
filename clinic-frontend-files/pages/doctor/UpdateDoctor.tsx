import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateDoctor() {
    const [doctorId, setDoctorId] = useState(""); // To store the ID of the doctor to update
    const [doctor, setDoctor] = useState<any>(null); // Store the selected doctor's details

    const [formData, setFormData] = useState({
        doc_name: "",
        specialization: "",
        location: "",
        next_available: "",
        doc_status: "",
    });

    const fetchDoctorById = async () => {
        if (!doctorId) return;

        try {
            const response = await axios.get(`http://localhost:3000/doctor`, {
                params: { id: doctorId },
            });
            const data = response.data[0]; // Assuming the API returns an array with a single object
            setDoctor(data);
            setFormData({
                doc_name: data.doc_name || "",
                specialization: data.specialization || "",
                location: data.location || "",
                next_available: data.next_available || "",
                doc_status: data.doc_status || "",
            });
        } catch (error) {
            console.error("Error fetching doctor:", error);
            alert("Could not fetch doctor details.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     try {
    //         await axios.put(`http://localhost:3000/doctor/${doctorId}`, formData);
    //         alert("Doctor updated successfully!");
    //         setDoctor(null);
    //         setDoctorId("");
    //     } catch (error) {
    //         console.error("Error updating doctor:", error);
    //         alert("Failed to update doctor.");
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            doc_name: formData.doc_name,
            specialization: formData.specialization,
            location: formData.location,
            next_available: formData.next_available,
            doc_status: formData.doc_status, // Match backend naming convention
        };

        try {
            await axios.put(`http://localhost:3000/doctor/${doctorId}`, payload);
            alert("Doctor updated successfully!");
            setDoctor(null);
            setDoctorId("");
        } catch (error) {
            console.error("Error updating doctor:", error);
            alert("Failed to update doctor.");
        }
    };


    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Update Doctor</h1>

            {/* Doctor Selection */}
            <div className="mb-4">
                <label htmlFor="doctorId" className="block font-semibold">
                    Enter Doctor ID:
                </label>
                <input
                    type="text"
                    id="doctorId"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="border p-2"
                />
                <button
                    onClick={fetchDoctorById}
                    className="bg-blue-600 text-white p-2 rounded ml-2"
                >
                    Fetch Doctor
                </button>
            </div>

            {/* Update Form */}
            {doctor && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="doc_name" className="block font-semibold">
                            Doctor's Name
                        </label>
                        <input
                            type="text"
                            id="doc_name"
                            name="doc_name"
                            value={formData.doc_name}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="specialization" className="block font-semibold">
                            Specialization
                        </label>
                        <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block font-semibold">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="next_available" className="block font-semibold">
                            Next Available
                        </label>
                        <input
                            type="datetime-local"
                            id="next_available"
                            name="next_available"
                            value={formData.next_available}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="doc_status" className="block font-semibold">
                            Status
                        </label>
                        <select
                            id="doc_status"
                            name="doc_status"
                            value={formData.doc_status}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        >
                            <option value="">Select Status</option>
                            <option value="available">Available</option>
                            <option value="busy">Busy</option>
                            <option value="off-duty">Off-duty</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="bg-green-600 text-white p-2 rounded">
                            Update Doctor
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
