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

const MusicSection = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [lastfmStats, setLastfmStats] = useState({ topArtist: null, topTrack: null, topAlbum: null });
  const [selectedPeriod, setSelectedPeriod] = useState('overall');
  const [loading, setLoading] = useState(false);

  const LASTFM_USERNAME = 'jjola0';

  useEffect(() => {
    loadMusicData();
  }, []);

  useEffect(() => {
    loadLastfmStats();
  }, [selectedPeriod]);

  const loadMusicData = async () => {
    setLoading(true);
    try {
      const [spotifyTrack, profile, spotifyArtists, spotifyTracks] = await Promise.all([
        getCurrentlyPlaying(),
        getUserProfile(), 
        getSpotifyTopArtists('medium_term', 15),
        getSpotifyTopTracks('medium_term', 15)
      ]);

      let displayTrack = spotifyTrack;
      if (!spotifyTrack) {
        const lastfmTrack = await getCurrentTrack(LASTFM_USERNAME);
        displayTrack = lastfmTrack;
      }

      setCurrentTrack(displayTrack);
      setUserProfile(profile);
      setTopArtists(spotifyArtists || []);
      setTopTracks(spotifyTracks || []);
      
      await loadLastfmStats();
    } catch (err) {
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

      let topAlbum = null;
      try {
        const albumData = await fetchLastFmData('user.gettopalbums', {
          user: LASTFM_USERNAME,
          period: selectedPeriod,
          limit: 1
        });
        
        const albums = albumData.topalbums?.album || [];
        if (albums.length > 0) {
          const album = albums[0];
          let image = null;
          if (album.image && Array.isArray(album.image)) {
            const imageObj = album.image.find(img => img.size === 'extralarge') ||
                            album.image.find(img => img.size === 'large') ||
                            album.image.find(img => img.size === 'medium') ||
                            album.image.find(img => img.size === 'small');
            image = imageObj?.['#text'] || null;
            if (image === '') {
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

      setLastfmStats({ topArtist, topTrack, topAlbum });
    } catch (err) {
      console.error('Error loading Last.fm stats:', err);
    }
  };

  return (
    <div className="w-full h-auto">
      <div className="grid grid-cols-12 gap-4 h-full">
        
        {/* Top Left: Rotating Vinyl - Now Playing */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col items-start justify-start">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            {currentTrack?.image ? (
              <div className={`w-full h-full rounded-full border-4 border-accent/50 overflow-hidden ${currentTrack.isPlaying ? 'animate-spin' : ''}`} style={{animationDuration: '3s'}}>
                <img 
                  src={currentTrack.image} 
                  alt="Album art" 
                  className="w-full h-full object-cover"
                />
                {/* Vinyl record center */}
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-gray-600">
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full rounded-full border-4 border-accent/50 bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
                <span className="text-3xl">🎵</span>
              </div>
            )}
          </div>
          <div className="text-left mt-3">
            <p className="text-sm text-white/60 font-light">
              {currentTrack?.isPlaying ? 'Now Playing' : 'Last Played'}
            </p>
            {currentTrack && (
              <div className="mt-1">
                <p className="text-base font-semibold text-accent">{currentTrack.name}</p>
                <p className="text-sm font-light text-white/80">{currentTrack.artist}</p>
              </div>
            )}
          </div>
        </div>

        {/* Center: Spotify Data */}
        <div className="col-span-12 md:col-span-5 lg:col-span-6">
          <div className="grid grid-cols-2 gap-3 h-full">
            
            {/* Top Artists */}
            <div className="bg-background/20 backdrop-blur-[6px] border border-accent/30 rounded-lg p-4 h-48">
              <h3 className="text-lg font-semibold text-accent mb-3">Top Artists</h3>
              <div className="space-y-2 overflow-y-auto h-32">
                {topArtists.map((artist, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm text-accent w-6 font-semibold">{index + 1}</span>
                    {artist.image && (
                      <img src={artist.image} alt={artist.name} className="w-8 h-8 rounded-full" />
                    )}
                    <p className="text-sm truncate flex-1 text-white font-light">{artist.name}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/60 mt-2 font-light">Spotify Data</p>
            </div>

            {/* Top Tracks */}
            <div className="bg-background/20 backdrop-blur-[6px] border border-accent/30 rounded-lg p-4 h-48">
              <h3 className="text-lg font-semibold text-accent mb-3">Top Tracks</h3>
              <div className="space-y-2 overflow-y-auto h-32">
                {topTracks.map((track, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm text-accent w-6 font-semibold">{index + 1}</span>
                    {track.image && (
                      <img src={track.image} alt={track.name} className="w-8 h-8 rounded" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate text-white font-light">{track.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/60 mt-2 font-light">Spotify Data</p>
            </div>
          </div>
        </div>

        {/* Right: Profile & Controls */}
        <div className="col-span-12 md:col-span-3 lg:col-span-3 flex flex-col">
          
          {/* Top: Profile */}
          <div className="text-center mb-6">
            <a 
              href={userProfile?.url || 'https://open.spotify.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-background/30 hover:opacity-80 transition-opacity">
                {userProfile?.image ? (
                  <img src={userProfile.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg">👤</div>
                )}
              </div>
            </a>
            <p className="text-base font-semibold text-accent">Jay</p>
            <p className="text-sm text-white font-light">{userProfile?.savedCount || 0} Liked Songs</p>
          </div>

          {/* Time Period Selector */}
          <div className="mb-6">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full bg-background/20 backdrop-blur-[6px] border border-accent/30 rounded px-3 py-2 text-sm text-white font-light focus:outline-none focus:border-accent"
            >
              {Object.entries(TIME_PERIODS).map(([key, label]) => (
                <option key={key} value={key} className="bg-background text-white">{label}</option>
              ))}
            </select>
          </div>

          {/* Bottom: Last.fm Stats in container */}
          <div className="bg-background/20 backdrop-blur-[6px] border border-accent/30 rounded-lg p-4">
            <div className="space-y-4">
              {/* Top Song - text only */}
              <div className="text-center">
                <p className="text-sm font-semibold text-accent">Top Song</p>
                <p className="text-sm text-white font-light truncate">{lastfmStats.topTrack?.name || 'N/A'}</p>
                <p className="text-xs text-accent font-semibold">{lastfmStats.topTrack?.playcount || 0} plays</p>
              </div>
              
              {/* Top Artist - text only */}
              <div className="text-center">
                <p className="text-sm font-semibold text-accent">Top Artist</p>
                <p className="text-sm text-white font-light truncate">{lastfmStats.topArtist?.name || 'N/A'}</p>
                <p className="text-xs text-accent font-semibold">{lastfmStats.topArtist?.playcount || 0} plays</p>
              </div>

              {/* Album - with artwork */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded overflow-hidden bg-background/30">
                  {lastfmStats.topAlbum?.image ? (
                    <img src={lastfmStats.topAlbum.image} alt="Album" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg">💿</div>
                  )}
                </div>
                <p className="text-sm font-semibold text-accent">Album</p>
                <p className="text-sm text-white font-light truncate">{lastfmStats.topAlbum?.name || 'N/A'}</p>
                <p className="text-xs text-accent font-semibold">{lastfmStats.topAlbum?.playcount || 0} plays</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MusicSection;
