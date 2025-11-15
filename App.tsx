
import React, { useState, useCallback } from 'react';
import { factCheckWithGoogleSearch } from './services/geminiService';
import type { FactCheckResult } from './types';
import LoadingSpinner from './components/LoadingSpinner';
import ResultDisplay from './components/ResultDisplay';
import GoogleIcon from './components/icons/GoogleIcon';

const App: React.FC = () => {
  const [claim, setClaim] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!claim.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const apiResult = await factCheckWithGoogleSearch(claim);
      setResult(apiResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [claim, isLoading]);
  
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setClaim(event.target.value);
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-3xl mb-8 text-center">
        <div className="flex items-center justify-center gap-4">
            <GoogleIcon className="h-10 w-10" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Fact Checker Agent
            </h1>
        </div>
        <p className="text-slate-400 mt-4 text-lg">
          Enter a claim, news headline, or URL to verify its authenticity with AI and Google Search.
        </p>
      </header>

      <main className="w-full max-w-3xl flex-grow flex flex-col items-center">
        <div className="w-full bg-slate-800/50 rounded-lg shadow-2xl p-6 backdrop-blur-sm border border-slate-700">
          <form onSubmit={handleSubmit}>
            <label htmlFor="claim-input" className="sr-only">Enter claim or URL</label>
            <textarea
              id="claim-input"
              value={claim}
              onChange={handleTextAreaChange}
              placeholder="e.g., Did NASA discover a new planet made of diamond?"
              className="w-full h-32 p-4 bg-slate-900 border-2 border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 text-slate-200 placeholder-slate-500 resize-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !claim.trim()}
              className="mt-4 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Fact-Check Now'
              )}
            </button>
          </form>
        </div>

        <div className="w-full mt-8">
          {isLoading && <LoadingSpinner />}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg animate-fade-in" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {result && <ResultDisplay result={result} />}
        </div>
      </main>
      
      <footer className="w-full max-w-3xl mt-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Fact Checker Agent. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
