interface HeaderSectionProps {
    title: string;
    description: string;
  }
  
  export default function HeaderSection({ title, description }: HeaderSectionProps) {
    return (
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    );
  }