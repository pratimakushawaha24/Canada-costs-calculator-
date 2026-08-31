'use client';

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const shareData = {
    title,
    url: typeof window !== 'undefined' ? window.location.href : url,
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => navigator.share?.(shareData)}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        aria-label="Share"
      >
        Share
      </button>
    </div>
  );
}
