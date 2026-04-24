import React from 'react';

const Fleet = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Our Fleet Collection</h1>
        <p className="text-lg text-slate-500">
          Discover a wide range of premium vehicles ready for your journey.
        </p>
        <div className="mt-12 text-slate-400">
          {/* Add your CarList or full collection components here */}
          <p>[ Car Listing Components Placeholder ]</p>
        </div>
      </div>
    </div>
  );
};

export default Fleet;