import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../Context';
import UserRole from '../../Config/role';

export default function Navigation() {
  const user = useAuthState();
  console.log('user: ' + JSON.stringify(user));

  let navigationItems = [
    {
      name: '',
      link: '/',
    },
  ];

  const role = user.userDetails.role;
  const myRestaurant = user.userDetails.myRestaurant;

  if (role === UserRole.Owner.name) {
    navigationItems = [
      {
        name: 'My Restaurant',
        link: '/restaurant/' + myRestaurant,
      },
      {
        name: 'Restaurant List',
        link: '/restaurant',
      },
      {
        name: 'Order List',
        // TODO: maybe url should be different for orders of owner restaurant
        link: '/user/' + user.userDetails.user + '/order',
      },
    ];
  } else if (role == UserRole.Regular.name) {
    navigationItems = [
      {
        name: 'Restaurant List',
        link: '/restaurant',
      },
      {
        name: 'Order List',
        link: '/user/' + user.userDetails.user + '/order',
      },
    ];
  }

  return (
    <ul className="nav nav-pills navbar-right side-bar">
      {navigationItems.map((r) => (
        <li key={r.name}>
          <Link
            to={r.link}
            style={{ textDecorationLine: 'none', marginLeft: 30 }}
          >
            {r.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
