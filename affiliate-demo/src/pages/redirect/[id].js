import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Mock affiliate URL map (you can replace this with actual logic or dynamic fetch)
const affiliateMap = {
  1: 'https://example.com/affiliate/1',
  2: 'https://example.com/affiliate/2',
  3: 'https://example.com/affiliate/3',
};

export default function RedirectPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    // ✅ Log click here (mock or real API call)
    console.log(`Tracking click for product ID: ${id}`);

    // 🔁 Redirect after short delay
    const redirectToAffiliate = () => {
      const target = affiliateMap[id] || 'https://example.com';
      window.location.href = target;
    };

    const timer = setTimeout(redirectToAffiliate, 1000); // 1 second delay for realism
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Redirecting you to the product...</h2>
      <p className="text-gray-600">Please wait while we track your click and send you to the affiliate site.</p>
    </div>
  );
}
