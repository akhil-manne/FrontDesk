import Link from "next/link";
import '../styles/globals.css';
import QueueManagement from "../pages/QueueManagement";
import DoctorManagement from "./DoctorManagement";
import AppointmentManagement from "./AppointmentManagement";


export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="flex flex-col gap-6 w-full max-w-4xl">
                <div className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl border border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Queue Management</h2>
                    <div className="mt-4">
                        <QueueManagement />
                    </div>
                </div>
                <div className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl border border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Doctor Management</h2>
                    <div className="mt-4">
                        <DoctorManagement />
                    </div>
                </div>
                <div className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl border border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Appointment Management</h2>
                    <div className="mt-4">
                        <AppointmentManagement />
                    </div>
                </div>
            </div>
        </div>
    );
}