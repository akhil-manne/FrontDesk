import { useState, useEffect } from "react";

const CreateQueue = () => {
    const [patientName, setPatientName] = useState("");
    const [queueStatus, setQueueStatus] = useState(""); // Empty by default
    const [priorityNum, setPriorityNum] = useState("");

    // Assuming this fetches counts for normal/urgent queue numbers
    const [urgentCount, setUrgentCount] = useState(0);
    const [normalCount, setNormalCount] = useState(0);

    // Fetch count data
    useEffect(() => {
        const fetchQueueCounts = async () => {
            try {
                const response = await fetch("http://localhost:3000/queue/counts");
                const data = await response.json();
                setUrgentCount(data.urgentCount);
                setNormalCount(data.normalCount);
            } catch (err) {
                console.error(err);
            }
        };
        fetchQueueCounts();
    }, []);

    const handleCreateQueue = async () => {
        if (!patientName || !queueStatus) {
            alert("Please fill out all fields.");
            return;
        }

        // Assign priority number if not provided
        const calculatedPriority = priorityNum || (queueStatus === "urgent" ? urgentCount + 1 : normalCount + 1);

        const payload = {
            patient_name: patientName,
            queue_status: queueStatus,
            priority_num: calculatedPriority,
        };

        try {
            const response = await fetch("http://localhost:3000/queue", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert("Queue entry created successfully!");
                setPatientName("");
                setQueueStatus("");
                setPriorityNum("");
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "Failed to create queue entry."}`);
            }
        } catch (err) {
            console.error(err);
            alert("Error: Unable to connect to the server.");
        }
    };

    return (
        <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create New Queue Entry</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Patient Name:</label>
                <input
                    type="text"
                    className="border border-gray-300 p-2 rounded w-full"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Queue Status:</label>
                <select
                    className="border border-gray-300 p-2 rounded w-full"
                    value={queueStatus}
                    onChange={(e) => setQueueStatus(e.target.value)}
                >
                    <option value="" disabled>Select status</option>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Priority Number:</label>
                <input
                    type="number"
                    className="border border-gray-300 p-2 rounded w-full"
                    value={priorityNum}
                    onChange={(e) => setPriorityNum(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleCreateQueue}
            >
                Add to Queue
            </button>
        </div>
    );
};

export default CreateQueue;
