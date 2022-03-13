const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let notes = [
	{
		id: 1,
		date: '2022-03-11T18:47:12.926Z',
		content: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
		important: true
	},
	{
		id: 2,
		date: '2022-03-11T18:47:12.926Z',
		content: 'est rerumon debitis possimus qui neque nisi nulla',
		important: false
	},
	{
		id: 3,
		date: '2022-03-11T18:47:12.926Z',
		content: 'Weprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
		important: true
	}
]


// ===================== Routes ===================== //

//Raiz
app.get('/', (request, response) => {
	response.send('<h1>Heloo word</h1>')
})
// Traer todas las notas
app.get('/api/notes', (request, response) => {
	response.json(notes)
})
// Traer una nota
app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = notes.find(note => note.id === id)
	note ? response.json(note) : response.status(404).end()
})
// Eliminar nota
app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter(note => note.id !== id)
	response.status(204).end()
})
// Crear nueva nota
app.post('/api/notes', (request, response) => {
	const note = request.body
	const ids = notes.map(note => note.id)
	const maxId = Math.max(...ids)
	const newNote = {
		id: maxId + 1,
		content: note.content,
		important: typeof note.important !== 'undefined' ? note.important : false,
		date: new Date().toISOString()
	}
	notes = [...notes, newNote]
	response.status(201).json(newNote)
})
// Editar nueva nota
// app.put('/api/notes/:id', (request, response) => {})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
