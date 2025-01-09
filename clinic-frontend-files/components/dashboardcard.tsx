// src/components/DashboardCard.tsx
import Link from "next/link";

// Define the interface for props to make the component reusable
interface DashboardCardProps {
    title: string;
    description: string;
    href: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, href }) => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-4">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
            <Link href={href}>
                <a className="text-blue-600 hover:text-blue-800 mt-4 inline-block">Go to {title}</a>
            </Link>
        </div>
    );
};

export default DashboardCard;
