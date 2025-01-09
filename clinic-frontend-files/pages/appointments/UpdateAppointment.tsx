import { useState } from "react";
import axios from "axios";

export default function UpdateAppointment() {
    const [appointmentId, setAppointmentId] = useState(""); // ID of the appointment to update
    const [updateData, setUpdateData] = useState({
        patient_id: "",
        doc_id: "",
        app_time: "",
        app_status: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdateData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAppointmentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointmentId(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!appointmentId) {
            alert("Please provide the Appointment ID to update.");
            return;
        }
        try {
            const url = `http://localhost:3000/appointments/${appointmentId}`;
            const response = await axios.put(url, updateData);
            alert("Appointment updated successfully!");
            console.log("Updated Data:", response.data);
        } catch (error) {
            console.error("Error updating appointment:", error);
            alert("Failed to update appointment. Please try again.");
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Update Appointment</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Appointment ID */}
                <div>
                    <label htmlFor="appointmentId" className="block font-semibold">
                        Appointment ID
                    </label>
                    <input
                        type="text"
                        id="appointmentId"
                        name="appointmentId"
                        value={appointmentId}
                        onChange={handleAppointmentIdChange}
                        className="border p-2 w-full"
                        placeholder="Enter Appointment ID"
                    />
                </div>

                {/* Patient ID */}
                <div>
                    <label htmlFor="patient_id" className="block font-semibold">
                        Patient ID
                    </label>
                    <input
                        type="text"
                        id="patient_id"
                        name="patient_id"
                        value={updateData.patient_id}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                        placeholder="Enter Patient ID"
                    />
                </div>

                {/* Doctor ID */}
                <div>
                    <label htmlFor="doc_id" className="block font-semibold">
                        Doctor ID
                    </label>
                    <input
                        type="text"
                        id="doc_id"
                        name="doc_id"
                        value={updateData.doc_id}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                        placeholder="Enter Doctor ID"
                    />
                </div>

                {/* Appointment Time */}
                <div>
                    <label htmlFor="app_time" className="block font-semibold">
                        Appointment Time
                    </label>
                    <input
                        type="datetime-local"
                        id="app_time"
                        name="app_time"
                        value={updateData.app_time}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                </div>

                {/* Appointment Status */}
                <div>
                    <label htmlFor="app_status" className="block font-semibold">
                        Appointment Status
                    </label>
                    <select
                        id="app_status"
                        name="app_status"
                        value={updateData.app_status}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    >
                        <option value="">Select Status</option>
                        <option value="booked">Booked</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Update Appointment
                </button>
            </form>
        </div>
    );
}
