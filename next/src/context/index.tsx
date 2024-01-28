'use client';

import React, { useContext, createContext } from 'react';
import {
  useAddress,
  useContract,
  useConnect,
  useContractWrite,
  metamaskWallet,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import type { ICampaign } from '../types';

export const StateContext = createContext(null as any);

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const connect = useMetamask();
  const connect = useConnect();
  const walletConfig = metamaskWallet();
  const address = useAddress();
  const { contract } = useContract(
    '0x307455Cae3d7c1c4FA8b97ed2031580Beb177CE5'
  );
  const { mutateAsync: createCampaign, isLoading } = useContractWrite(
    contract,
    'createCampaign'
  );

  // TODO types
  interface IForm {
    title: string;
    description: string;
    target: string;
    deadline: Date;
    image: string;
  }

  const publishCampaign = async (form: IForm) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });
      console.info('contract call successs', data);
    } catch (error) {
      console.error('contract call failure', error);
    }
  };

  const getCampaigns = async () => {
    // return useContractRead(contract, 'getCampaigns');
    if (!contract) {
      return [];
    }
    const data = await contract.call('getCampaigns');
    console.log('getCampaigns:', data);
    const campaigns: ICampaign[] = data.map(
      (campaign: ICampaign, i: number) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: parseInt(campaign.deadline._hex),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        _id: i,
      })
    );

    return campaigns.reverse();
  };

  const getUserCampaigns = async () => {
    if (!contract) {
      return [];
    }
    const campaigns = await getCampaigns();
    const filteredCampaigns = campaigns.filter((campaign: ICampaign) => {
      return campaign.owner === address;
    });
    return filteredCampaigns;
  };

  const donate = async (_id: number, amount: string) => {
    try {
      if (!contract) {
        return null;
      }
      const data = await contract.call('donateToCampaign', [_id], {
        value: ethers.utils.parseEther(amount),
      });
      return data;
    } catch (error) {
      console.log('donate error', error);
    }
  };
  const getDonations = async (_id: number) => {
    try {
      if (!contract) {
        return [];
      }
      const donations = await contract?.call('getDonaters', [_id]);
      const numberOfDonations = donations[0].length;
      let parsedDonations = [];

      for (let index = 0; index < numberOfDonations; index++) {
        parsedDonations.push({
          donator: donations[0][index],
          donation: ethers.utils.formatEther(donations[1][index.toString()]),
        });
      }

      return parsedDonations;
    } catch (error) {
      console.log('getDonations error', error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        walletConfig,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
