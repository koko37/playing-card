import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import lucky from "../imgs/trophy.png";
import unlucky from "../imgs/unfortune.png";

const ScoreModal = ({ show, onClose, score }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton><Modal.Title>60K Points</Modal.Title></Modal.Header>
      {score >= 20000 && <Modal.Body>
        <div class="card-body text-center">
          <img src={lucky} width={200} height={200} />
          <h4 className='text-success'>CONGRATULATIONS!</h4>
          <h2 className="text-center text-success">{score}</h2>
        </div>
      </Modal.Body>}
      {score < 20000 && score > 8000 && <Modal.Body>
        <div class="card-body text-center">
          <h4 className='text-success'>GAME OVER!</h4>
          <h2 className="text-center text-success">{score}</h2>
        </div>
      </Modal.Body>}
      {score <= 8000 && <Modal.Body>
        <div class="card-body text-center">
          <img src={unlucky} width={200} height={200} style={{ marginBottom: '20px' }} />
          <h4 className='text-warning'>GAME OVER!</h4>
          <h2 className="text-center text-danger">{score}</h2>
        </div>
      </Modal.Body>}
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScoreModal
