import React, { Dispatch, SetStateAction } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import './style.scss';
import { IInformation } from '../../../interface';

interface Iprops {
  commonCampaign: IInformation;
  setCommonCampain: Dispatch<SetStateAction<IInformation>>;
}

interface IListInput {
  label: string;
  id: string
  error?: boolean;
  helperText?: string;
  name: string
}

const styleTextField = {
  backgroundColor: 'white',
  padding: 0,
};

function Information(props: Iprops) {
  const { setCommonCampain, commonCampaign } = props;

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
      error: true,
      helperText: 'Dữ liệu không hợp lệ',
      name: 'name',
    },
    {
      label: 'Mô tả',
      id: 'outlined-basic',
      error: false,
      name: 'describe',
    },
  ];

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
            onChange={(e) => (handleChangeInput(item.name, e))}
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
