export type INCOMING_MESSAGE =
  | {
      type: "polls";
      payload: unknown;
    }
  | {
      type: "connection";
      payload: string;
    };
export type OUTGOING_MESSAGE =
  | {
      type: "get-polls";
      payload: { videoId: string };
    }
  | {
      type: "create-poll";
      payload: { videoId: string; pollContent: string };
    }
  | {
      type: "vote";
      payload: {
        videoId: string;
        pollId: string;
        userId: string;
        voteType: "upvote" | "downvote";
      };
    }
  | {
      type: "get-poll-count";
      payload: { videoId: string; pollId: string };
    };
