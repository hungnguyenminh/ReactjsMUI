import React, { useState } from 'react';
import './style.scss';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button } from '@mui/material';
import Campaign from './components/Campain';
import Information from './components/Information';
import { IInformation, IListSubCompaign } from '../interface';

export const initTialValueCampaign: IListSubCompaign = {
  id: 1,
  name: 'Chiến dịch 1',
  status: true,
  ads: [
    {
      id: 1,
      name: 'Quảng cáo 1',
      quantity: 0,
    },
  ],
};

function Home() {
  const [validateNameCampagin, setValidateNameCampaign] = useState<boolean>(true);
  const [validateSubCampaign, setValidateSubCampaign] = useState<boolean>(true);

  const [isValidate, setIsValidate] = useState<boolean>(false);

  const [value, setValue] = useState<string>('1');

  const [commonCampaign, setCommonCampain] = useState<IInformation>({
    name: '',
    describe: '',
  });
  const [listSubCampaign, setListSubCampagin] = useState<IListSubCompaign[]>([
    initTialValueCampaign,
  ]);

  const handleSubmit = (): void => {
    setIsValidate(true);

    if (commonCampaign.name.length === 0) {
      setValidateNameCampaign(false);
      alert('Vui lòng điền đúng và đầy đủ thông tin!');
      return;
    }

    // listSubCampaign.forEach((item) => {
    //   if(item.name.length)
    // })

    if (validateSubCampaign === false) {
      alert('Vui lòng điền đúng và đầy đủ thông tin!');
      return;
    }

    const Object = { campaign: commonCampaign, subCampaigns: listSubCampaign };

    const textSucess = `Thêm thành công chiến dịch \n ${JSON.stringify(Object)}`;
    alert(textSucess);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="home-container">
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        onClick={() => {
          handleSubmit();
        }}
        className="button-submit"
      >
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
          <TabPanel value="1" style={{ padding: 0 }}>
            <Information
              isValidate={isValidate}
              validateNameCampagin={validateNameCampagin}
              setValidateNameCampaign={setValidateNameCampaign}
              commonCampaign={commonCampaign}
              setCommonCampain={setCommonCampain}
            />
          </TabPanel>
          <TabPanel value="2" style={{ padding: 0 }}>
            <Campaign
              validateSubCampaign={validateSubCampaign}
              isValidate={isValidate}
              listSubCampaign={listSubCampaign}
              setListSubCampagin={setListSubCampagin}
              setValidateSubCampaign={setValidateSubCampaign}
            />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}

export default Home;
