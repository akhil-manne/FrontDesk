import { useState } from 'react';
import axios from 'axios';

const CreateAppointment = () => {
    const [patient_id, setPatientId] = useState<string>('');
    const [doc_id, setDoctorId] = useState<string>('');
    const [app_time, setAppointmentTime] = useState<string>('');
    const [app_status, setAppointmentStatus] = useState<string>('booked'); // Default to 'booked'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare data for the appointment
        const data = {
            patient_id: patient_id,
            doc_id: doc_id,
            app_time: app_time,
            app_status: app_status,
        };

        // Send POST request to the backend to create an appointment
        try {
            await axios.post('http://localhost:3000/appointments', data);
            alert('Appointment created successfully!');
            setPatientId('');
            setDoctorId('');
            setAppointmentTime('');
            setAppointmentStatus('booked'); // Reset to default
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Error creating appointment. Please check your input.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="patient_id" className="block text-sm font-medium text-gray-700">
                        Patient ID
                    </label>
                    <input
                        id="patient_id"
                        type="text"
                        value={patient_id}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Patient ID"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="doc_id" className="block text-sm font-medium text-gray-700">
                        Doctor ID
                    </label>
                    <input
                        id="doc_id"
                        type="text"
                        value={doc_id}
                        onChange={(e) => setDoctorId(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Doctor ID"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="app_time" className="block text-sm font-medium text-gray-700">
                        Appointment Time
                    </label>
                    <input
                        id="app_time"
                        type="datetime-local"
                        value={app_time}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="app_status" className="block text-sm font-medium text-gray-700">
                        Appointment Status
                    </label>
                    <select
                        id="app_status"
                        value={app_status}
                        onChange={(e) => setAppointmentStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="booked">Booked</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                >
                    Create Appointment
                </button>
            </form>
        </div>
    );
};

export default CreateAppointment;
