import { faAngleLeft, faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ModalConfirmList } from '../../components/modalConfirm/ModalConfirmList';
import { CSVReader } from 'react-papaparse';
import { FieldForm } from '../../components/fieldForm/FieldForm';

function SearchPanel(props) {
  const rowsPerPage = 10;
  const { listMerchant, listPreSelected, onClose, onMultipleSelect, onSelectMerchant, selectMultiple } = props;
  const [filterMerchant, setFilterMerchant] = useState('');
  const [pagList, setPagList] = useState(
    {
      page: 0,
      totalPages: 0,
      listFilter: []
    }
  );
  const [pagListUpload, setPagListUpload] = useState(
    {
      page: 0,
      totalPages: 0,
      listFilter: []
    }
  );
  const [selectedMerchant, setSelectedMerchant] = useState(listPreSelected);
  const [uploadFileError, setUploadFileError] = useState(
    {
      showModal: false,
      listErrors: []
    }
  );

  useEffect(() => {
    let totalRegisters = listMerchant.length;
    let totalPages = totalRegisters / rowsPerPage;
    if (totalPages % 1 !== 0) {
      totalPages = Math.floor(totalRegisters / rowsPerPage) + 1;
    }
    setPagList({ page: 0, totalPages, listFilter: listMerchant.slice(0, rowsPerPage) });
  }, [listMerchant]);

  useEffect(() => {
    let totalRegisters = selectedMerchant.length;
    let totalPages = totalRegisters / rowsPerPage;
    if (totalPages % 1 !== 0) {
      totalPages = Math.floor(totalRegisters / rowsPerPage) + 1;
    }
    setPagListUpload({ page: 0, totalPages, listFilter: selectedMerchant.slice(0, rowsPerPage) });
  }, [selectedMerchant]);

  const filterList = (filter) => {
    let listFilter = [...listMerchant]
    if (filter && filter !== '') {
      listFilter = listFilter.filter(merchant => merchant.label.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    }

    let totalRegisters = listFilter.length;
    let totalPages = totalRegisters / rowsPerPage;
    if (totalPages % 1 !== 0) {
      totalPages = Math.floor(totalRegisters / rowsPerPage) + 1;
    }
    setPagList({ page: 0, totalPages, listFilter: listFilter.slice(0, rowsPerPage) });
  }

  const changePage = (action) => {
    let listFilter = [...listMerchant]
    let currentData = { ...pagList };
    if (action === 'PREV') {
      currentData.page = (currentData.page - 1);
    } else if (action === 'NEXT') {
      currentData.page = (currentData.page + 1);
    }
    currentData.listFilter = listFilter.slice((currentData.page * rowsPerPage), ((currentData.page * rowsPerPage) + rowsPerPage));
    setPagList(currentData);
  }

  const changePageUpload = (action) => {
    let listFilter = [...selectedMerchant]
    let currentData = { ...pagList };
    if (action === 'PREV') {
      currentData.page = (currentData.page - 1);
    } else if (action === 'NEXT') {
      currentData.page = (currentData.page + 1);
    }
    currentData.listFilter = listFilter.slice((currentData.page * rowsPerPage), ((currentData.page * rowsPerPage) + rowsPerPage));
    setPagList(currentData);
  }

  const handleOnDrop = (data) => {
    let listMerch = [];
    let listError = [];
    data.forEach((element) => {
      let merchAux = element.data[0];
      if (merchAux.trim() !== '') {
        if (listMerchant.findIndex(merchant => merchant.value === merchAux) !== -1) {
          listMerch.push(merchAux);
        } else {
          listError.push(merchAux);
        }
      }
    });

    setSelectedMerchant(listMerch);
    if (listError.length > 0) {
      let errorTmp = { ...uploadFileError };
      errorTmp.showModal = true;
      errorTmp.listErrors = listError;
      setUploadFileError(errorTmp);
    }
  }

  const handleOnRemoveFile = (data) => {
    setSelectedMerchant([]);
    setUploadFileError({ showModal: false, listErrors: [] });
  }

  return (
    <React.Fragment>
      {uploadFileError.showModal &&
        <ModalConfirmList
          title='Merchant no Encontrados'
          onAccept={() => setUploadFileError({ showModal: false, listErrors: [] })}
        >
          {uploadFileError.listErrors.map((element, index) => {
            return (
              <div
                key={index}
                className='row justify-content-center'
              >
                <div
                  className='col-4 height-cell border d-flex justify-content-center align-items-center'
                >
                  {element}
                </div>
              </div>
            )
          })}
        </ModalConfirmList>
      }

      <div className='search-panel d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <button
            className='btn-close'
            onClick={() => onClose()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <h4>
            {selectMultiple ? 'Selecciona los comercios' : 'Selecciona el comercio'}
          </h4>
        </div>

        {!selectMultiple ?
          <div className='row mx-0'>
            <FieldForm
              label='Filtro'
              customStyle='mt-3'
              value={filterMerchant}
              onChangeValue={(value) => {
                setFilterMerchant(value);
                filterList(value);
              }}
            />

            <div className='col-10 px-0 mt-2 table-select mt-3'>
              <div className='row mx-0 table-header'>
                <div className='col-12 font-bold px-2 height-cell border d-flex align-items-center justify-content-start'>
                  MerchantCode
                </div>
              </div>

              {pagList.listFilter.map(merchant => {
                return (
                  <div
                    key={merchant}
                    className='row mx-0 table-body'
                  >
                    <div className='col-12 px-0 height-cell border d-flex justify-content-start'>
                      <button onClick={() => onSelectMerchant(merchant.value)}>
                        {merchant.label}
                      </button>
                    </div>
                  </div>
                )
              })}

              {pagList.totalPages > 1 &&
                <div className='d-flex table-paginator'>
                  {(pagList.page > 0) &&
                    <button
                      onClick={() => changePage('PREV')}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                  }

                  <div className='mx-2'>
                    Pagina {pagList.page + 1}/{pagList.totalPages}
                  </div>

                  {(pagList.page < pagList.totalPages) &&
                    <button
                      onClick={() => changePage('NEXT')}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  }
                </div>
              }
            </div>
          </div>
          :
          <div className='row flex-column mt-3 justify-content-center'>
            <div className='row mt-3 justify-content-center mx-0'>
              <div className='col-10 mt-4'>
                <CSVReader
                  onDrop={handleOnDrop}
                  noClick
                  addRemoveButton
                  onRemoveFile={handleOnRemoveFile}
                >
                  <span>Suelta un archivo CSV aqui para cargarlo.</span>
                </CSVReader>
              </div>
            </div>

            {selectedMerchant.length > 0 &&
              <div className='row mt-3 justify-content-center mx-0'>
                <div className='col-10 mt-4 table-select'>
                  <div className='row justify-content-center'>
                    <div className='col-10 height-cell border d-flex justify-content-center align-items-center'>
                      <span className='font-bold'>
                        MerchantCode
                      </span>
                    </div>
                    <div className='col-2 height-cell border d-flex justify-content-center align-items-center' />
                  </div>
                  {pagListUpload.listFilter.map((element) => {
                    return (
                      <div
                        key={element}
                        className='row justify-content-center'
                      >
                        <div className='col-10 height-cell border d-flex justify-content-center align-items-center'>
                          {element}
                        </div>
                        <div className='col-2 height-cell border d-flex justify-content-center align-items-center'>
                          <button
                            className='btn-delete'
                            onClick={() => {
                              let listTmp = [...selectedMerchant];
                              let indexDelete = listTmp.findIndex(elementSearch => elementSearch === element);
                              if (indexDelete > -1) {
                                listTmp.splice(indexDelete, 1);
                              }
                              setSelectedMerchant(listTmp);
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )
                  })}

                  {pagListUpload.totalPages > 1 &&
                    <div className='d-flex table-paginator'>
                      {(pagListUpload.page > 0) &&
                        <button
                          onClick={() => changePageUpload('PREV')}
                        >
                          <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                      }

                      <div className='mx-2'>
                        Pagina {pagListUpload.page + 1}/{pagListUpload.totalPages}
                      </div>

                      {(pagListUpload.page < pagListUpload.totalPages) &&
                        <button
                          onClick={() => changePageUpload('NEXT')}
                        >
                          <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                      }
                    </div>
                  }
                </div>
              </div>
            }

            <div className='row justify-content-center mx-0 mt-2'>
              {selectedMerchant.length > 0 &&
                <button
                  className='btn-send mx-2'
                  onClick={() => onMultipleSelect(selectedMerchant)}
                >
                  Seleccionar
                </button>
              }

              <button
                className='btn-cancel mx-2'
                onClick={() => onClose()}
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      </div>
    </React.Fragment>
  )
}

export default SearchPanel;
