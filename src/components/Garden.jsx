import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCog } from "react-icons/fa";
import './Garden.css';
import { useNavigate } from 'react-router-dom';

function Garden() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
    const [newCard, setNewCard] = useState({
    image_url: '',
    title: '',
    description: '',
    });

  const fetchCards = async () => {
    try {
      const res = await axios.get('http://88.200.63.148:6868/get-cards', {
        withCredentials: true,
      });
      setCards(res.data.cards || []);
    } catch (err) {
      console.error('Error fetching cards:', err);
    }
  };

  const handleAddCard = () => {
  setNewCard({ image_url: '', title: '', description: '' });
  setShowAddModal(true);
};

    const handleSubmitNewCard = async () => {
  try {
    const res = await axios.post(
      'http://88.200.63.148:6868/create-card-info',
      newCard,
      { withCredentials: true }
    );

    const insertedCardId = res.data.cardId;
    if (!insertedCardId) {
        alert('Error: cardId not returned.');
        return;
    }

    const assignRes = await axios.post(
      'http://88.200.63.148:6868/add-card',
      { cardId: insertedCardId },
      { withCredentials: true }
    );

    alert(assignRes.data.Message || assignRes.data.Error);
    fetchCards();
  } catch (err) {
    console.error(err);
    alert('Failed to add card.');
  } finally {
    setShowAddModal(false);
  }
};


  useEffect(() => {
    fetchCards();
  }, []);


  const handleDeleteClick = (cardId) => {
    setCardToDelete(cardId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
  try {
    const response = await axios.post(
      'http://88.200.63.148:6868/delete-card',
      { cardId: cardToDelete.id }, 
      { withCredentials: true }
    );
    alert(response.data.Message || response.data.Error);
    fetchCards(); //refresh when updated
  } catch (err) {
    console.error('Delete failed:', err);
    alert('Failed to delete the card.');
  } finally {
    setShowModal(false);
    setCardToDelete(null);
  }
};


  const handleCancelDelete = () => {
    setShowModal(false);
    setCardToDelete(null);
  };


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Garden</h1>

      <div className="card-grid">
        {cards.map((card) => (
            <div key={card.id} className="card">
              
            <button className="settings-button"
            onClick={(e) => {
            e.stopPropagation();
            navigate(`/settings/${card.id}`);
            }}
            aria-label={`Settings for ${card.title}`}
            title="Settings">
            <FaCog size={18} />
            </button>



              <button className="delete-button" onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(card);
              }}>×</button>

              <div className='card-link'>
                <img src={card.image_url} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className='card-buttons'>

                    <button onClick={() => window.location.href = `/card/${card.id}`}>
                      Current status
                    </button>
                    <button onClick={() => window.location.href = `/history/${card.id}`}>
                      History
                    </button>
                </div>
              </div>
              <div to={`/card/${card.id}`} className="card-link">
   
              </div>
            </div>

        ))}

        <div className="card add-card" onClick={handleAddCard}>
          <button className="add-button">+</button>
        </div>
      </div>
            {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this plant?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/*add new card code */}
      {showAddModal && (
  <div className="modal-overlay">
    <div className="modal add-card-modal">
      <button className="close-button" onClick={() => setShowAddModal(false)}>×</button>
      <h2>Add New Plant</h2>
      <input
        type="text"
        placeholder="Image URL (http/s)"
        value={newCard.image_url}
        onChange={(e) => setNewCard({ ...newCard, image_url: e.target.value })}
      />
      <input
        type="text"
        placeholder="Title"
        value={newCard.title}
        onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newCard.description}
        onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
      />
      <button onClick={handleSubmitNewCard}>Submit</button>
    </div>
  </div>
)}
    </div>
  );
}

export default Garden;
