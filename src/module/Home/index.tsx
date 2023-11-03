import React, { useState } from 'react';
import './style.scss';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button } from '@mui/material';
import Campaign from './components/Campain';
import Information from './components/Information';

export interface IInformation {
  name: string;
  describe: string;
}

export interface IListSubCompaign {
  name: string;
  status: boolean
  ads: {
    name: string,
    quantity: number
  }[]
}

export const initTialValueCampaign: IListSubCompaign = {
  name: 'Chiến dịch 1',
  status: true,
  ads: [
    {
      name: '',
      quantity: 8,
    },
  ],
};

function Home() {
  const [value, setValue] = useState<string>('1');
  const [commonCampaign, setCommonCampain] = useState<IInformation>({
    name: '',
    describe: '',
  });
  const [listSubCampaign, setListSubCampagin] = useState<IListSubCompaign[]>([
    initTialValueCampaign,
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  console.log('commonCampaign', commonCampaign);

  return (
    <div className="home-container">
      <div className="button-submit">
        <Button color="primary" variant="contained">Submit</Button>
      </div>
      <div className="tab-campaign">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab className="customTab" label="THÔNG TIN" value="1" />
              <Tab className="customTab" label="CHIẾN DỊCH CON" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" style={{ padding: 0 }}><Information commonCampaign={commonCampaign} setCommonCampain={setCommonCampain} /></TabPanel>
          <TabPanel value="2" style={{ padding: 0 }}><Campaign listSubCampaign={listSubCampaign} setListSubCampagin={setListSubCampagin} /></TabPanel>
        </TabContext>
      </div>
    </div>
  );
}

export default Home;
