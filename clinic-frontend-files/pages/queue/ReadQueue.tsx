// import { useState, useEffect } from "react";

// interface Queue {
//     q_id: number;
//     patient_name: string;
//     queue_status: string;
//     priority_num: number;
//     queue_progress: string;
//     created_at: string; // Assume this comes from the backend
// }

// export default function ReadQueue() {
//     const [filter, setFilter] = useState("all");
//     const [searchInput, setSearchInput] = useState("");
//     const [queueData, setQueueData] = useState<Queue[]>([]);
//     const [errorMessage, setErrorMessage] = useState("");

//     const fetchQueues = async (endpoint: string) => {
//         try {
//             const response = await fetch(`http://localhost:3000/${endpoint}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 // Sort data by priority_num ascending
//                 data.sort((a: Queue, b: Queue) => a.priority_num - b.priority_num);
//                 setQueueData(data);
//                 setErrorMessage("");
//             } else {
//                 const errorData = await response.json();
//                 setErrorMessage(errorData.message || "Error fetching queue data.");
//                 setQueueData([]);
//             }
//         } catch (error) {
//             setErrorMessage("Unable to fetch data. Server might be unreachable.");
//             setQueueData([]);
//         }
//     };

//     const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setFilter(e.target.value);
//         setSearchInput(""); // Reset search input when the filter changes
//         setQueueData([]); // Clear previous results
//     };

//     const handleSearch = async () => {
//         let endpoint = "queue"; // Default endpoint for all queues

//         // Modify endpoint according to the selected filter
//         if (filter === "queue_status") {
//             const status = searchInput.trim();
//             if (status) {
//                 endpoint = `queue?status=${status}`;
//             }
//         }
//         else if (filter === "queue_progress") {
//             const progress = searchInput.trim();
//             if (progress) {
//                 endpoint = `queue?progress=${progress}`;
//             }
//         }
//         else if (filter === "priority_num") {
//             const priority = searchInput.trim();
//             if (priority) {
//                 endpoint = `queue?priority=${priority}`; // Search based on priority
//             }
//         }
//         else if (filter === "all") {
//             // If filter is 'all', just fetch all queues
//             endpoint = "queue";
//         }

//         // Fetch the filtered queues
//         await fetchQueues(endpoint);
//     };

//     const calculateWaitTime = (createdAt: string, progress: string) => {
//         const createdTime = new Date(createdAt).getTime();
//         const currentTime = new Date().getTime();
//         const waitTimeMinutes = Math.floor((currentTime - createdTime) / 60000); // Convert ms to minutes
//         if (progress === 'wait') {
//             return waitTimeMinutes > 0 ? `${waitTimeMinutes} min` : "Just now";
//         }
//         return 0;
//     };

//     useEffect(() => {
//         if (filter === "all") {
//             fetchQueues("queue");
//         }
//     }, [filter]);

//     return (
//         <div className="mt-4">
//             <h3 className="text-lg font-semibold">Queue Data:</h3>
//             {/* Filter Selection */}
//             <div className="flex items-center gap-4 mb-4">
//                 <label className="block text-gray-700">Filter:</label>
//                 <select
//                     className="border border-gray-300 rounded p-2"
//                     value={filter}
//                     onChange={handleFilterChange}
//                 >
//                     <option value="all">All</option>
//                     <option value="queue_status">Status</option>
//                     <option value="queue_progress">Progress</option>
//                     <option value="priority_num">Priority</option> {/* Updated filter option */}
//                 </select>

//                 {/* Conditional input based on filter */}
//                 {filter === "queue_status" && (
//                     <select
//                         className="border border-gray-300 rounded p-2"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                     >
//                         <option value="">Select Status</option>
//                         <option value="normal">Normal</option>
//                         <option value="urgent">Urgent</option>
//                     </select>
//                 )}
//                 {filter === "queue_progress" && (
//                     <select
//                         className="border border-gray-300 rounded p-2"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                     >
//                         <option value="">Select Progress</option>
//                         <option value="wait">Wait</option>
//                         <option value="with_doc">With Doctor</option>
//                         <option value="complete">Complete</option>
//                     </select>
//                 )}
//                 {filter === "priority_num" && (
//                     <input
//                         type="number" // Priority number is numeric
//                         className="border border-gray-300 rounded p-2"
//                         placeholder="Enter Priority Number"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                     />
//                 )}

//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     onClick={handleSearch}
//                 >
//                     Search
//                 </button>
//             </div>

