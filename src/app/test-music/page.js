"use client";

import { useState, useEffect } from 'react';
import { getCurrentlyPlaying, getUserProfile, getTopArtists as getSpotifyTopArtists, getTopTracks as getSpotifyTopTracks } from '@/services/spotify';
import { getCurrentTrack, getTopArtists as getLastfmTopArtists, getTopTracks as getLastfmTopTracks, fetchLastFmData } from '@/services/lastfm';

const TIME_PERIODS = {
  '7day': 'Last 7 Days',
  '1month': 'Last Month', 
  '3month': 'Last 3 Months',
  '6month': 'Last 6 Months',
  '12month': 'Last Year',
  'overall': 'All Time'
};

export default function MusicTest() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [lastfmStats, setLastfmStats] = useState({ topArtist: null, topTrack: null, topAlbum: null });
  const [selectedPeriod, setSelectedPeriod] = useState('1month');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const LASTFM_USERNAME = 'jjola0';

  useEffect(() => {
    loadMusicData();
  }, []);

  useEffect(() => {
    loadLastfmStats();
  }, [selectedPeriod]);

  useEffect(() => {
    // Update progress bar every second if track is playing
    let interval = null;
    if (currentTrack?.isPlaying && currentTrack.progress !== undefined && currentTrack.duration) {
      setProgress(currentTrack.progress);
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1000; // Add 1 second
          return newProgress >= currentTrack.duration ? currentTrack.duration : newProgress;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentTrack]);

  const loadMusicData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Load Spotify data and current track in parallel
      const [spotifyTrack, profile, spotifyArtists, spotifyTracks] = await Promise.all([
        getCurrentlyPlaying(),
        getUserProfile(), 
        getSpotifyTopArtists('medium_term', 10), // ~6 months
        getSpotifyTopTracks('medium_term', 10)   // ~6 months
      ]);

      // If no Spotify track, try Last.fm recent track
      let displayTrack = spotifyTrack;
      if (!spotifyTrack) {
        const lastfmTrack = await getCurrentTrack(LASTFM_USERNAME);
        displayTrack = lastfmTrack;
      }

      setCurrentTrack(displayTrack);
      setUserProfile(profile);
      setTopArtists(spotifyArtists || []);
      setTopTracks(spotifyTracks || []);
      
      // Load Last.fm stats separately
      await loadLastfmStats();
      
      // Set initial progress for Spotify tracks
      if (spotifyTrack?.progress) {
        setProgress(spotifyTrack.progress);
      } else {
        setProgress(0);
      }

    } catch (err) {
      setError(err.message);
      console.error('Music data loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadLastfmStats = async () => {
    try {
      const [artists, tracks] = await Promise.all([
        getLastfmTopArtists(LASTFM_USERNAME, selectedPeriod, 1),
        getLastfmTopTracks(LASTFM_USERNAME, selectedPeriod, 1)
      ]);

      const topArtist = artists[0] || null;
      const topTrack = tracks[0] || null;

      // Debug logging
      console.log('Last.fm Top Artist:', topArtist);
      console.log('Last.fm Top Track:', topTrack);

      // Get top albums from Last.fm
      let topAlbum = null;
      try {
        const albumData = await fetchLastFmData('user.gettopalbums', {
          user: LASTFM_USERNAME,
          period: selectedPeriod,
          limit: 1
        });
        
        console.log('Last.fm Album Data:', albumData);
        
        const albums = albumData.topalbums?.album || [];
        if (albums.length > 0) {
          const album = albums[0];
          console.log('Raw Album Object:', album);
          
          let image = null;
          if (album.image && Array.isArray(album.image)) {
            console.log('Album Images Array:', album.image);
            const imageObj = album.image.find(img => img.size === 'extralarge') ||
                            album.image.find(img => img.size === 'large') ||
                            album.image.find(img => img.size === 'medium') ||
                            album.image.find(img => img.size === 'small');
            console.log('Selected Image Object:', imageObj);
            image = imageObj?.['#text'] || null;
            if (image === '' || image === 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png') {
              image = null;
            }
          }
          
          topAlbum = {
            name: album.name,
            artist: album.artist?.name || album.artist?.['#text'] || album.artist,
            playcount: parseInt(album.playcount),
            image: image,
            url: album.url
          };
        }
      } catch (albumError) {
        console.error('Error fetching top albums:', albumError);
      }

      console.log('Final Last.fm Stats:', { topArtist, topTrack, topAlbum });

      setLastfmStats({
        topArtist,
        topTrack,
        topAlbum
      });
    } catch (err) {
      console.error('Error loading Last.fm stats:', err);
    }
  };

  const formatDuration = (ms) => {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatProgress = (current, total) => {
    return `${formatDuration(current)} / ${formatDuration(total)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🎵 Music Dashboard</h1>
        
        <button
          onClick={loadMusicData}
          disabled={loading}
          className="mb-6 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50 transition-colors"
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>

        {error && (
          <div className="bg-red-800 border border-red-600 rounded-lg p-4 mb-6">
            <p className="text-red-100">Error: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Now Playing */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-400">🎧 Now Playing</h2>
            {currentTrack ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {currentTrack.image && (
                    <div className="relative">
                      <img 
                        src={currentTrack.image} 
                        alt="Album art" 
                        className={`w-16 h-16 rounded shadow-lg ${
                          currentTrack.isPlaying ? 'animate-pulse' : ''
                        }`}
                      />
                      {currentTrack.isPlaying && (
                        <div className="absolute inset-0 bg-green-400 opacity-20 rounded animate-ping"></div>
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-lg truncate">{currentTrack.name}</p>
                    <p className="text-gray-300 truncate">{currentTrack.artist}</p>
                    <p className="text-gray-400 text-sm truncate">{currentTrack.album}</p>
                    <p className="text-green-400 text-sm mt-1 flex items-center">
                      {currentTrack.isPlaying ? (
                        <>
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                          Playing
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          Last Played
                        </>
                      )}
                      {currentTrack.device && (
                        <span className="ml-2 text-gray-400">• {currentTrack.device}</span>
                      )}
                    </p>
                  </div>
                </div>
                
                {/* Progress Bar - only show for Spotify tracks with progress */}
                {currentTrack.duration && (
                  <div className="space-y-2">
                    <div className="bg-gray-600 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          currentTrack.isPlaying ? 'bg-green-400' : 'bg-gray-400'
                        }`}
                        style={{ 
                          width: `${Math.min(((progress || currentTrack.progress || 0) / currentTrack.duration) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 text-center">
                      {formatProgress(progress || currentTrack.progress || 0, currentTrack.duration)}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎵</div>
                  <p>No track currently playing</p>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-400">👤 Profile</h2>
            {userProfile ? (
              <div className="flex items-center space-x-4">
                {userProfile.image && (
                  <img 
                    src={userProfile.image} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full shadow-lg"
                  />
                )}
                <div>
                  <p className="font-medium text-lg">{userProfile.displayName}</p>
                  <p className="text-green-400 flex items-center">
                    <span className="mr-2">❤️</span>
                    {userProfile.savedCount?.toLocaleString() || 0} liked songs
                  </p>
                  <p className="text-gray-400 text-sm">
                    {userProfile.product} • {userProfile.country}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">👤</div>
                  <p>Profile data not available</p>
                </div>
              </div>
            )}
          </div>

          {/* Top Artists */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-400">🎤 Top Artists</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {topArtists.length > 0 ? (
                topArtists.map((artist, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-700 rounded p-3 hover:bg-gray-600 transition-colors">
                    <span className="text-green-400 font-bold w-6 text-center">{index + 1}</span>
                    {artist.image && (
                      <img 
                        src={artist.image} 
                        alt={artist.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{artist.name}</p>
                      <p className="text-sm text-gray-300">
                        {artist.popularity}% popularity • {artist.followers?.toLocaleString() || 0} followers
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-32 text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎤</div>
                    <p>No artists data available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Top Tracks */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-400">🎵 Top Tracks</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {topTracks.length > 0 ? (
                topTracks.map((track, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-700 rounded p-3 hover:bg-gray-600 transition-colors">
                    <span className="text-green-400 font-bold w-6 text-center">{index + 1}</span>
                    {track.image && (
                      <img 
                        src={track.image} 
                        alt={track.name} 
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{track.name}</p>
                      <p className="text-sm text-gray-300 truncate">{track.artist}</p>
                      <p className="text-xs text-gray-400 truncate">{track.album}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-32 text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎵</div>
                    <p>No tracks data available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Last.fm Stats */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-green-400">📊 Top Stats</h2>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-gray-700 text-white rounded px-3 py-1 text-sm border border-gray-600 focus:border-green-400 focus:outline-none"
            >
              {Object.entries(TIME_PERIODS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Artist */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">🎤</span>
                <h3 className="font-semibold text-green-400">Top Artist</h3>
              </div>
              {lastfmStats.topArtist ? (
                <div className="flex items-center space-x-3">
                  {lastfmStats.topArtist.image && lastfmStats.topArtist.image !== '' ? (
                    <img 
                      src={lastfmStats.topArtist.image} 
                      alt={lastfmStats.topArtist.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        console.log('Artist image failed to load:', e.target.src);
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold ${
                      lastfmStats.topArtist.image && lastfmStats.topArtist.image !== '' ? 'hidden' : 'flex'
                    }`}
                  >
                    {lastfmStats.topArtist.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{lastfmStats.topArtist.name}</p>
                    <p className="text-sm text-gray-300">{lastfmStats.topArtist.playcount.toLocaleString()} plays</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>

            {/* Top Track */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">🎵</span>
                <h3 className="font-semibold text-green-400">Top Track</h3>
              </div>
              {lastfmStats.topTrack ? (
                <div className="flex items-center space-x-3">
                  {lastfmStats.topTrack.image && lastfmStats.topTrack.image !== '' ? (
                    <img 
                      src={lastfmStats.topTrack.image} 
                      alt={lastfmStats.topTrack.name}
                      className="w-12 h-12 rounded object-cover"
                      onError={(e) => {
                        console.log('Track image failed to load:', e.target.src);
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-12 h-12 rounded bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm ${
                      lastfmStats.topTrack.image && lastfmStats.topTrack.image !== '' ? 'hidden' : 'flex'
                    }`}
                  >
                    {lastfmStats.topTrack.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{lastfmStats.topTrack.name}</p>
                    <p className="text-sm text-gray-300 truncate">{lastfmStats.topTrack.artist}</p>
                    <p className="text-xs text-gray-400">{lastfmStats.topTrack.playcount.toLocaleString()} plays</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>

            {/* Top Album */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">💿</span>
                <h3 className="font-semibold text-green-400">Top Album</h3>
              </div>
              {lastfmStats.topAlbum ? (
                <div className="flex items-center space-x-3">
                  {lastfmStats.topAlbum.image && lastfmStats.topAlbum.image !== '' ? (
                    <img 
                      src={lastfmStats.topAlbum.image} 
                      alt={lastfmStats.topAlbum.name}
                      className="w-12 h-12 rounded object-cover"
                      onError={(e) => {
                        console.log('Album image failed to load:', e.target.src);
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-12 h-12 rounded bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm ${
                      lastfmStats.topAlbum.image && lastfmStats.topAlbum.image !== '' ? 'hidden' : 'flex'
                    }`}
                  >
                    {lastfmStats.topAlbum.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{lastfmStats.topAlbum.name}</p>
                    <p className="text-sm text-gray-300 truncate">{lastfmStats.topAlbum.artist}</p>
                    <p className="text-xs text-gray-400">{lastfmStats.topAlbum.playcount.toLocaleString()} plays</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Data Source Info */}
        <div className="mt-8 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-green-400">📊 Data Sources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-300">Spotify API:</p>
              <ul className="text-gray-400 ml-4">
                <li>• Currently playing track</li>
                <li>• User profile & liked songs</li>
                <li>• Real-time progress tracking</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-300">Last.fm API:</p>
              <ul className="text-gray-400 ml-4">
                <li>• Top artists with play counts</li>
                <li>• Top tracks with play counts</li>
                <li>• Historical listening data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
