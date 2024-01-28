import { loader } from '../../public/assets';
import { CampaignCard } from '.';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ICampaign } from '../types';

interface ICampaignList {
  title: string;
  isLoading?: boolean;
  campaigns: ICampaign[];
}

const CampaignList = ({ title, isLoading, campaigns }: ICampaignList) => {
  const router = useRouter();

  const handleNavigate = (campaign: ICampaign) => {
    router.push(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className='font-semibold text-[18px] text-left'>{`${title} ${
        campaigns && campaigns.length
      }`}</h1>

      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <Image
            src={loader}
            alt='loader'
            className='w-[100px] h-[100px] object-contain'
          />
        )}
        {/* {isLoading && <Loader />} */}
        {!isLoading && campaigns?.length === 0 && (
          <p className='font-semibold text-[14px] leading-[30px] text-[#818183]'>
            You have not created any campaign yet
          </p>
        )}

        {!isLoading &&
          campaigns?.length > 0 &&
          campaigns.map((campaign: ICampaign, index: number) => (
            <CampaignCard
              key={index}
              {...campaign}
              handleClick={() => {
                handleNavigate(campaign);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default CampaignList;
