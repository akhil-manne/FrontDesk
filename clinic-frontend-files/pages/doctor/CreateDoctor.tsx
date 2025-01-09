import { useState } from "react";
import axios from "axios";

export default function CreateDoctor() {
    const [docName, setDocName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");
    const [nextAvailable, setNextAvailable] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Submitting form with data:', {
            doc_name: docName,
            specialization: specialization,
            gender: gender,
            location: location,
            next_available: nextAvailable,
            doc_status: status,  // Add this to ensure status is correctly set
        });

        try {
            await axios.post("http://localhost:3000/doctor", {
                doc_name: docName,
                specialization: specialization,
                gender: gender,
                location: location,
                next_available: nextAvailable,
                doc_status: status,
            });
            alert("Doctor created successfully!");
        } catch (error) {
            console.error("Error creating doctor:", error);
            alert("Failed to create doctor.");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="doc_name" className="block font-semibold">
                    Doctor's Name
                </label>
                <input
                    type="text"
                    id="doc_name"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="specialization" className="block font-semibold">
                    Specialization
                </label>
                <input
                    type="text"
                    id="specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="gender" className="block font-semibold">
                    Gender
                </label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="border p-2 w-full"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
            <div>
                <label htmlFor="location" className="block font-semibold">
                    Location
                </label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="next_available" className="block font-semibold">
                    Next Available
                </label>
                <input
                    type="datetime-local"
                    id="next_available"
                    value={nextAvailable}
                    onChange={(e) => setNextAvailable(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="status" className="block font-semibold">
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border p-2 w-full"
                    required
                >
                    <option value="">Select Status</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="off-duty">Off-duty</option>
                </select>
            </div>
            <div>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Create Doctor
                </button>
            </div>
        </form>
    );
}
