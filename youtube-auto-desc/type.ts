export type YoutubeResponse<T> = {
   error?: { code: number };
   nextPageToken?: string;
   kind: string;
   etag: string;
   id: string;
   items: T[];
};

export type YouTubeVideo = {
   kind: 'youtube#video';
   etag: string;
   id: string;
   snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
         [key: string]: {
            url: string;
            width: number;
            height: number;
         };
      };
      channelTitle: string;
      tags: [string];
      categoryId: string;
      liveBroadcastContent: string;
      defaultLanguage: string;
      localized: {
         title: string;
         description: string;
      };
      defaultAudioLanguage: string;
   };
   contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
      regionRestriction: {
         allowed: [string];
         blocked: [string];
      };
      contentRating: {
         acbRating: string;
         agcomRating: string;
         anatelRating: string;
         bbfcRating: string;
         bfvcRating: string;
         bmukkRating: string;
         catvRating: string;
         catvfrRating: string;
         cbfcRating: string;
         cccRating: string;
         cceRating: string;
         chfilmRating: string;
         chvrsRating: string;
         cicfRating: string;
         cnaRating: string;
         cncRating: string;
         csaRating: string;
         cscfRating: string;
         czfilmRating: string;
         djctqRating: string;
         djctqRatingReasons: string[];
         ecbmctRating: string;
         eefilmRating: string;
         egfilmRating: string;
         eirinRating: string;
         fcbmRating: string;
         fcoRating: string;
         fmocRating: string;
         fpbRating: string;
         fpbRatingReasons: string[];
         fskRating: string;
         grfilmRating: string;
         icaaRating: string;
         ifcoRating: string;
         ilfilmRating: string;
         incaaRating: string;
         kfcbRating: string;
         kijkwijzerRating: string;
         kmrbRating: string;
         lsfRating: string;
         mccaaRating: string;
         mccypRating: string;
         mcstRating: string;
         mdaRating: string;
         medietilsynetRating: string;
         mekuRating: string;
         mibacRating: string;
         mocRating: string;
         moctwRating: string;
         mpaaRating: string;
         mpaatRating: string;
         mtrcbRating: string;
         nbcRating: string;
         nbcplRating: string;
         nfrcRating: string;
         nfvcbRating: string;
         nkclvRating: string;
         oflcRating: string;
         pefilmRating: string;
         rcnofRating: string;
         resorteviolenciaRating: string;
         rtcRating: string;
         rteRating: string;
         russiaRating: string;
         skfilmRating: string;
         smaisRating: string;
         smsaRating: string;
         tvpgRating: string;
         ytRating: string;
      };
      projection: string;
      hasCustomThumbnail: boolean;
   };
   status: {
      uploadStatus: string;
      failureReason: string;
      rejectionReason: string;
      privacyStatus: string;
      publishAt: string;
      license: string;
      embeddable: boolean;
      publicStatsViewable: boolean;
      madeForKids: boolean;
      selfDeclaredMadeForKids: boolean;
   };
   statistics: {
      viewCount: string;
      likeCount: string;
      dislikeCount: string;
      favoriteCount: string;
      commentCount: string;
   };
   player: {
      embedHtml: string;
      embedHeight: number;
      embedWidth: number;
   };
   topicDetails: {
      topicIds: [string];
      relevantTopicIds: [string];
      topicCategories: [string];
   };
   recordingDetails: {
      recordingDate: string;
   };
   fileDetails: {
      fileName: string;
      fileSize: number;
      fileType: string;
      container: string;
      videoStreams: [
         {
            widthPixels: number;
            heightPixels: number;
            frameRateFps: number;
            aspectRatio: number;
            codec: string;
            bitrateBps: number;
            rotation: string;
            vendor: string;
         },
      ];
      audioStreams: [
         {
            channelCount: number;
            codec: string;
            bitrateBps: number;
            vendor: string;
         },
      ];
      durationMs: number;
      bitrateBps: number;
      creationTime: string;
   };
   processingDetails: {
      processingStatus: string;
      processingProgress: {
         partsTotal: number;
         partsProcessed: number;
         timeLeftMs: number;
      };
      processingFailureReason: string;
      fileDetailsAvailability: string;
      processingIssuesAvailability: string;
      tagSuggestionsAvailability: string;
      editorSuggestionsAvailability: string;
      thumbnailsAvailability: string;
   };
   suggestions: {
      processingErrors: [string];
      processingWarnings: [string];
      processingHints: [string];
      tagSuggestions: [
         {
            tag: string;
            categoryRestricts: [string];
         },
      ];
      editorSuggestions: [string];
   };
   liveStreamingDetails: {
      actualStartTime: string;
      actualEndTime: string;
      scheduledStartTime: string;
      scheduledEndTime: string;
      concurrentViewers: number;
      activeLiveChatId: string;
   };
   localizations: {
      [key: string]: {
         title: string;
         description: string;
      };
   };
};

export type YouTubePlaylists = {
   kind: 'youtube#playlist';
   etag: string;
   id: string;
   snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
         [key: string]: {
            url: string;
            width: number;
            height: number;
         };
      };
      channelTitle: string;
      defaultLanguage: string;
      localized: {
         title: string;
         description: string;
      };
   };
   status: {
      privacyStatus: string;
   };
   contentDetails: {
      itemCount: number;
   };
   player: {
      embedHtml: string;
   };
   localizations: {
      [key: string]: {
         title: string;
         description: string;
      };
   };
};

export type YouTubePlaylistItems = {
   kind: 'youtube#playlistItem';
   etag: string;
   id: string;
   snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
         [key: string]: {
            url: string;
            width: number;
            height: number;
         };
      };
      channelTitle: string;
      videoOwnerChannelTitle: string;
      videoOwnerChannelId: string;
      playlistId: string;
      position: number;
      resourceId: {
         kind: string;
         videoId: string;
      };
   };
   contentDetails: {
      videoId: string;
      startAt: string;
      endAt: string;
      note: string;
      videoPublishedAt: string;
   };
   status: {
      privacyStatus: string;
   };
};

export type BeatmapData = {
   title: string;
   pack: string;
   releaseDate: Date;
   length: number;
   bpm: number;
   characteristic:
      | 'Standard'
      | 'One Saber'
      | 'No Arrows'
      | '360 Degree'
      | '90 Degree'
      | 'Legacy';
   difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'Expert+';
   nps: number;
   notes: { color: number; bomb: number };
   obstacles: number;
   sliders: { arc: number; chain: number };
   events: { basic: number; boost: number; rotation: number; bpm: number };
   eventGroups: {
      color: number;
      rotate: number;
      translate: number;
      vfx: number;
   };
   waypoints: number;
   keywords: number;
   njs: { value: number; offset: number };
   mappers: string;
   lighters: string;
};
