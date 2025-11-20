import { generateId } from "../utils/helper";
import { VoteType } from "../utils/type";
import { Vote } from "./Vote";

export class Poll {
  public pollId: string;
  public videoId: string;
  public pollContent: string;
  public votes: Vote[];
  public upvotes: number;
  public downvotes: number;
  public timestamp: number;

  constructor(videoId: string, pollContent: string) {
    this.pollId = generateId(15);
    this.videoId = videoId;
    this.pollContent = pollContent;
    this.votes = [];
    this.downvotes = 0;
    this.upvotes = 0;
    this.timestamp = Date.now();
  }

  addVote(userId: string, voteType: VoteType) {
    let existing = this.votes.find((vote) => vote.userId === userId);
    if (existing) {
      if (existing.voteType === voteType) {
        this.votes = this.votes.filter((vote) => vote.userId !== userId);
        if (existing.voteType === VoteType.Downvote) this.downvotes--;
        else this.upvotes--;
        return;
      } else {
        if (existing.voteType === VoteType.Downvote) this.downvotes--;
        else this.upvotes--;
        existing.voteType = voteType;

        if (existing.voteType === VoteType.Downvote) this.downvotes++;
        else this.upvotes++;
        return;
      }
    }
    const vote = new Vote(userId, voteType);
    this.votes.push(vote);

    if (voteType === VoteType.Upvote) this.upvotes++;
    else this.downvotes++;
  }
}
