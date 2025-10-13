"use client";

import { useState } from 'react';
import { testLastFmAPI, getCurrentTrack, getTopArtists, getUserInfo, getMonthlyStats } from '@/services/lastfm';

export default function LastFmTest() {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    if (!username.trim()) {
      setError('Please enter a Last.fm username');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const testResults = await testLastFmAPI(username);
      setResults(testResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Last.fm API Test</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Last.fm username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg mr-4 text-white"
          />
          <button
            onClick={handleTest}
            disabled={loading}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test API'}
          </button>
        </div>

        {error && (
          <div className="bg-red-800 border border-red-600 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-red-200">Error:</h3>
            <p className="text-red-100">{error}</p>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">API Test Results</h2>
              <p className="mb-4">
                Status: <span className={results.success ? 'text-green-400' : 'text-red-400'}>
                  {results.success ? '✅ Success' : '❌ Failed'}
                </span>
              </p>

              {results.success && results.data && (
                <div className="space-y-4">
                  {/* Current Track */}
                  {results.data.currentTrack && (
                    <div className="bg-gray-700 rounded p-4">
                      <h3 className="font-semibold text-purple-300 mb-2">Current/Recent Track:</h3>
                      <p><strong>Track:</strong> {results.data.currentTrack.name}</p>
                      <p><strong>Artist:</strong> {results.data.currentTrack.artist}</p>
                      <p><strong>Album:</strong> {results.data.currentTrack.album}</p>
                      <p><strong>Now Playing:</strong> {results.data.currentTrack.isPlaying ? '🎵 Yes' : '⏸️ No'}</p>
                      {results.data.currentTrack.image && (
                        <img src={results.data.currentTrack.image} alt="Album art" className="w-16 h-16 mt-2 rounded" />
                      )}
                    </div>
                  )}

                  {/* User Info */}
                  {results.data.userInfo && (
                    <div className="bg-gray-700 rounded p-4">
                      <h3 className="font-semibold text-purple-300 mb-2">User Info:</h3>
                      <p><strong>Name:</strong> {results.data.userInfo.name}</p>
                      <p><strong>Total Scrobbles:</strong> {results.data.userInfo.playcount?.toLocaleString()}</p>
                      <p><strong>Artists:</strong> {results.data.userInfo.artistcount?.toLocaleString()}</p>
                      <p><strong>Country:</strong> {results.data.userInfo.country}</p>
                    </div>
                  )}

                  {/* Top Artists */}
                  {results.data.topArtists && results.data.topArtists.length > 0 && (
                    <div className="bg-gray-700 rounded p-4">
                      <h3 className="font-semibold text-purple-300 mb-2">Top Artists (Last Month):</h3>
                      <div className="space-y-2">
                        {results.data.topArtists.map((artist, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            {artist.image && (
                              <img src={artist.image} alt={artist.name} className="w-12 h-12 rounded" />
                            )}
                            <div>
                              <p><strong>{artist.name}</strong></p>
                              <p className="text-sm text-gray-300">{artist.playcount} plays</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Top Albums */}
                  {results.data.topAlbums && results.data.topAlbums.length > 0 && (
                    <div className="bg-gray-700 rounded p-4">
                      <h3 className="font-semibold text-purple-300 mb-2">Top Albums (Last Month):</h3>
                      <div className="space-y-2">
                        {results.data.topAlbums.map((album, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            {album.image && (
                              <img src={album.image} alt={album.name} className="w-12 h-12 rounded" />
                            )}
                            <div>
                              <p><strong>{album.name}</strong></p>
                              <p className="text-sm text-gray-300">by {album.artist} • {album.playcount} plays</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Monthly Stats */}
                  {results.data.monthlyStats && (
                    <div className="bg-gray-700 rounded p-4">
                      <h3 className="font-semibold text-purple-300 mb-2">Monthly Stats:</h3>
                      {results.data.monthlyStats.topArtist && (
                        <p><strong>Top Artist:</strong> {results.data.monthlyStats.topArtist.name} ({results.data.monthlyStats.topArtist.playcount} plays)</p>
                      )}
                      {results.data.monthlyStats.topAlbum && (
                        <p><strong>Top Album:</strong> {results.data.monthlyStats.topAlbum.name} by {results.data.monthlyStats.topAlbum.artist}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
