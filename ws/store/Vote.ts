import { generateId } from "../utils/helper";
import type { VoteType } from "../utils/type";

export class Vote {
  public voteId: string;
  public userId: string;
  public voteType: VoteType;
  public timestamp: number;

  constructor(userId: string, voteType: VoteType) {
    this.userId = userId;
    this.voteType = voteType;
    this.voteId = generateId(10);
    this.timestamp = Date.now();
  }
}
