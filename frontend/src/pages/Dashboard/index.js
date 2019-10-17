import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socket from 'socket.io-client';

import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequest] = useState([]);

  const user_id = localStorage.getItem('user');
  const io = useMemo(
    () => socket('http://localhost:3000', { query: { user_id } }),
    [user_id]
  );

  useEffect(() => {
    io.on('booking_request', data => {
      setRequest([...requests, data]);
    });
  }, [requests, io]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');

      const response = await api.get('/dashboard', {
        headers: {
          user_id
        }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    setRequest(requests.filter(request => request._id !== id));
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);
    setRequest(requests.filter(request => request._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>
                {request.user.email} está solicitando uma reserva em{' '}
                <strong>
                  {request.spot.company} para a data: {request.data}{' '}
                </strong>{' '}
              </strong>
            </p>
            <button
              className="accept"
              onClick={() => handleAccept(request._id)}
            >
              ACEITAR
            </button>
            <button
              className="reject"
              onClick={() => handleReject(request._id)}
            >
              REJEITAR
            </button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>

      <Link to="new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
