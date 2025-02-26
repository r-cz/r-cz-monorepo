"use client";

import React, { useEffect, useState } from "react";

interface TokenTimelineProps {
  payload: any;
}

export function TokenTimeline({ payload }: TokenTimelineProps) {
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));
  
  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Extract relevant timestamps
  const issuedAt = payload.iat ? payload.iat * 1000 : null;
  const expiration = payload.exp ? payload.exp * 1000 : null;
  const authTime = payload.auth_time ? payload.auth_time * 1000 : null;
  const notBefore = payload.nbf ? payload.nbf * 1000 : null;
  
  // Current time in ms
  const now = currentTime * 1000;
  
  // If we don't have both iat and exp, we can't create a useful timeline
  if (!issuedAt || !expiration) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-yellow-800">
          Cannot display token timeline. Missing required timestamps (iat and/or exp).
        </p>
      </div>
    );
  }
  
  // Calculate the total token lifetime
  const totalLifetime = expiration - issuedAt;
  
  // Calculate elapsed time
  const elapsed = Math.max(0, now - issuedAt);
  
  // Calculate percentage elapsed
  const percentElapsed = Math.min(100, (elapsed / totalLifetime) * 100);
  
  // Format time difference as human-readable
  const formatTimeDiff = (from: number, to: number) => {
    const diffSecs = Math.floor((to - from) / 1000);
    
    if (diffSecs < 0) {
      return `${Math.abs(diffSecs)}s ago`;
    }
    
    if (diffSecs < 60) {
      return `${diffSecs}s`;
    } else if (diffSecs < 3600) {
      return `${Math.floor(diffSecs / 60)}m ${diffSecs % 60}s`;
    } else if (diffSecs < 86400) {
      const hours = Math.floor(diffSecs / 3600);
      const mins = Math.floor((diffSecs % 3600) / 60);
      return `${hours}h ${mins}m`;
    } else {
      const days = Math.floor(diffSecs / 86400);
      const hours = Math.floor((diffSecs % 86400) / 3600);
      return `${days}d ${hours}h`;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="relative pt-10 pb-4">
        {/* Timeline bar */}
        <div className="h-2 bg-gray-200 rounded-full relative">
          {/* Filled portion */}
          <div 
            className={`h-full rounded-full ${
              now > expiration ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${percentElapsed}%` }}
          ></div>
          
          {/* Authentication time marker (if present) */}
          {authTime && (
            <div 
              className="absolute w-4 h-4 bg-purple-500 rounded-full -mt-1 transform -translate-x-1/2"
              style={{ 
                left: `${((authTime - issuedAt) / totalLifetime) * 100}%`,
                top: '0%'
              }}
              title={`Authentication: ${new Date(authTime).toLocaleString()}`}
            ></div>
          )}
          
          {/* Not before marker (if present) */}
          {notBefore && (
            <div 
              className="absolute w-4 h-4 bg-yellow-500 rounded-full -mt-1 transform -translate-x-1/2"
              style={{ 
                left: `${((notBefore - issuedAt) / totalLifetime) * 100}%`,
                top: '0%'
              }}
              title={`Not Before: ${new Date(notBefore).toLocaleString()}`}
            ></div>
          )}
          
          {/* Current time marker */}
          <div 
            className="absolute w-4 h-4 bg-green-500 rounded-full -mt-1 transform -translate-x-1/2"
            style={{ 
              left: `${Math.min(100, ((now - issuedAt) / totalLifetime) * 100)}%`,
              top: '0%'
            }}
            title={`Current Time: ${new Date(now).toLocaleString()}`}
          ></div>
          
          {/* Start label */}
          <div 
            className="absolute -mt-8 transform -translate-x-1/2 text-xs font-mono whitespace-nowrap"
            style={{ left: '0%' }}
          >
            Issued: {new Date(issuedAt).toLocaleString()}
          </div>
          
          {/* End label */}
          <div 
            className="absolute -mt-8 transform -translate-x-1/2 text-xs font-mono whitespace-nowrap"
            style={{ left: '100%' }}
          >
            Expires: {new Date(expiration).toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-md p-3">
          <h4 className="text-sm font-medium">Token Age</h4>
          <p className="text-2xl font-bold">
            {formatTimeDiff(issuedAt, now)}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(issuedAt).toLocaleString()}
          </p>
        </div>
        
        <div className="border rounded-md p-3">
          <h4 className="text-sm font-medium">Remaining Lifetime</h4>
          <p className={`text-2xl font-bold ${now > expiration ? 'text-red-500' : ''}`}>
            {now > expiration 
              ? 'Expired' 
              : formatTimeDiff(now, expiration)}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(expiration).toLocaleString()}
          </p>
        </div>
        
        {authTime && (
          <div className="border rounded-md p-3">
            <h4 className="text-sm font-medium">Authentication Time</h4>
            <p className="text-lg font-bold">
              {formatTimeDiff(authTime, now)} ago
            </p>
            <p className="text-xs text-gray-500">
              {new Date(authTime).toLocaleString()}
            </p>
          </div>
        )}
        
        <div className="border rounded-md p-3">
          <h4 className="text-sm font-medium">Total Lifetime</h4>
          <p className="text-lg font-bold">
            {formatTimeDiff(issuedAt, expiration)}
          </p>
          <p className="text-xs text-gray-500">
            {Math.round(totalLifetime / 1000)} seconds
          </p>
        </div>
      </div>
      
      {payload.sid && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm">
            <span className="font-medium">Session ID:</span> {payload.sid}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            This token is associated with a specific authentication session.
          </p>
        </div>
      )}
    </div>
  );
}
