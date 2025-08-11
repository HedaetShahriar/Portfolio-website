import Link from 'next/link';

const QuickLink = ({ href, icon: Icon, children }) => (
    <Link href={href}
        className="flex items-center space-x-3 p-3 rounded-lg transition-colors bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white"
    >
        <Icon className="h-5 w-5 text-indigo-400" />
        <span>{children}</span>
    </Link>
);

export default QuickLink;