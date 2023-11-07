import React, {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import './style.scss';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Button, Checkbox, FormControlLabel, TextField, Tooltip,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { IArrayAdvertise, IInforAdvertise, IListSubCompaign } from '../../../interface';
import { initTialValueCampaign } from '../../index';

interface IProps {
  listSubCampaign: IListSubCompaign[];
  setListSubCampagin: Dispatch<SetStateAction<IListSubCompaign[]>>;
}

function Campaign(props: IProps) {
  const { listSubCampaign, setListSubCampagin } = props;
  const inputRef = useRef(null);

  const getItemIdSubCampaign = parseInt(localStorage.getItem('idCampaign') ?? '1', 10);

  // eslint-disable-next-line max-len
  const [inforAdvertiseSelected, setInforAdvertiseSelected] = useState<IInforAdvertise>(initTialValueCampaign);
  // eslint-disable-next-line max-len
  const [arrayAdvertiseSelected, setArrayAdvertiseSelected] = useState<any>(initTialValueCampaign.ads);

  const [valueItemCurrentAds, setValueItemCurrentAds] = useState<any>(arrayAdvertiseSelected[0]);

  const [valueSelectCheckboxAds, setValueSelectCheckboxAds] = useState<GridRowSelectionModel>([]);

  const handleClickCampaign = (valueItem: IListSubCompaign):void => {
    // const findIndex = listSubCampaign
    setInforAdvertiseSelected({
      id: valueItem.id,
      name: valueItem.name,
      status: valueItem.status,
    });
    setArrayAdvertiseSelected(valueItem.ads);
    localStorage.setItem('idCampaign', valueItem.id.toString());
  };

  const handleCheckFocusTextField = (id: number, type: 'name' | 'quantity') => (!!(id === valueItemCurrentAds.id && type === valueItemCurrentAds.type));

  const handleUpdateListSubCampaign = (inputValue: any, type: 'ads' | 'name' | 'status'): void => {
    const newArray = [...listSubCampaign];

    // eslint-disable-next-line max-len
    const findIndex = newArray.findIndex((item: IListSubCompaign) => item.name === inforAdvertiseSelected.name);

    const newObject = {
      id: newArray[findIndex].id,
      name: type === 'name' ? inputValue : newArray[findIndex].name,
      status: type === 'status' ? inputValue : newArray[findIndex].status,
      ads: type === 'ads' ? inputValue : newArray[findIndex].ads,
    };

    newArray[findIndex] = newObject;

    if (findIndex !== -1) {
      setListSubCampagin(newArray);
    }
  };

  const onChangeCheckbox = (e: any): void => {
    setInforAdvertiseSelected({ ...inforAdvertiseSelected, status: e.target.checked });
    handleUpdateListSubCampaign(e.target.checked, 'status');
  };

  const onChangeNameSubCampaign = (value: any): void => {
    setInforAdvertiseSelected({ ...inforAdvertiseSelected, name: value.target.value });
    handleUpdateListSubCampaign(value.target.value, 'name');
  };

  const handleBlurAds = (currentId: number, value: string, type: 'name' | 'quantity') => {
    const findIndex = arrayAdvertiseSelected.findIndex((item: any) => item.id === currentId);

    const newArray = [...arrayAdvertiseSelected];
    const newObject = {
      id: newArray[findIndex].id,
      name: type === 'name' ? value : newArray[findIndex].name,
      quantity: type === 'quantity' ? parseInt(value, 10) : newArray[findIndex].quantity,
    };

    newArray[findIndex] = newObject;

    setArrayAdvertiseSelected(newArray);

    handleUpdateListSubCampaign(newArray, 'ads');
  };

  const handleAddCampaign = (): void => {
    const NewObject: IListSubCompaign = {
      id: listSubCampaign.length + 1,
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
    const newObject: IArrayAdvertise = {
      id: arrayAdvertiseSelected.length + 1,
      name: `Quảng cáo ${arrayAdvertiseSelected.length + 1}`,
      quantity: 0,
    };

    setArrayAdvertiseSelected([...arrayAdvertiseSelected, newObject]);
  };

  const handleSelectCheckboxAds = (listCheckbox: GridRowSelectionModel) => {
    setValueSelectCheckboxAds(listCheckbox);
  };

  const handleDeleteMultiRowAds = (): void => {
    // eslint-disable-next-line max-len
    const newArray = arrayAdvertiseSelected.filter((item: IInforAdvertise) => !valueSelectCheckboxAds?.includes(item.id));

    setArrayAdvertiseSelected(newArray);
  };

  const deleteRowAdvertise = (id: number): void => {
    const newArr = arrayAdvertiseSelected.filter((item: IInforAdvertise) => (
      item.id !== id
    ));

    setArrayAdvertiseSelected(newArr);
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
    // setCampaignSelected(listSubCampaign[0]);
    setInforAdvertiseSelected({
      id: listSubCampaign[0].id,
      name: listSubCampaign[0].name,
      status: listSubCampaign[0].status,
    });

    setArrayAdvertiseSelected(listSubCampaign[0].ads);

    listSubCampaign.forEach((item) => {
      if (getItemIdSubCampaign === item.id) {
        setInforAdvertiseSelected({
          id: item.id,
          name: item.name,
          status: item.status,
        });
        setArrayAdvertiseSelected(item.ads);
      }
    });
  }, [getItemIdSubCampaign, listSubCampaign]);

  const columns: GridColDef[] = [
    {
      field: 'nameAdvertise',
      sortable: false,
      flex: 1,
      renderHeader: () => (
        <div>
          {valueSelectCheckboxAds.length > 0 ? (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/control-has-associated-label
            <div tabIndex={0} role="button" onClick={handleDeleteMultiRowAds} style={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Xoá">
                <DeleteIcon />
              </Tooltip>
            </div>
          ) : <div>Tên quảng cáo*</div> }

        </div>
      ),
      renderCell: (params) => (
        <TextField
          key={params.row.id}
          inputRef={inputRef}
          InputProps={{
            style: {
              backgroundColor: 'transparent',
            },
          }}
          fullWidth
          label=""
          variant="filled"
          value={handleCheckFocusTextField(params.row.id, 'name') ? valueItemCurrentAds.value : params.row.name}
          onBlur={(e) => handleBlurAds(params.row.id, e.target.value, 'name')}
          onChange={(event) => {
            setValueItemCurrentAds({ id: params.row.id, value: event.target.value, type: 'name' });
          }}
        />
      ),
    },
    {
      field: 'Số lượng*',
      sortable: false,
      flex: 1,
      renderHeader: () => (
        <div>{valueSelectCheckboxAds.length > 0 ? '' : 'Số lượng*' }</div>
      ),
      renderCell: (params) => (
        <TextField
          InputProps={{
            style: {
              backgroundColor: 'transparent',
              justifyContent: 'flex-end',
            },
          }}
          fullWidth
          label=""
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          value={handleCheckFocusTextField(params.row.id, 'quantity') ? valueItemCurrentAds.value : params.row.quantity}
          onChange={(event) => {
            setValueItemCurrentAds({ id: params.row.id, value: event.target.value, type: 'quantity' });
            handleBlurAds(params.row.id, event.target.value, 'quantity');
          }}
        />
      ),
    },
    {
      field: '',
      headerName: '',
      sortable: false,
      width: 170,
      // cellClassName: 'actions',
      // align: 'right',
      renderHeader: () => (
        <div style={{
          textAlign: 'right',
          width: '170px',
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
      renderCell: (params) => (
        <div style={{
          width: '100%',
          fontSize: 14,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        >
          <Tooltip onClick={() => deleteRowAdvertise(params.row.id)} title="Xoá">
            <DeleteIcon />
          </Tooltip>
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
              className={`item-campaign ${getItemIdSubCampaign === item.id ? 'active' : ''}`}
            >
              <div className="title">
                <p>
                  {item.name}
                </p>
                <CheckCircleIcon
                  style={{
                    color: item.status ? 'green' : 'gray',
                    fontSize: 14,
                    paddingBottom: 4,
                  }}
                />
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
            value={inforAdvertiseSelected?.name}
            onChange={(e) => onChangeNameSubCampaign(e)}
          />
        </div>
        <div className="isActive">
          <FormControlLabel control={<Checkbox checked={inforAdvertiseSelected.status} onChange={onChangeCheckbox} />} label="Đang hoạt động" />
        </div>
      </div>
      <div className="list-advertise">
        <span>DANH SÁCH QUẢNG CÁO</span>
        <div className="list">
          <DataGrid
            className="custom-data-grid"
            style={{ outline: 'none', overflow: 'hidden' }}
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            disableRowSelectionOnClick
            disableEval
            rowHeight={65}
            rows={arrayAdvertiseSelected}
            getRowId={(row: IArrayAdvertise) => row.id}
            columns={columns}
            hideFooter
            checkboxSelection
            // selectionModel={selectRowCheckbox}
            onRowSelectionModelChange={(ids: GridRowSelectionModel) => {
              console.log(ids);
              handleSelectCheckboxAds(ids);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Campaign;
