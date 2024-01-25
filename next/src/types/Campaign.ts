export default interface ICampaign {
  owner: string;
  title: string;
  description?: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  _id: number;
}
