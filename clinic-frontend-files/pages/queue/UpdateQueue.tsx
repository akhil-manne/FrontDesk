import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateQueue = () => {
    const [patientData, setPatientData] = useState<any>(null); // Track a single patient's data
    const [selectedId, setSelectedId] = useState<number | string>(''); // User input for patient ID
    const [patientName, setPatientName] = useState('');
    const [queueStatus, setQueueStatus] = useState('normal');
    const [queueProgress, setQueueProgress] = useState('wait');
    const [priorityNum, setPriorityNum] = useState<number | string>('');

    // Fetch the patient's data based on the entered ID
    useEffect(() => {
        if (selectedId) {
            const fetchPatientData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/queue?id=${selectedId}`);
                    setPatientData(response.data); // Use fetched data (can handle one patient info)
                } catch (error) {
                    console.error('Error fetching patient data:', error);
                }
            };

            fetchPatientData();
        }
    }, [selectedId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/queue/${selectedId}`, {
                id: selectedId,
                patient_name: patientName,
                queue_status: queueStatus,
                queue_progress: queueProgress,
                priority_num: priorityNum,
            });
            alert('Queue Updated!');
        } catch (error) {
            console.error('Error updating the queue:', error);
            alert('Error updating the queue');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Update Patient Queue</h2>
            <form onSubmit={handleSubmit}>
                {/* Patient ID input */}
                <div className="mb-4">
                    <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Enter Patient ID</label>
                    <input
                        id="patientId"
                        type="number"
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter patient ID"
                        required
                    />
                </div>

                {/* Patient Name */}
                {patientData && (
                    <div className="mb-4">
                        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
                        <input
                            id="patientName"
                            type="text"
                            value={patientName || patientData.patient_name} // Default to fetched name
                            onChange={(e) => setPatientName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter patient name"
                            required
                        />
                    </div>
                )}

                {/* Queue Status */}
                <div className="mb-4">
                    <label htmlFor="queueStatus" className="block text-sm font-medium text-gray-700">Queue Status</label>
                    <select
                        id="queueStatus"
                        value={queueStatus}
                        onChange={(e) => setQueueStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>

                {/* Queue Progress */}
                <div className="mb-4">
                    <label htmlFor="queueProgress" className="block text-sm font-medium text-gray-700">Queue Progress</label>
                    <select
                        id="queueProgress"
                        value={queueProgress}
                        onChange={(e) => setQueueProgress(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="wait">Wait</option>
                        <option value="with_doc">With Doctor</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>

                {/* Priority Number */}
                <div className="mb-4">
                    <label htmlFor="priorityNum" className="block text-sm font-medium text-gray-700">Priority Number</label>
                    <input
                        id="priorityNum"
                        type="number"
                        value={priorityNum}
                        onChange={(e) => setPriorityNum(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter priority number"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                >
                    Update Queue
                </button>
            </form>
        </div>
    );
};

export default UpdateQueue;
