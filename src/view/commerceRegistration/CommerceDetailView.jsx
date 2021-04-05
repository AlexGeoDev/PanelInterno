import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navi'
import CommerceBusiness from '../../business/CommerceBusiness';
import { Loading } from '../../components/loading/Loading';

const CommerceDetailView = ({ idCommerce }) => {
  const [isLoading, setLoadingStatus] = useState(false);
  const [commerceData, setCommerceData] = useState();
  const [isNaturalPerson, setNaturalPerson] = useState(true);

  const navigation = useNavigation();
  const completed = commerceData ? commerceData.registrationCompleted : false;

  useEffect(() => {
    fetchCommerce(idCommerce);
  }, []);

  const fetchCommerce = async (idCommerce) => {
    setLoadingStatus(true);
    const response = await CommerceBusiness.fetchCommerceData(idCommerce);
    setLoadingStatus(false);

    if (response && response.data) {

      const commerceData = response.data;

      if (commerceData.titular) {
        let personType = commerceData.titular.personType;

        if (personType) {
          setNaturalPerson(personType === 'naturalPerson');
        }
      }

      setCommerceData(response.data);
    } else {
      alert('Ha ocurrido un error al cargar el detalle');
      navigation.goBack();
    }
  }

  const downloadDocument = async (idDocument) => {
    setLoadingStatus(true);
    const response = await CommerceBusiness.downloadDocument(idDocument);
    setLoadingStatus(false);

    if (!response) {
      alert('Ha ocurrido un error al dercargar el archivo :(');
    }
  }

  const updateFormStatus = async () => {
    setLoadingStatus(true);
    const updateResponse = await CommerceBusiness.updateCommerceRegistrationStatus(idCommerce, !completed);

    setLoadingStatus(false);

    if (updateResponse) {
      navigation.goBack();
    } else {
      alert('Ha ocurrido un error al actualizar el estado del formulario');
    }
  }

  return (
    <div>
      {
        isLoading &&
        <Loading />
      }
      <div className='text-left d-flex align-items-center'>
        <span
          className='pointer mr-2'
          role='button'
          title='Regresar'
          tabIndex={0}
          onClick={() => navigation.goBack()}
        >
          <i className='fas fa-arrow-left fa-2x' />
        </span>
        Regresar
      </div>

      <div className='mt-3'>
        <button
          onClick={updateFormStatus}
          className={`btn btn-outline-${completed ? 'danger' : 'primary'}`}
        >
          {completed ?
            'Marcar formulario como no completado' :
            'Marcar formulario como completado'
          }
        </button>
      </div>

      {
        commerceData &&
        <div className='container text-left mt-2'>
          <h5>
            Datos del comercio
        </h5>
          <hr />
          <p>
            <Detail
              name='Nombre del comercio'
              value={commerceData.commerceName}
            />
            <Detail
              name='Teléfono'
              value={commerceData.phone}
            />
            <Detail
              name='Correo'
              value={commerceData.email}
            />
            <Detail
              name='Actividad comercial'
              value={commerceData.commercialActivity}
            />
            <Detail
              name='Dirección'
              value={commerceData.address}
            />
            <Detail
              name='Departamento'
              value={commerceData.department}
            />
            <Detail
              name='Ciudad'
              value={commerceData.city}
            />

            {
              commerceData.socialMedia &&
              <Detail
                name='Redes sociales'
                value={commerceData.socialMedia}
              />
            }
          </p>


          {
            commerceData.titular &&
            <>
              <h5>
                Datos del titular
              </h5>
              <hr />
              <Detail
                name='Tipo de persona'
                value={isNaturalPerson ? 'Persona Natural' : 'Persona Jirídica'}
              />
              <Detail
                name='Nombre'
                value={commerceData.titular.name}
              />
              <Detail
                name='Tipo de documento'
                value={commerceData.titular.documentType}
              />
              <Detail
                name='Número de documento'
                value={commerceData.titular.documentNumber}
              />
              {!isNaturalPerson &&
                <Detail
                  name='Número matrícula mercantil'
                  value={commerceData.titular.merchantRegisterNumber}
                />
              }
            </>
          }

          {
            commerceData.documents &&
            <div className='mt-3'>

              <h5>
                Documentos
              </h5>
              <hr />
              {commerceData.documents.map((document) =>
                <div key={document.idDocument}>
                  <span className='mr-2'>
                    {document.fileName}
                  </span>

                  <span
                    className='pointer'
                    title='Descargar archivo'
                    role='button'
                    tabIndex={0}
                    onClick={() => downloadDocument(document.idDocument)}
                  >
                    <i className='fas fa-download' />
                  </span>
                </div>
              )}
            </div>
          }
        </div>
      }

    </div>
  )
}

const Detail = ({ name, value }) => {

  return (
    <>
      <strong>
        {name}:
      </strong>
      <span className='ml-2'>
        {
          (value && value != null) ?
            value :
            '--'
        }
      </span>
      <br />
    </>
  );
}

export default CommerceDetailView;
