import request from 'supertest';
import express from 'express';
import feedbackRoutes from '../src/routes/feedbackRoutes';  // Pfad anpassen

const app = express();
app.use(express.json());  // Damit POST-Anfragen funktionieren
app.use('/', feedbackRoutes);

// Mock-Funktionen für Datenbankoperationen
jest.mock('../src/services/feedbackService', () => ({
    getFeedbackById: jest.fn((id) => id === '1' ? { id: '1', text: 'Great feedback' } : null),
    saveFeedback: jest.fn((feedback) => ({ id: '2', ...feedback })),
    deleteFeedback: jest.fn((id) => id === '1')
}));

describe('Feedback Routes', () => {
    // Test für Zeile 16: GET Feedback by ID
    it('should return feedback for a valid ID', async () => {
        const response = await request(app).get('/feedback/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: '1', text: 'Great feedback' });
    });

    it('should return 404 if feedback not found', async () => {
        const response = await request(app).get('/feedback/999');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Feedback not found');
    });

    // Test für Zeile 29: POST Feedback
    it('should create new feedback', async () => {
        const feedbackData = { text: 'This is new feedback' };
        const response = await request(app)
            .post('/feedback')
            .send(feedbackData);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: '2', text: 'This is new feedback' });
    });

    // Test für Zeile 46: DELETE Feedback
    it('should delete feedback for a valid ID', async () => {
        const response = await request(app).delete('/feedback/1');
        expect(response.status).toBe(204);
    });

    it('should return 404 when trying to delete non-existing feedback', async () => {
        const response = await request(app).delete('/feedback/999');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Feedback not found');
    });
});
