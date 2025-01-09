import { useState } from "react";
import axios from "axios";

export default function DeleteAppointment() {
    const [appointmentId, setAppointmentId] = useState(""); // ID of the appointment to delete

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointmentId(e.target.value);
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!appointmentId) {
            alert("Please provide the Appointment ID to delete.");
            return;
        }
        try {
            const url = `http://localhost:3000/appointments/${appointmentId}`;
            await axios.delete(url);
            alert(`Appointment with ID ${appointmentId} has been successfully deleted.`);
            setAppointmentId(""); // Clear the input field after successful deletion
        } catch (error) {
            console.error("Error deleting appointment:", error);
            alert("Failed to delete appointment. Please check the ID and try again.");
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Delete Appointment</h1>
            <form onSubmit={handleDelete} className="space-y-4">
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
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                        placeholder="Enter Appointment ID"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-red-600 text-white p-2 rounded"
                >
                    Delete Appointment
                </button>
            </form>
        </div>
    );
}
