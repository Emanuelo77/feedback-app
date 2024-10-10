import express from 'express';
const router = express.Router();

// Zeile 16: GET Feedback by ID
router.get('/feedback/:id', (req, res) => {
    const feedback = getFeedbackById(req.params.id);  // Beispiel für eine Datenbankabfrage
    if (feedback) {
        res.status(200).json(feedback);
    } else {
        res.status(404).json({ message: 'Feedback not found' });
    }
});

// Zeile 29: POST Feedback
router.post('/feedback', (req, res) => {
    const newFeedback = saveFeedback(req.body);  // Beispiel für Speichern von Feedback
    res.status(201).json(newFeedback);
});

// Zeile 46: DELETE Feedback
router.delete('/feedback/:id', (req, res) => {
    const isDeleted = deleteFeedback(req.params.id);  // Beispiel für Löschen von Feedback
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Feedback not found' });
    }
});

export default router;
