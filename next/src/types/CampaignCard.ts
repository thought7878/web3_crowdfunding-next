import type { ICampaign } from '.';

export default interface ICampaignCard extends ICampaign {
  // owner: string;
  // title: string;
  // description: string;
  // target: string;
  // deadline: number;
  // amountCollected: number;
  // image: string;
  handleClick: () => void;
}
