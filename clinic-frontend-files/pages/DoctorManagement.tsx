import { useState } from "react";
import CreateDoctor from "./doctor/CreateDoctor"; // Import CreateDoctor component
import ReadDoctor from "./doctor/ReadDoctor";
import UpdateDoctor from "./doctor/UpdateDoctor";
import DeleteDoctor from "./doctor/DeleteDoctor";
// import ReadDoctor from "./doctor/ReadDoctor"; // Import ReadDoctor component
// import UpdateDoctor from "./doctor/UpdateDoctor"; // Import UpdateDoctor component
// import DeleteDoctor from "./doctor/DeleteDoctor"; // Import DeleteDoctor component

export default function DoctorManagement() {
    const [view, setView] = useState("create"); // Default to the create view

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Doctor Management</h2>

            {/* Navigation buttons to switch between views */}
            <div className="flex gap-4 mb-4">
                <button
                    className={`px-4 py-2 rounded ${view === "create" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    onClick={() => setView("create")}
                >
                    Create New Doctor Entry
                </button>
                <button
                    className={`px-4 py-2 rounded ${view === "read" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    onClick={() => setView("read")}
                >
                    View Doctor Data
                </button>
                <button
                    className={`px-4 py-2 rounded ${view === "update" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    onClick={() => setView("update")}
                >
                    Update Doctor Data
                </button>
                <button
                    className={`px-4 py-2 rounded ${view === "delete" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    onClick={() => setView("delete")}
                >
                    Delete Doctor Data
                </button>
            </div>

            {/* Conditional rendering of components */}
            {view === "create" && <CreateDoctor />}
            {view === "read" && <ReadDoctor />}
            {view === "update" && <UpdateDoctor />}
            {view === "delete" && <DeleteDoctor />}
        </div>
    );
}
