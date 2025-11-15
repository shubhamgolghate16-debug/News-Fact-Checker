
import React from 'react';
import type { FactCheckResult } from '../types';

interface ResultDisplayProps {
  result: FactCheckResult;
}

const RATING_STYLES: { [key: string]: string } = {
  'True': 'bg-green-600 text-green-100',
  'Partially True': 'bg-yellow-600 text-yellow-100',
  'Misleading': 'bg-orange-600 text-orange-100',
  'False': 'bg-red-600 text-red-100',
  'Unverifiable': 'bg-slate-600 text-slate-100',
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const ratingStyle = RATING_STYLES[result.rating] || RATING_STYLES['Unverifiable'];

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl w-full p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 border-b border-slate-600 pb-4">
        <h2 className="text-2xl font-bold text-slate-100 mb-2 sm:mb-0">
          Analysis Result
        </h2>
        <span className={`px-4 py-1.5 text-lg font-bold rounded-full ${ratingStyle}`}>
          {result.rating}
        </span>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-100 mb-2">Summary</h3>
        <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
          {result.summary}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-100 mb-2">Justification</h3>
        <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
          {result.justification}
        </p>
      </div>

      {result.sources.length > 0 && (
        <>
          <h3 className="text-xl font-semibold text-slate-100 mt-8 mb-4 border-b border-slate-600 pb-2">
            Sources
          </h3>
          <ul className="space-y-3">
            {result.sources.map((source, index) => (
              <li key={index} className="bg-slate-700 p-3 rounded-md hover:bg-slate-600 transition-colors">
                <a
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <p className="font-semibold text-blue-400 group-hover:underline truncate">
                    {source.web.title}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {source.web.uri}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ResultDisplay;
