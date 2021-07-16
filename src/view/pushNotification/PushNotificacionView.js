import React, { useEffect, useState } from 'react';
import { fetchCommerces } from '../../business/PagofacilBusiness';
import { Loading } from '../../components/loading/Loading';
import SendPush from './SendPush';
import SendPushIOS from './SendPushIOS';

function PushNotification(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listMerchant, setListMerchant] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    let response = await fetchCommerces();
    setLoading(false);

    let listData = [];
    for (let index in response.body) {
      let element = response.body[index];
      let merchantInfo = {
        value: element.merchantcode,
        label: element.merchantcode
      }
      listData.push(merchantInfo);
    }
    setListMerchant(listData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {loading && <Loading />}

      <div className='row mx-0 justify-content-center push-tabs'>
        <div
          className={activeTab === 0 && 'active'}
          onClick={() => setActiveTab(0)}
        >
          Notificaciones iOS
        </div>
        <div
          className={activeTab === 1 && 'active'}
          onClick={() => setActiveTab(1)}
        >
          Notificaciones Android/Huawei
        </div>
        <div
          className={activeTab === 2 && 'active'}
          onClick={() => setActiveTab(2)}
        >
          Cards Dinamicos
        </div>
      </div>

      {activeTab === 0 &&
        <SendPushIOS
          listMerchant={listMerchant}
          onLoading={setLoading}
        />
      }

      {activeTab === 1 &&
        <SendPush
          listMerchant={listMerchant}
          onLoading={setLoading}
        />
      }

    </React.Fragment >
  )
}

export { PushNotification };
