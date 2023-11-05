import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import './style.scss';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Button, Checkbox, FormControlLabel, TextField,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { IListSubCompaign, initTialValueCampaign } from '../../index';

interface IProps {
  listSubCampaign: IListSubCompaign[];
  setListSubCampagin: Dispatch<SetStateAction<IListSubCompaign[]>>;
}

interface IRowDataGrid {
  id: number;
  name: string;
  quantity:number;
}

function Campaign(props: IProps) {
  const { listSubCampaign, setListSubCampagin } = props;
  const [campaignSelected, setCampaignSelected] = useState<IListSubCompaign>(initTialValueCampaign);
  // const [arrayAdvertise, setArrayAdvertise] = useState<any>({
  //   id: 1,
  //   name: '',
  //   quantity: 2,
  // });
  // // console.log(campaignSelected);

  console.log('listSubCampaign', listSubCampaign);
  // console.log('campaignSelected', campaignSelected);
  const handleClickCampaign = (valueItem: IListSubCompaign):void => {
    setCampaignSelected(valueItem);
  };

  const handleUpdateListSubCampaign = (inputValue: any, type: 'name' | 'status'): void => {
    const newArray = [...listSubCampaign];

    // eslint-disable-next-line max-len
    const findIndex = newArray.findIndex((item: IListSubCompaign) => item.name === campaignSelected.name);

    const newObject = {
      name: type === 'name' ? inputValue : newArray[findIndex].name,
      status: type === 'status' ? inputValue : newArray[findIndex].status,
      ads: newArray[findIndex].ads,
    };

    newArray[findIndex] = newObject;

    if (findIndex !== -1) {
      setListSubCampagin(newArray);
    }
  };

  const onChangeCheckbox = (e: any): void => {
    console.log('ee', e.target.checked);
    setCampaignSelected({ ...campaignSelected, status: e.target.checked });
    handleUpdateListSubCampaign(e.target.checked, 'status');
  };

  const onChangeNameSubCampaign = (value: any): void => {
    setCampaignSelected({ ...campaignSelected, name: value.target.value });
    // eslint-disable-next-line no-undef
    handleUpdateListSubCampaign(value.target.value, 'name');
  };

  const onChangeNameAdvertise = (idItem: number, value: any): void => {
    console.log('e', value.target.value);
    console.log('idItem', idItem);
  };
  const onChangeQuantityAdvertise = (e: any): void => {
    console.log(e.target.value);
  };

  const handleAddCampaign = (): void => {
    const NewObject: IListSubCompaign = {
      name: `Chiến dịch ${listSubCampaign.length + 1}`,
      status: true,
      ads: [{
        id: 1,
        name: 'Quảng cáo 1',
        quantity: 0,
      }],
    };
    setListSubCampagin([...listSubCampaign, NewObject]);
  };

  const addRowAdvertise = (): void => {
    const newObject: IRowDataGrid = {
      id: 0,
      name: `Quảng cáo ${campaignSelected.ads.length + 1}`,
      quantity: 0,
    };

    setCampaignSelected({ ...campaignSelected, ads: [...campaignSelected.ads, newObject] });
  };

  const totalQuantity = (data: any) => {
    let totalQuantityResult = 0;
    data.map((item: any) => {
      totalQuantityResult += item.quantity;
      return totalQuantityResult;
    });

    return totalQuantityResult;
  };

  useEffect(() => {
    setCampaignSelected(listSubCampaign[0]);
    // setArrayAdvertise(campaignSelected.ads);
  }, [listSubCampaign]);

  const columns: GridColDef[] = [
    {
      field: 'nameAdvertise',
      headerName: 'Tên quảng cáo*',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <TextField
          InputProps={{
            style: {
              backgroundColor: 'white',
            },
          }}
          fullWidth
          label=""
          variant="filled"
          value={params.row.name}
          onChange={(e) => onChangeNameAdvertise(params.row.id, e)}
        />
      ),
    },
    {
      field: 'Số lượng*',
      headerName: 'Số lượng*',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <TextField
          InputProps={{
            style: {
              backgroundColor: 'white',
            },
          }}
          fullWidth
          label=""
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          value={params.row.quantity}
          onChange={(e) => onChangeQuantityAdvertise(e)}
        />
      ),
    },
    {
      field: '',
      headerName: '',
      sortable: false,
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
            onClick={addRowAdvertise}
          >
            Thêm
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
            <button
              onClick={() => handleClickCampaign(item)}
              className={`item-campaign ${campaignSelected.name === item.name ? 'active' : ''}`}
            >
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
          <FormControlLabel control={<Checkbox checked={campaignSelected.status} onChange={onChangeCheckbox} />} label="Đang hoạt động" />
        </div>
      </div>
      <div className="list-advertise">
        <span>DANH SÁCH QUẢNG CÁO</span>
        <div className="list">
          <DataGrid
            className="MuiDataGrid-cell-focus"
            style={{ outline: 'none' }}
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            disableRowSelectionOnClick
            disableEval
            rowHeight={65}
            rows={campaignSelected.ads}
            getRowId={(row: IRowDataGrid) => row.name}
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
