import { useState } from 'react';
import axios from 'axios';

const DeleteDoctor = () => {
    const [doctorId, setDoctorId] = useState<string>(''); // The ID to be deleted

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        // Send a DELETE request to the backend with the entered ID
        try {
            await axios.delete(`http://localhost:3000/doctor/${doctorId}`);
            alert('Doctor deleted successfully!');
            setDoctorId(''); // Clear the input after successful delete
        } catch (error) {
            console.error('Error deleting doctor:', error);
            alert('Error deleting doctor. Please check the ID and try again.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Delete Doctor</h2>
            <form onSubmit={handleDelete}>
                <div className="mb-4">
                    <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">
                        Enter Doctor ID to Delete
                    </label>
                    <input
                        id="doctorId"
                        type="text"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Doctor ID"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 rounded-md mt-4 hover:bg-red-600 transition"
                >
                    Delete Doctor
                </button>
            </form>
        </div>
    );
};

export default DeleteDoctor;
