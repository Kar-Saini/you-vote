import type { VoteType } from "../utils/type";
import { Poll } from "./Poll";

export class VideoManager {
  public polls: Poll[] = [];
  public static instance: VideoManager;

  private constructor() {}

  public static getInstance() {
    if (!VideoManager.instance) {
      VideoManager.instance = new VideoManager();
    }
    return VideoManager.instance;
  }

  addPoll(videoId: string, pollContent: string) {
    const poll = new Poll(videoId, pollContent);
    this.polls.push(poll);
    return poll.pollId;
  }

  getAllPolls(videoId: string) {
    const polls = this.polls.map((poll) => poll.videoId === videoId);
    return polls;
  }

  vote(pollId: string, userId: string, voteType: VoteType) {
    this.polls.forEach((poll) => {
      if (poll.pollId === pollId) poll.addVote(userId, voteType);
    });
  }
  getPollCounts(pollId: string) {
    const poll = this.polls.find((poll) => poll.pollId === pollId);
    if (!poll) return "Invalid Poll ID";
    return { upvotes: poll.upvotes, downvotes: poll.downvotes };
  }
}
