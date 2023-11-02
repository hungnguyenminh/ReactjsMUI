import React, { useState } from 'react';
import './style.scss';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

function Campaign() {
  const [listCampaign, setListCampagin] = useState<any>([
    {
      nameCampaign: 'Chiến dịch 1',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
    {
      nameCampaign: 'Chiến dịch 2',
      isActive: true,
      listAdvertise: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
  ]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [
    {
      id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,
    },
    {
      id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42,
    },
    {
      id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45,
    },
    {
      id: 4, lastName: 'Stark', firstName: 'Arya', age: 16,
    },
    {
      id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null,
    },
    {
      id: 6, lastName: 'Melisandre', firstName: null, age: 150,
    },
    {
      id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44,
    },
    {
      id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36,
    },
    {
      id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65,
    },
  ];

  const handleSubmit = (): void => {
    setListCampagin(undefined);
  };
  console.log('listCampaign', listCampaign);

  return (
    <div className="campaign-container">
      <div className="list-campaign">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button tabIndex={0} type="button" className="button-add-campaign" onClick={handleSubmit}>
          <AddIcon style={{ color: 'red' }} />
        </button>
        <div className="list-item-campaign">
          {listCampaign.map((item: any) => (
            <div className="item-campaign">
              <div className="title">
                <p>{item.nameCampaign}</p>
                <CheckCircleIcon style={{ color: 'green', fontSize: 14 }} />
              </div>
              <div className="quantity">ssss</div>
            </div>
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
            rows={rows}
            columns={columns}
            // initialState={{
            //   pagination: {
            //     paginationModel: { page: 0, pageSize: 5 },
            //   },
            // }}
            // pageSizeOptions={[5, 10]}
            hideFooter
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}

export default Campaign;
