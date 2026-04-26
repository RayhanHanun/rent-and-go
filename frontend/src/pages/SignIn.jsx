import React from 'react';

const SignIn = () => {
  return (
    <div className="pt-24 min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">Sign In</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input 
              type="email" 
              className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-slate-800 focus:ring focus:ring-slate-800/20 px-4 py-2 border" 
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-slate-800 focus:ring focus:ring-slate-800/20 px-4 py-2 border" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="button" 
            className="w-full bg-slate-900 text-white rounded-lg px-4 py-2.5 font-medium hover:bg-slate-950 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
