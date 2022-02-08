import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../../Context';

import OrderDataService from '../../services/order.service';

export default function OrderList() {
  /* TODO: check what happens if data is not retrived and initial values are rendered */

  const user = useAuthState();

  const initialValue = [{ id: 0, date: '', total: '', status: '' }];

  const [orderList, setOrderList] = useState(initialValue);

  useEffect(() => {
    // TODO: check on undefined
    retriveOrderList(user.userDetails.user);
  }, []);

  const history = useHistory();

  const openDetails = (id) => {
    history.push('/order/' + id);
  };

  function retriveOrderList(userId) {
    OrderDataService.getUserOrders(userId)
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }

  return (
    // TODO: if orderlist is emprty, handle
    <div className="d-flex flex-column order-list-container">
      {orderList.map((r) => (
        <div
          className="d-flex flex-nowrap bg-light m-1"
          key={r.id}
          onClick={() => openDetails(r.id)}
          style={{ cursor: 'pointer' }}
        >
          <div className="p-2"> #{r.id}</div>
          <div className="p-2">{r.date}</div>
          <div className="p-2">{r.status}</div>
        </div>
      ))}
    </div>
  );
}