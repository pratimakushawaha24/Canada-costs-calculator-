import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-2">Canada Cost Calculator</h3>
          <p className="text-sm text-gray-400">Calculate your costs across Canada.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Calculators</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/calculators/salary-after-tax" className="hover:underline">Salary After Tax</Link></li>
            <li><Link href="/calculators/mortgage" className="hover:underline">Mortgage</Link></li>
            <li><Link href="/calculators/moving-cost" className="hover:underline">Moving Cost</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Services</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/service-costs/plumber" className="hover:underline">Plumber</Link></li>
            <li><Link href="/service-costs/house-cleaning" className="hover:underline">House Cleaning</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms</Link></li>
            <li><Link href="/disclaimer" className="hover:underline">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Canada Cost Calculator. All rights reserved.
      </div>
    </footer>
  );
}
