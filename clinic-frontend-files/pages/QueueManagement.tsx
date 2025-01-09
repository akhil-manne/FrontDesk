import { useState } from "react";
import CreateQueue from "./queue/CreateQueue"; // Import CreateQueue component
import ReadQueue from "./queue/ReadQueue"; // Import ReadQueue component
import UpdateQueue from "./queue/UpdateQueue";
import DeleteQueue from "./queue/DeleteQueue";

export default function QueueManagement() {
    const [view, setView] = useState("create"); // Default to the create view

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Queue Management</h2>

            {/* Navigation buttons to switch between views */}
            <div className="flex gap-4 mb-4">
                <button
                    className={`px-4 py-2 rounded ${view === "create" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    onClick={() => setView("create")}
                >
                    Create New Queue Entry
                </button>
                <button
                    className={`px-4 py-2 rounded ${view === "read" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    onClick={() => setView("read")}
                >
                    View Queue Data
                </button>
                <button
                    className={`px-4 py-2 rounded ${view === "update" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    onClick={() => setView("update")}
                >
                    Update Queue Data
                </button>
                <button
                    className={`px-4 py-2 rounded ${view === "delete" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    onClick={() => setView("delete")}
                >
                    Delete Queue Data
                </button>
            </div>

            {/* Conditional rendering of components */}
            {view === "create" && <CreateQueue />}
            {view === "read" && <ReadQueue />}
            {view === "update" && <UpdateQueue />}
            {view === "delete" && <DeleteQueue />}
        </div>
    );
}
