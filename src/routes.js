import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/todos'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: 'Title is required',
          })
        )
      }
      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: 'Description is required',
          })
        )
      }

      const todo = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        update_at: new Date(),
      }

      database.insert('todos', todo)

      console.log(todo)

      return res.writeHead(201).end(JSON.stringify(todo))
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/todos/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const [existingTodo] = database.select('todos', { id })

      if (!existingTodo) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: 'Todo not found',
          })
        )
      }

      database.update('todos', id, {
        title,
        description,
        update_at: new Date(),
      })

      return res.writeHead(204).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/todos/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('todos', id)

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/todos/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const [existingTodo] = database.select('todos', { id })

      if (!existingTodo) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: 'Todo not found',
          })
        )
      }

      const is_completed = !!existingTodo.completed_at
      const completed_at = is_completed ? null : new Date()

      database.update('todos', id, { completed_at, update_at: new Date() })

      return res.writeHead(204).end()
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/todos'),
    handler: (req, res) => {
      const { search } = req.query

      const todos = database.select(
        'todos',
        search
          ? {
              title: search,
              description: search,
            }
          : null
      )

      return res.writeHead(200).end(JSON.stringify(todos))
    },
  },
]
