# Node.jsochExpress
Node.js och Express som stödjer CRUD-operationer

Sammanfattning
Ett REST API med Node.js och Express som stödjer CRUD-operationer.
Applikationen kan hantera användare (eller andra resurser) i en databas.
Du har implementerat JWT-baserad autentisering och skapat en säker rutt.
Frontend gör HTTP-förfrågningar till backend.

Testa skicka en 
POSTförfrågan till http://localhost:Port/api/users/register
POSTförfrågan till http://localhost:Port/api/users/login (få token)
SECRETförfrågan till http://localhost:Port/api/users/secret (med Bearer token med det krånglar ej vet )
PUTförfrågan till http://localhost:Port/api/users/:id
DELETETförfrågan till http://localhost:Port/api/users/:id

FRONTEND (html) kan man skapar anvädaren också.



Här har vi installerat:
express : För att skapa REST API:t.
dotenv : För att hantera miljövariabler.
mongoose : För att ansluta till en MongoDB-databas (om du vill använda en NoSQL-databas).
body-parser : För att parsa inkommande JSON-data.
jsonwebtoken : För autentisering med JWT.
bcryptjs : För eventuell kryptering av lösenord (valfritt).
nodemon : För automatisk omstart av servern vid ändringar.
cors: Cross-Origin Resource Sharing för web browser

Filer och mapp:
server i Express
.env
models/User.js
routes/userRoutes.js
middleware/auth.js
Skydda en rutt genom att använda authenticate -middleware

Frontend, en enkel HTML-fil som skickar HTTP-request till ditt API. 
