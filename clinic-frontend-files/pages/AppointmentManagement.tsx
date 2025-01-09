import { useState } from 'react';
import CreateAppointment from './appointments/CreateAppointment';
import ReadAppointment from './appointments/ReadAppointment';
import UpdateAppointment from './appointments/UpdateAppointment';
import DeleteAppointment from './appointments/DeleteAppointment';

const AppointmentManagement = () => {
    const [activeTab, setActiveTab] = useState<string>('create'); // Default to 'view'

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">Appointment Management</h1>

            {/* Navigation Tabs */}
            <div className="mb-6 flex justify-center">
                <button
                    onClick={() => setActiveTab('create')}
                    className={`px-4 py-2 mx-2 rounded ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                >
                    Create Appointment
                </button>
                <button
                    onClick={() => setActiveTab('view')}
                    className={`px-4 py-2 mx-2 rounded ${activeTab === 'view' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                >
                    View Appointments
                </button>
                <button
                    onClick={() => setActiveTab('update')}
                    className={`px-4 py-2 mx-2 rounded ${activeTab === 'update' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                >
                    Update Appointment
                </button>
                <button
                    onClick={() => setActiveTab('delete')}
                    className={`px-4 py-2 mx-2 rounded ${activeTab === 'delete' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                >
                    Delete Appointment
                </button>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'view' && <ReadAppointment />}
                {activeTab === 'create' && <CreateAppointment />}
                {activeTab === 'update' && <UpdateAppointment />}
                {activeTab === 'delete' && <DeleteAppointment />}
            </div>
        </div>
    );
};

export default AppointmentManagement;
