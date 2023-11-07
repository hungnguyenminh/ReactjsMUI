import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import './style.scss';
import { IInformation } from '../../../interface';

interface Iprops {
  isValidate: boolean;
  validateNameCampagin: boolean;
  commonCampaign: IInformation;
  setCommonCampain: Dispatch<SetStateAction<IInformation>>;
  setValidateNameCampaign: any;

}

interface IListInput {
  label: string;
  id: string
  error?: boolean;
  helperText?: string;
  name: string;
  value?: string;
}

const styleTextField = {
  backgroundColor: 'white',
  padding: 0,
};

function Information(props: Iprops) {
  const {
    setCommonCampain, commonCampaign, isValidate, validateNameCampagin, setValidateNameCampaign,
  } = props;

  console.log('validateNameCampagin', validateNameCampagin);
  const handleChangeInput = (nameCampaign: string, value?: any): void => {
    setCommonCampain({
      name: nameCampaign === 'name' ? value.target.value : commonCampaign.name,
      describe: nameCampaign === 'describe' ? value.target.value : commonCampaign.describe,
    });
  };

  const listInput: IListInput[] = [
    {
      label: 'Tên chiến dịch *',
      id: 'outlined-basic',
      error: !validateNameCampagin,
      helperText: validateNameCampagin ? '' : 'Dữ liệu không hợp lệ',
      name: 'name',
      value: commonCampaign.name,
    },
    {
      label: 'Mô tả',
      id: 'outlined-basic',
      error: false,
      name: 'describe',
      value: commonCampaign.describe,
    },
  ];

  useEffect(() => {

  }, [validateNameCampagin]);

  return (
    <div className="information-container">
      {listInput.map((item, index: number) => (
        <Box tabIndex={index} sx={{ mb: 3 }}>
          <TextField
            error={item.error}
            helperText={item.helperText}
            id="outlined-basic"
            label={item.label}
            variant="filled"
            value={item.value}
            onChange={(e) => {
              handleChangeInput(item.name, e);
              setValidateNameCampaign(isValidate && e.target.value.length > 0);
            }}
            fullWidth
            InputProps={{
              style: styleTextField,
            }}
          />
        </Box>
      ))}
    </div>
  );
}

export default Information;
