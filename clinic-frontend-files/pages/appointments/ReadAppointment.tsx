import { useState, useEffect } from "react";
import axios from "axios";


export default function ReadAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [filters, setFilters] = useState({
        app_id: "", // Appointment ID filter
        patient_id: "", // Patient ID filter
        doc_id: "", // Doctor ID filter
        status: "", // Appointment Status filter
    });

    // Fetch Appointments with filters
    const fetchAppointments = async () => {
        try {
            let url = "http://localhost:3000/appointments";
            const params = new URLSearchParams();

            if (filters.app_id) params.append("id", filters.app_id);
            if (filters.patient_id) params.append("patient_id", filters.patient_id);
            if (filters.doc_id) params.append("doc_id", filters.doc_id);
            if (filters.status) params.append("status", filters.status);

            const { data } = await axios.get(`${url}?${params.toString()}`);
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            alert("Failed to fetch appointments.");
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const formatTime = (time: string) => {
        const dateObj = new Date(time);
        return dateObj.toLocaleString("en-US", {
            hour12: true, // 12-hour clock format
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="space-y-4">
                <div>
                    <label htmlFor="app_id" className="block font-semibold">
                        Appointment ID
                    </label>
                    <input
                        type="text"
                        id="app_id"
                        name="app_id"
                        value={filters.app_id}
                        onChange={handleFilterChange}
                        className="border p-2 w-full"
                        placeholder="Enter appointment ID"
                    />
                </div>
                <div>
                    <label htmlFor="patient_id" className="block font-semibold">
                        Patient ID
                    </label>
                    <input
                        type="text"
                        id="patient_id"
                        name="patient_id"
                        value={filters.patient_id}
                        onChange={handleFilterChange}
                        className="border p-2 w-full"
                        placeholder="Enter patient ID"
                    />
                </div>
                <div>
                    <label htmlFor="doc_id" className="block font-semibold">
                        Doctor ID
                    </label>
                    <input
                        type="text"
                        id="doc_id"
                        name="doc_id"
                        value={filters.doc_id}
                        onChange={handleFilterChange}
                        className="border p-2 w-full"
                        placeholder="Enter doctor ID"
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block font-semibold">
                        Appointment Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="border p-2 w-full"
                    >
                        <option value="">All</option>
                        <option value="booked">Booked</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <button
                    onClick={fetchAppointments}
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Apply Filters
                </button>
            </div>

            {/* Appointment List */}
            <div>
                <h2 className="text-xl font-bold">Appointments List</h2>
                {appointments.length > 0 ? (
                    <ul className="divide-y divide-gray-300">
                        {appointments.map((appointment: any) => (
                            <li key={appointment.app_id} className="py-4">
                                <p>
                                    <strong>Appointment ID:</strong> {appointment.app_id}
                                </p>
                                <p>
                                    <strong>Patient ID:</strong> {appointment.patient.q_id}
                                </p>
                                <p>
                                    <strong>Doctor ID:</strong> {appointment.doctor.doc_id}
                                </p>
                                <p>
                                    <strong>Status:</strong> {appointment.app_status}
                                </p>
                                <p>
                                    <strong>Time:</strong> {formatTime(appointment.app_time)}
                                </p>
                                <p>
                                    <strong>Patient Name:</strong> {appointment.patient.patient_name}
                                </p>
                                <p>
                                    <strong>Doctor Name:</strong> {appointment.doctor.doc_name}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No appointments found.</p>
                )}
            </div>
        </div>
    );
}
