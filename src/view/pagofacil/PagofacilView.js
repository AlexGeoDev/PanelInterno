import moment from "moment";
import 'moment/locale/es';
import React, { useEffect, useState } from "react";
import { fetchPagofacilList } from "../../business/PagofacilBusiness";
import { FieldForm } from "../../components/fieldForm/FieldForm";
import { TableComponent } from "../../components/table/TableComponent";
import { DetailPagoFacil } from "./DetailPagofacilView";

function transformData(data, setIdOrdenPago, setOpenModal) {
  data.forEach(info => {
    let fechaTemp = new Date(info.fechaRegistro);
    info.fechaRegistro = moment(fechaTemp).locale('es').format('LLL')
    info.estado = info.estado == 'CREATED' ? 'Registrado' : info.estado == 'completed' ? 'Pagado' : info.estado;
    info.valor = '$ ' + info.valor.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    info.option = {
      action: 'Detalle',
      event: (item) => showDetail(item, setIdOrdenPago, setOpenModal)
    }
  })
  return data;
}

function showDetail(infoPagofacil, setIdOrdenPago, setOpenModal) {
  setIdOrdenPago(infoPagofacil.idOrdenPago);
  setOpenModal(true);
}

function fetchData(merchantCode, sequence, bankCode, setIdOrdenPago, setOpenModal) {
  const promise = new Promise((resolve, reject) => {
    let response = fetchPagofacilList(merchantCode, sequence, bankCode)
    response.then((data) => {
      if (data && data.body) {
        resolve(transformData(data.body, setIdOrdenPago, setOpenModal));
      } else {
        alert('Para los filtros ingresados no se encontraron datos')
      }
    })
  })
  return promise;
}

function PagoFacil(props) {
  const [listPagoFacil, setListPagoFacil] = useState();
  const [merchantCode, setMerchantCode] = useState();
  const [sequence, setSequence] = useState();
  const [bankCode, setBankCode] = useState();
  const [idOrdenPago, setIdOrdenPago] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function getData() {
      let data = await fetchData(merchantCode, sequence, bankCode, setIdOrdenPago, setOpenModal);
      if (data) {
        setListPagoFacil(data);
      }
    }
    getData();
  }, [])

  return (
    <React.Fragment>
      {openModal &&
        <DetailPagoFacil
          idOrdenPago={idOrdenPago}
          onClose={() => {
            setOpenModal(false)
          }}
        />
      }

      <div className='row justify-content-center'>
        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='MerchantCode'
            value={merchantCode}
            onChangeValue={setMerchantCode}
          />
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Referencia'
            value={sequence}
            onChangeValue={setSequence}
          />
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12 mt-3'>
          <FieldForm
            label='Código Banco'
            value={bankCode}
            onChangeValue={setBankCode}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-12 mt-4'>
          <button
            onClick={async () => {
              let data = await fetchData(merchantCode, sequence, bankCode);
              if (data) {
                setListPagoFacil(data);
              }
            }}
          >
            Filtrar
          </button>
        </div>
      </div>

      <div className='row mt-4'>
        <TableComponent
          styleCols="minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr)"
          data={listPagoFacil}
          multiple={false}
          cols={[
            { label: "Merchant Code", value: "merchantcode" },
            { label: "Fecha y Hora", value: "fechaRegistro" },
            { label: "Referencia", value: "secuenciaOrdenPago" },
            { label: "Estado", value: "estado" },
            { label: "Valor", value: "valor" },
            { label: "", value: "option" }
          ]}
        />
      </div>
    </React.Fragment>
  )
}

export { PagoFacil };
