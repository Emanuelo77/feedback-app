import { errorHandler } from '../src/middleware/errorHandler'; // Import des Error Handlers
import httpMocks from 'node-mocks-http'; // Mock HTTP Module

describe('Error Handler', () => {
    it('sollte eine Fehlerantwort mit dem Standard Status Code senden', () => {
        // Erstelle Mock-Objekte für die Anfrage und Antwort
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn(); // Mock der next-Funktion

        // Simuliere einen Fehler
        const error = new Error('Testfehler');

        // Rufe den Error Handler auf
        errorHandler(error, req, res, next);

        // Überprüfe den Statuscode
        expect(res.statusCode).toBe(500); // Stelle sicher, dass der Statuscode korrekt ist
        
        // Überprüfe die Antwortdaten
        expect(res._getJSONData()).toEqual({ message: 'Internal Server Error' }); // Stelle sicher, dass die Struktur korrekt ist
    });
});
