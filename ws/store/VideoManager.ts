import type { VoteType } from "../utils/type";
import { Poll } from "./Poll";

export class VideoManager {
  public videoPolls: Record<string, Poll[]> = {};
  public static instance: VideoManager;

  private constructor() {}

  public static getInstance() {
    if (!VideoManager.instance) {
      VideoManager.instance = new VideoManager();
    }
    return VideoManager.instance;
  }

  getAllPolls(videoId: string) {
    const polls = this.videoPolls[videoId];
    if (!polls) return "No polls yet";
    return polls;
  }
  addPoll(videoId: string, pollContent: string) {
    const poll = new Poll(videoId, pollContent);
    let videoPolls = this.videoPolls[videoId];
    if (!videoPolls) videoPolls = [];
    videoPolls.push(poll);
  }

  vote(videoId: string, pollId: string, userId: string, voteType: VoteType) {
    this.videoPolls[videoId]
      ?.find((poll) => poll.pollId === pollId)
      ?.addVote(userId, voteType);
  }
  getPollCounts(videoId: string, pollId: string) {
    const poll = this.videoPolls[videoId]?.find(
      (poll) => poll.pollId === pollId
    );
    if (!poll) return "No poll";

    return { upvotes: poll?.upvotes, downvotes: poll?.downvotes };
  }
}
