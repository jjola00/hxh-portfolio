"use client";

import { useState } from 'react';
import { testSpotifyAPI, getAuthURL, getCurrentlyPlaying, getTopArtists, getUserProfile, getUserPlaylists } from '@/services/spotify';

export default function SpotifyTest() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authUrl, setAuthUrl] = useState('');

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const testResults = await testSpotifyAPI();
      setResults(testResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = () => {
    const url = getAuthURL();
    setAuthUrl(url);
    window.open(url, '_blank');
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatProgress = (progress, duration) => {
    return `${formatDuration(progress)} / ${formatDuration(duration)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🎧 Spotify API Test</h1>
        
        <div className="mb-6 space-x-4">
          <button
            onClick={handleTest}
            disabled={loading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Spotify API'}
          </button>
          
          <button
            onClick={handleAuth}
            className="px-6 py-2 bg-green-800 hover:bg-green-900 rounded-lg"
          >
            Get Auth URL (if needed)
          </button>
        </div>

        {authUrl && (
          <div className="bg-blue-800 border border-blue-600 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-blue-200 mb-2">Authentication URL:</h3>
            <p className="text-blue-100 text-sm break-all">{authUrl}</p>
            <p className="text-blue-200 text-sm mt-2">
              Visit this URL to authenticate and get your refresh token.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-800 border border-red-600 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-red-200">Error:</h3>
            <p className="text-red-100">{error}</p>
            {error.includes('refresh token') && (
              <p className="text-red-200 text-sm mt-2">
                You need to authenticate first using the "Get Auth URL" button above.
              </p>
            )}
          </div>
        )}

        {results && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Spotify API Test Results</h2>
              <p className="mb-4">
                Status: <span className={results.success ? 'text-green-400' : 'text-red-400'}>
                  {results.success ? '✅ Success' : '❌ Failed'}
                </span>
              </p>

              {results.success && results.data && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Currently Playing */}
                  {results.data.currentTrack && (
                    <div className="bg-gray-700 rounded p-4">
                      <h3 className="font-semibold text-green-300 mb-3">🎵 Currently Playing:</h3>
                      <div className="flex items-center space-x-4">
                        {results.data.currentTrack.image && (
                          <img 
                            src={results.data.currentTrack.image} 
                            alt="Album art" 
                            className="w-16 h-16 rounded"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{results.data.currentTrack.name}</p>
                          <p className="text-gray-300 text-sm">{results.data.currentTrack.artist}</p>
                          <p className="text-gray-400 text-xs">{results.data.currentTrack.album}</p>
                          <p className="text-green-400 text-xs">
                            {results.data.currentTrack.isPlaying ? '▶️ Playing' : '⏸️ Paused'} • {results.data.currentTrack.device}
                          </p>
                          <div className="mt-2">
                            <div className="bg-gray-600 rounded-full h-1">
                              <div 
                                className="bg-green-400 h-1 rounded-full"
                                style={{ width: `${results.data.currentTrack.progressPercent}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatProgress(results.data.currentTrack.progress, results.data.currentTrack.duration)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* User Profile */}
                  {results.data.userProfile && (
                    <div className="bg-gray-700 rounded p-4">
                      <h3 className="font-semibold text-green-300 mb-3">👤 User Profile:</h3>
                      <div className="flex items-center space-x-4">
                        {results.data.userProfile.image && (
                          <img 
                            src={results.data.userProfile.image} 
                            alt="Profile" 
                            className="w-16 h-16 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-medium">{results.data.userProfile.displayName}</p>
                          <p className="text-gray-300 text-sm">
                            {results.data.userProfile.followers?.toLocaleString()} followers
                          </p>
                          <p className="text-gray-400 text-xs">
                            {results.data.userProfile.product} • {results.data.userProfile.country}
                          </p>
                          <p className="text-green-400 text-xs">
                            {results.data.savedCount} liked songs
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top Artists */}
                  {results.data.topArtists && results.data.topArtists.length > 0 && (
                    <div className="bg-gray-700 rounded p-4 lg:col-span-2">
                      <h3 className="font-semibold text-green-300 mb-3">🎤 Top Artists (Last 4 Weeks):</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {results.data.topArtists.slice(0, 6).map((artist, index) => (
                          <div key={index} className="flex items-center space-x-3 bg-gray-600 rounded p-2">
                            {artist.image && (
                              <img src={artist.image} alt={artist.name} className="w-12 h-12 rounded-full" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{artist.name}</p>
                              <p className="text-xs text-gray-300">
                                {artist.followers?.toLocaleString()} followers
                              </p>
                              <p className="text-xs text-gray-400">
                                {artist.genres?.slice(0, 2).join(', ')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Top Tracks */}
                  {results.data.topTracks && results.data.topTracks.length > 0 && (
                    <div className="bg-gray-700 rounded p-4 lg:col-span-2">
                      <h3 className="font-semibold text-green-300 mb-3">🎵 Top Tracks (Last 4 Weeks):</h3>
                      <div className="space-y-2">
                        {results.data.topTracks.slice(0, 5).map((track, index) => (
                          <div key={index} className="flex items-center space-x-3 bg-gray-600 rounded p-2">
                            <span className="text-green-400 font-bold w-6">{track.rank}</span>
                            {track.image && (
                              <img src={track.image} alt={track.name} className="w-10 h-10 rounded" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{track.name}</p>
                              <p className="text-sm text-gray-300 truncate">{track.artist}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400">{formatDuration(track.duration)}</p>
                              <p className="text-xs text-green-400">♫ {track.popularity}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Playlists */}
                  {results.data.playlists && results.data.playlists.length > 0 && (
                    <div className="bg-gray-700 rounded p-4 lg:col-span-2">
                      <h3 className="font-semibold text-green-300 mb-3">📋 Top Playlists:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {results.data.playlists.map((playlist, index) => (
                          <div key={index} className="flex items-center space-x-3 bg-gray-600 rounded p-3">
                            {playlist.image && (
                              <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{playlist.name}</p>
                              <p className="text-xs text-gray-300">
                                {playlist.trackCount} tracks • {playlist.followers} followers
                              </p>
                              <p className="text-xs text-gray-400 truncate">
                                {playlist.description || 'No description'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Track Features */}
                  {results.data.trackFeatures && (
                    <div className="bg-gray-700 rounded p-4 lg:col-span-2">
                      <h3 className="font-semibold text-green-300 mb-3">🎶 Current Track Audio Features:</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-400">{results.data.trackFeatures.danceability}%</p>
                          <p className="text-xs text-gray-300">Danceability</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-yellow-400">{results.data.trackFeatures.energy}%</p>
                          <p className="text-xs text-gray-300">Energy</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-400">{results.data.trackFeatures.valence}%</p>
                          <p className="text-xs text-gray-300">Positivity</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-400">{results.data.trackFeatures.tempo}</p>
                          <p className="text-xs text-gray-300">Tempo (BPM)</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-400">{results.data.trackFeatures.acousticness}%</p>
                          <p className="text-xs text-gray-300">Acoustic</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-pink-400">{results.data.trackFeatures.instrumentalness}%</p>
                          <p className="text-xs text-gray-300">Instrumental</p>
                        </div>
                      </div>
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
