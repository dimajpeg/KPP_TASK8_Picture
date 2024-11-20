const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const paintingsFilePath = path.join(__dirname, '../models/paintings.json');


// Получение списка картин
router.get('/paintings', (req, res) => {
  fs.readFile(paintingsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading paintings file');
    }
    res.json(JSON.parse(data));
  });
});

// Добавление новой картины
router.post('/paintings', (req, res) => {
  fs.readFile(paintingsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading paintings file');
    }
    const paintings = JSON.parse(data);
    const newPainting = { id: Date.now(), ...req.body };
    paintings.push(newPainting);
    fs.writeFile(paintingsFilePath, JSON.stringify(paintings, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing paintings file');
      }
      res.status(201).send('Painting added');
    });
  });
});

// Редактирование картины
router.put('/paintings/:id', (req, res) => {
  fs.readFile(paintingsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading paintings file');
    }
    let paintings = JSON.parse(data);
    const paintingIndex = paintings.findIndex(p => p.id === parseInt(req.params.id));
    if (paintingIndex === -1) {
      return res.status(404).send('Painting not found');
    }
    paintings[paintingIndex] = { ...paintings[paintingIndex], ...req.body };
    fs.writeFile(paintingsFilePath, JSON.stringify(paintings, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing paintings file');
      }
      res.status(200).send('Painting updated');
    });
  });
});

// Удаление картины
router.delete('/paintings/:id', (req, res) => {
  fs.readFile(paintingsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading paintings file');
    }
    let paintings = JSON.parse(data);
    paintings = paintings.filter(painting => painting.id !== parseInt(req.params.id));
    fs.writeFile(paintingsFilePath, JSON.stringify(paintings, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing paintings file');
      }
      res.status(200).send('Painting deleted');
    });
  });
});

// Получение списка участников
router.get('/participants', (req, res) => {
  fs.readFile(participantsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading participants file');
    }
    res.json(JSON.parse(data));
  });
});

// Добавление нового участника
router.post('/participants', (req, res) => {
  fs.readFile(participantsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading participants file');
    }
    const participants = JSON.parse(data);
    const newParticipant = { id: Date.now(), ...req.body };
    participants.push(newParticipant);
    fs.writeFile(participantsFilePath, JSON.stringify(participants, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing participants file');
      }
      res.status(201).send('Participant added');
    });
  });
});

// Редактирование участника
router.put('/participants/:id', (req, res) => {
  fs.readFile(participantsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading participants file');
    }
    let participants = JSON.parse(data);
    const participantIndex = participants.findIndex(p => p.id === parseInt(req.params.id));
    if (participantIndex === -1) {
      return res.status(404).send('Participant not found');
    }
    participants[participantIndex] = { ...participants[participantIndex], ...req.body };
    fs.writeFile(participantsFilePath, JSON.stringify(participants, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing participants file');
      }
      res.status(200).send('Participant updated');
    });
  });
});

// Удаление участника
router.delete('/participants/:id', (req, res) => {
  fs.readFile(participantsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading participants file');
    }
    let participants = JSON.parse(data);
    participants = participants.filter(participant => participant.id !== parseInt(req.params.id));
    fs.writeFile(participantsFilePath, JSON.stringify(participants, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing participants file');
      }
      res.status(200).send('Participant deleted');
    });
  });
});

module.exports = router;