//             {/* Display Queue Data */}
//             {queueData.length > 0 ? (
//                 <ul className="mt-2">
//                     {queueData.map((item) => (
//                         <li key={item.q_id} className="border-b border-gray-300 py-2">
//                             <span>ID: {item.q_id}</span>,{" "}
//                             <span>Name: {item.patient_name}</span>,{" "}
//                             <span>Status: {item.queue_status}</span>,{" "}
//                             <span>Priority: {item.priority_num}</span>,{" "}
//                             <span>Progress: {item.queue_progress}</span>,{" "}
//                             <span>Wait Time: {calculateWaitTime(item.created_at, item.queue_progress)}</span>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-600 mt-2">No queue data available.</p>
//             )}
//         </div>
//     );
// }


import { useState, useEffect } from "react";

interface Queue {
    q_id: number;
    patient_name: string;
    queue_status: string;
    priority_num: number;
    queue_progress: string;
    created_at: string; // Assume this comes from the backend
}

export default function ReadQueue() {
    const [filter, setFilter] = useState("all");
    const [searchInput, setSearchInput] = useState("");
    const [queueData, setQueueData] = useState<Queue[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchQueues = async (endpoint: string) => {
        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`);
            if (response.ok) {
                const data = await response.json();
                data.sort((a: Queue, b: Queue) => a.priority_num - b.priority_num);
                setQueueData(data);
                setErrorMessage("");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Error fetching queue data.");
                setQueueData([]);
            }
        } catch (error) {
            setErrorMessage("Unable to fetch data. Server might be unreachable.");
            setQueueData([]);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
        setSearchInput("");
        setQueueData([]);
    };

    const handleSearch = async () => {
        let endpoint = "queue";

        if (filter === "queue_status" && searchInput.trim()) {
            endpoint = `queue?status=${searchInput.trim()}`;
        } else if (filter === "queue_progress" && searchInput.trim()) {
            endpoint = `queue?progress=${searchInput.trim()}`;
        } else if (filter === "priority_num" && searchInput.trim()) {
            endpoint = `queue?priority=${searchInput.trim()}`;
        } else if (filter === "all") {
            endpoint = "queue";
        }

        await fetchQueues(endpoint);
    };

    const calculateWaitTime = (createdAt: string, progress: string) => {
        const createdTime = new Date(createdAt).getTime();
        const currentTime = new Date().getTime();
        const waitTimeMinutes = Math.floor((currentTime - createdTime) / 60000);
        return progress === "wait" ? (waitTimeMinutes > 0 ? `${waitTimeMinutes} min` : "Just now") : "N/A";
    };

    useEffect(() => {
        if (filter === "all") {
            fetchQueues("queue");
        }
    }, [filter]);

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Queue Management</h2>
            {/* Filter and Search Section */}
            <div className="bg-gray-100 p-4 rounded-md shadow-md space-y-4">
                <div className="flex items-center gap-4">
                    <label htmlFor="filter" className="font-semibold">Filter By:</label>
                    <select
                        id="filter"
                        className="border rounded p-2"
                        value={filter}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All</option>
                        <option value="queue_status">Status</option>
                        <option value="queue_progress">Progress</option>
                        <option value="priority_num">Priority</option>
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    {filter === "queue_status" && (
                        <select
                            className="border rounded p-2"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="normal">Normal</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    )}
                    {filter === "queue_progress" && (
                        <select
                            className="border rounded p-2"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        >
                            <option value="">Select Progress</option>
                            <option value="wait">Waiting</option>
                            <option value="with_doc">With Doctor</option>
                            <option value="complete">Completed</option>
                        </select>
                    )}
                    {filter === "priority_num" && (
                        <input
                            type="number"
                            className="border rounded p-2"
                            placeholder="Enter Priority"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    )}
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Queue List Section */}
            <div className="mt-6 bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold mb-4">Queue Details</h3>
                {queueData.length > 0 ? (
                    <ul className="divide-y divide-gray-300">
                        {queueData.map((queue) => (
                            <li key={queue.q_id} className="py-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p><strong>Patient ID:</strong> {queue.q_id}</p>
                                        <p><strong>Patient Name:</strong> {queue.patient_name}</p>
                                        <p><strong>Status:</strong> {queue.queue_status}</p>
                                        <p><strong>Priority:</strong> {queue.priority_num}</p>
                                    </div>
                                    <div>
                                        <p><strong>Progress:</strong> {queue.queue_progress}</p>
                                        <p><strong>Wait Time:</strong> {calculateWaitTime(queue.created_at, queue.queue_progress)}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 mt-2">{errorMessage || "No queue data available."}</p>
                )}
            </div>
        </div>
    );
}
