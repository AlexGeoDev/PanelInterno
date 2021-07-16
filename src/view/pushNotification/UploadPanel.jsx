import { faAngleLeft, faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ModalConfirmList } from '../../components/modalConfirm/ModalConfirmList';
import { CSVReader } from 'react-papaparse';

function UploadPanel(props) {
  const rowsPerPage = 10;
  const { onClose, onConfirmSelect } = props;
  const [listPush, setListPush] = useState('');
  const [pagList, setPagList] = useState(
    {
      page: 0,
      totalPages: 0,
      listFilter: []
    }
  );
  const [uploadFileError, setUploadFileError] = useState(
    {
      showModal: false,
      listErrors: []
    }
  );

  useEffect(() => {
    let totalRegisters = listPush.length;
    let totalPages = totalRegisters / rowsPerPage;
    if (totalPages % 1 !== 0) {
      totalPages = Math.floor(totalRegisters / rowsPerPage) + 1;
    }
    setPagList({ page: 0, totalPages, listFilter: listPush.slice(0, rowsPerPage) });
  }, [listPush]);

  const changePage = (action) => {
    let listFilter = [...listPush]
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
    let listTemp = [];
    data.forEach((infoPush) => {
      if (infoPush.data.length === 2) {
        listTemp.push(
          {
            idPush: infoPush.data[0],
            system: infoPush.data[1]
          }
        );
      }
    });
    setListPush(listTemp);
  }

  const handleOnRemoveFile = (data) => {
    setListPush([]);
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
            Caragr IdPush
          </h4>
        </div>

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

          {pagList.listFilter.length > 0 &&
            <div className='row mt-3 justify-content-center mx-0'>
              <div className='col-10 mt-4 table-select'>
                <div className='row justify-content-center'>
                  <div className='col-7 height-cell border d-flex justify-content-center align-items-center'>
                    <span className='font-bold'>
                      IdPush
                    </span>
                  </div>
                  <div className='col-3 height-cell border d-flex justify-content-center align-items-center'>
                    <span className='font-bold'>
                      System
                    </span>
                  </div>
                  <div className='col-2 height-cell border d-flex justify-content-center align-items-center' />
                </div>
                {pagList.listFilter.map((element) => {
                  return (
                    <div
                      key={element}
                      className='row justify-content-center'
                    >
                      <div className='col-7 height-cell border d-flex justify-content-center align-items-center py-2'>
                        {element.idPush}
                      </div>
                      <div className='col-3 height-cell border d-flex justify-content-center align-items-center'>
                        {element.system}
                      </div>
                      <div className='col-2 height-cell border d-flex justify-content-center align-items-center'>
                        <button
                          className='btn-delete'
                          onClick={() => {
                            let listTmp = [...listPush];
                            let indexDelete = listTmp.findIndex(elementSearch => elementSearch === element);
                            if (indexDelete > -1) {
                              listTmp.splice(indexDelete, 1);
                            }
                            setListPush(listTmp);
                          }}
                        >
                          Eliminar
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
          }

          <div className='row justify-content-center mx-0 mt-2'>
            {listPush.length > 0 &&
              <button
                className='btn-send mx-2'
                onClick={() => onConfirmSelect(listPush)}
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
      </div>
    </React.Fragment>
  )
}

export default UploadPanel;
