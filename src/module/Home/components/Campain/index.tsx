import React, { Dispatch, SetStateAction, useState } from 'react';
import './style.scss';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Button, Checkbox, FormControlLabel, Input, TextField,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { IListSubCompaign, initTialValueCampaign } from '../../index';

const ariaLabel = { 'aria-label': 'description' };

interface IProps {
  listSubCampaign: IListSubCompaign[];
  setListSubCampagin: Dispatch<SetStateAction<IListSubCompaign[]>>;
}

function Campaign(props: IProps) {
  const { listSubCampaign, setListSubCampagin } = props;
  const [campaignSelected, setCampainSelected] = useState<IListSubCompaign>(initTialValueCampaign);

  const columns: GridColDef[] = [
    {
      field: 'nameAdvertise',
      headerName: 'Tên quảng cáo*',
      flex: 1,
      renderCell: () => (
        <Input fullWidth inputProps={ariaLabel} />
      ),
    },
    {
      field: 'Số lượng*',
      headerName: 'First name',
      flex: 1,
      renderCell: () => (
        <Input fullWidth inputProps={ariaLabel} />
      ),
    },
    {
      field: '',
      headerName: '',
      width: 170,
      cellClassName: 'actions',
      align: 'right',
      renderHeader: () => (
        <div style={{
          textAlign: 'right',
        }}
        >
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Delete
          </Button>
        </div>
      ),
      renderCell: () => (
        <div style={{
          width: '100%',
          fontSize: 14,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        >
          <DeleteIcon />
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1, nameAdvertise: 'Snow', firstName: 'Jon', age: 35,
    },
  ];

  console.log(campaignSelected);
  const handleClickCampaign = (item: IListSubCompaign):void => {
    setCampainSelected(item);
  };

  const onChangeNameSubCampaign = (value: any): void => {
    console.log('value', value.target.value);
    setCampainSelected({ ...campaignSelected, name: value.target.value });
  };

  const handleAddCampaign = (): void => {
    const NewObject: IListSubCompaign = {
      name: `Chiến dịch ${listSubCampaign.length + 1}`,
      status: true,
      ads: [{
        name: '',
        quantity: 3,
      }],
    };
    setListSubCampagin([...listSubCampaign, NewObject]);
  };

  const totalQuantity = (data: any) => {
    // eslint-disable-next-line no-shadow
    let totalQuantity = 0;
    // eslint-disable-next-line no-return-assign
    data.forEach((item: any) => totalQuantity += item.quantity);

    return totalQuantity;
  };
  console.log('listCampaign', listSubCampaign);

  return (
    <div className="campaign-container">
      <div className="list-campaign">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button tabIndex={0} type="button" className="button-add-campaign" onClick={handleAddCampaign}>
          <AddIcon style={{ color: 'red' }} />
        </button>
        <div className="list-item-campaign">
          {listSubCampaign.map((item: IListSubCompaign) => (
            // eslint-disable-next-line react/button-has-type
            <button onClick={() => handleClickCampaign(item)} className="item-campaign">
              <div className="title">
                <p>{item.name}</p>
                <CheckCircleIcon style={{ color: 'green', fontSize: 14 }} />
              </div>
              <div className="quantity">
                {totalQuantity(item.ads)}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="child-campaign">
        <div className="input">
          <TextField
            id="outlined-basic"
            label="Tên chiến dịch con *"
            variant="filled"
            fullWidth
            InputProps={{
              style: {
                backgroundColor: 'white',
              },
            }}
            value={campaignSelected?.name}
            onChange={(e) => onChangeNameSubCampaign(e)}
          />
        </div>
        <div className="isActive">
          <FormControlLabel control={<Checkbox defaultChecked />} label="Đang hoạt động" />
        </div>
      </div>
      <div className="list-advertise">
        <span>DANH SÁCH QUẢNG CÁO</span>
        <div className="list">
          <DataGrid
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            getCellClassName={() => 'hot'}
            rowHeight={65}
            rows={rows}
            columns={columns}
            hideFooter
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}

export default Campaign;
