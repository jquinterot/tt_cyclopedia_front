type FeatureCardProps = {
  title: string;
  description: string;
  testId: string;
};

export default function FeatureCard({ title, description, testId }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10" data-testid={testId}>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
} 