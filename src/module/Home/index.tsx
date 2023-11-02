import React, { useState } from 'react';
import './style.scss';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button } from '@mui/material';
import Campaign from './components/Campain';
import Information from './components/Information';

function Home() {
  const [value, setValue] = useState<string>('1');
  const [commonCampaign, setCommonCampain] = useState<string | null>(null);

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
              <Tab label="THÔNG TIN" value="1" />
              <Tab label="CHIẾN DỊCH CON" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" style={{ padding: 0 }}><Information setCommonCampain={setCommonCampain} /></TabPanel>
          <TabPanel value="2" style={{ padding: 0 }}><Campaign /></TabPanel>
        </TabContext>
      </div>
    </div>
  );
}

export default Home;
