import React, { Dispatch, SetStateAction } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import './style.scss';

interface Iprops {
  setCommonCampain: Dispatch<SetStateAction<string | null>>;
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
  const { setCommonCampain } = props;

  const handleChangeInput = (nameCampaign: string, value?: any): void => {
    setCommonCampain('ss');
    console.log('name', nameCampaign);
    console.log('value: ', value.target.value);
  };

  const listInput: IListInput[] = [
    {
      label: 'Tên chiến dịch *',
      id: 'outlined-basic',
      error: true,
      helperText: 'Dữ liệu không hợp lệ',
      name: 'nameCampaign',
    },
    {
      label: 'Mô tả',
      id: 'outlined-basic',
      error: false,
      name: 'description',
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
