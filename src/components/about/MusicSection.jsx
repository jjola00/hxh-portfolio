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
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
      {/* TOP ROW */}
      <div className="grid grid-cols-12 gap-4 mb-8">
        
        {/* Top Left: Rotating Vinyl - Now Playing */}
        <div className="col-span-12 md:col-span-4 flex flex-col items-start justify-start">
          <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 ml-2 md:ml-4">
            {currentTrack?.image ? (
              <div className={`w-full h-full rounded-full border-4 border-[#FEFE5B]/50 overflow-hidden ${currentTrack.isPlaying ? 'animate-spin' : ''}`} style={{animationDuration: '3s'}}>
                <img 
                  src={currentTrack.image} 
                  alt="Album art" 
                  className="w-full h-full object-cover"
                />
                {/* Vinyl record center */}
                <div className="absolute top-1/2 left-1/2 w-8 h-8 md:w-12 md:h-12 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-gray-600">
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 md:w-4 md:h-4 bg-gray-800 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full rounded-full border-4 border-[#FEFE5B]/50 bg-gradient-to-br from-[#FEFE5B]/20 to-[#FEFE5B]/40 flex items-center justify-center">
                <span className="text-4xl md:text-6xl">🎵</span>
              </div>
            )}
          </div>
          <div className="text-center mt-4">
            <p className="text-xs sm:text-sm md:text-base text-white">
              {currentTrack?.isPlaying ? 'Now Playing' : 'Last Played'}
            </p>
            {currentTrack && (
              <div className="mt-2">
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold" style={{color: '#FEFE5B'}}>{currentTrack.name}</p>
                <p className="text-lg sm:text-xl md:text-2xl text-white">{currentTrack.artist}</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Center: Spotify Data - Side by Side */}
        <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-4">
          
          {/* Top Artists */}
          <div className="h-80">
            <h3 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-semibold" style={{color: '#FEFE5B'}}>Top Artists</h3>
            <div className="h-64 overflow-hidden relative">
              <div className="animate-scroll">
                {[...topArtists, ...topArtists].map((artist, index) => (
                  <div key={`artist-${index}`} className="flex items-center space-x-3 py-2 whitespace-nowrap">
                    <span className="text-base w-8" style={{color: '#FEFE5B'}}>{(index % topArtists.length) + 1}</span>
                    {artist.image && (
                      <img src={artist.image} alt={artist.name} className="w-10 h-10 rounded-full" />
                    )}
                    <p className="text-base text-white truncate">{artist.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Tracks */}
          <div className="h-80">
            <h3 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-semibold" style={{color: '#FEFE5B'}}>Top Tracks</h3>
            <div className="h-64 overflow-hidden relative">
              <div className="animate-scroll">
                {[...topTracks, ...topTracks].map((track, index) => (
                  <div key={`track-${index}`} className="flex items-center space-x-3 py-2 whitespace-nowrap">
                    <span className="text-base w-8" style={{color: '#FEFE5B'}}>{(index % topTracks.length) + 1}</span>
                    {track.image && (
                      <img src={track.image} alt={track.name} className="w-10 h-10 rounded" />
                    )}
                    <p className="text-base text-white truncate">{track.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Right: Profile */}
        <div className="col-span-12 md:col-span-4 flex flex-col items-end justify-start">
          <div className="text-center mb-6">
            <a 
              href={userProfile?.url || 'https://open.spotify.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-3 rounded-full overflow-hidden bg-background/30 hover:opacity-80 transition-opacity">
                {userProfile?.image ? (
                  <img src={userProfile.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
                )}
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex flex-col items-center justify-center mt-8">
        
        {/* Time Period Selector */}
        <div className="mb-6 w-48">
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

        {/* Stats Row - All on same line */}
        <div className="grid grid-cols-3 gap-12 text-center items-end">
          {/* Top Song - Smaller */}
          <div>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold" style={{color: '#FEFE5B'}}>Top Song</p>
            <p className="text-sm sm:text-base md:text-lg text-white truncate">{lastfmStats.topTrack?.name || 'N/A'}</p>
            <p className="text-xs sm:text-sm" style={{color: '#FEFE5B'}}>{lastfmStats.topTrack?.playcount || 0} plays</p>
          </div>
          
          {/* Top Artist - Smaller */}
          <div>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold" style={{color: '#FEFE5B'}}>Top Artist</p>
            <p className="text-sm sm:text-base md:text-lg text-white truncate">{lastfmStats.topArtist?.name || 'N/A'}</p>
            <p className="text-xs sm:text-sm" style={{color: '#FEFE5B'}}>{lastfmStats.topArtist?.playcount || 0} plays</p>
          </div>

          {/* Album - Larger with artwork */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded overflow-hidden bg-background/30 mb-3">
              {lastfmStats.topAlbum?.image ? (
                <img src={lastfmStats.topAlbum.image} alt="Album" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">💿</div>
              )}
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold" style={{color: '#FEFE5B'}}>Album</p>
            <p className="text-lg sm:text-xl md:text-2xl text-white truncate">{lastfmStats.topAlbum?.name || 'N/A'}</p>
            <p className="text-base sm:text-lg" style={{color: '#FEFE5B'}}>{lastfmStats.topAlbum?.playcount || 0} plays</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MusicSection;
