import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Canada Cost Calculator',
  description: 'Learn about our mission to provide free, accurate cost calculators and service guides for Canadians.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700 leading-relaxed">
        Canada Cost Calculator helps Canadians estimate salaries, taxes, home service costs, and more. We provide
        free, easy‑to‑use tools and guides to help you make informed decisions.
      </p>
      {/* Add more content as needed */}
    </div>
  );
}
