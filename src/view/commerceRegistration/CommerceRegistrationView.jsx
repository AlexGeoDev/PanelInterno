import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navi'
import moment from 'moment';
import CommerceBusiness from '../../business/CommerceBusiness';
import { Loading } from '../../components/loading/Loading';
import CommerceFilter from './CommerceFilter';
import CommerceList from './CommerceList';

const CommerceRegistrationView = () => {
  const [isLoading, setLoadingStatus] = useState(false);
  const [commerceList, setCommerceList] = useState([]);

  let navigation = useNavigation()

  useEffect(() => {
    fetchCommerceList();
  }, []);

  const fetchCommerceList = async (email, date) => {
    if ((!email || email == null) && !date) {
      date = new Date();
    }
    setLoadingStatus(true);

    let filterDate;

    if (date) {
      filterDate = moment(date).format('yyyy-MM-DD')
    }

    const response = await CommerceBusiness.fetchCommerceList(email, filterDate);
    setLoadingStatus(false);

    if (response && response.data) {
      setCommerceList(response.data);
    } else {
      alert('Ha ocurrido un error al cargar el listado');
    }
  }

  const openDetail = (idCommerce) => {
    navigation.navigate(`/comercios/${idCommerce}`);
  }

  return (
    <div className='container'>
      {
        isLoading &&
        <Loading />
      }
      
      <CommerceFilter
        onFilter={fetchCommerceList}
      />
      <CommerceList
        commerceList={commerceList}
        onOpenDetail={openDetail}
      />
    </div>
  );
}

export default CommerceRegistrationView;
