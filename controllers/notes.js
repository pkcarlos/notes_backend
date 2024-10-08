const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter

// require('dotenv').config()
// const express = require('express')
// const Note = require('./models/note')
// const cors = require('cors')

// const password = process.argv[2]

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// app.use(express.json()) // activate Express json-parser
// app.use(requestLogger) // implement middleware
// app.use(cors())

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

// app.get('/api/notes', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes)
//   })
// })

// app.get('/api/notes/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(note)
//       } else (
//         response.status(404).end()
//       )
//     })
//     .catch(error => next(error))
// })

// app.delete('/api/notes/:id/', (request, response, next) => {
//   Note.findByIdAndDelete(request.params.id)
//     .then(result => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// // edit note
// app.put('/api/notes/:id', (request, response, next) => {
//   const { content, important } = request.body

//   Note.findByIdAndUpdate(
//     request.params.id, 
//     { content, important }, 
//     { new: true, runValidators: true, context: 'query' }
//   )
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

// app.post('/api/notes', (request, response, next) => {
//   const body = request.body

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   })

//   note.save()
//     .then(savedNote => {
//       response.json(savedNote)
//     })
//     .catch(error => next(error))
// })

// const unknownEndpoint = (request, response) => {    // used for catching requests made to non-existent routes
//   response.status(404).send({ error: 'unknown endpoint' })  //returns error message in JSON format
// }

// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }

//  // has to be last loaded middleware, and all routes should be registered before this
// app.use(errorHandler)

// const PORT = process.env.PORT
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// module.exports = notesRouter