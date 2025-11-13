import { RepairOrder, RepairTask, User } from "../src/models/index.js"

// Get all repair tasks
export const getAllRepairTasks = async (req, res) => {
  try {
    const { order_id, estado, assigned_to } = req.query

    const whereClause = {}
    if (order_id) whereClause.order_id = order_id
    if (estado) whereClause.estado = estado
    if (assigned_to) whereClause.assigned_to = assigned_to

    if (req.user.role_id === 2 || req.user.rol === "tecnico") {
      whereClause.assigned_to = req.user.id
    }

    const tasks = await RepairTask.findAll({
      where: whereClause,
      include: [{ model: RepairOrder }, { model: User, as: "asignado" }],
      order: [
        ["order_id", "ASC"],
        ["position", "ASC"],
      ],
    })

    res.json(tasks)
  } catch (error) {
    console.error("[v0] Error in getAllRepairTasks:", error)
    res.status(500).json({ message: "Error al obtener tareas", error: error.message })
  }
}

// Get repair task by ID
export const getRepairTaskById = async (req, res) => {
  try {
    const task = await RepairTask.findByPk(req.params.id, {
      include: [{ model: RepairOrder }, { model: User, as: "asignado" }],
    })

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" })
    }

    if ((req.user.role_id === 2 || req.user.rol === "tecnico") && task.assigned_to !== req.user.id) {
      return res.status(403).json({ message: "Acceso denegado a esta tarea" })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tarea", error: error.message })
  }
}

// Create repair task
export const createRepairTask = async (req, res) => {
  try {
    const task = await RepairTask.create(req.body)
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea", error: error.message })
  }
}

// Update repair task
export const updateRepairTask = async (req, res) => {
  try {
    const task = await RepairTask.findByPk(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" })
    }

    if ((req.user.role_id === 2 || req.user.rol === "tecnico") && task.assigned_to !== req.user.id) {
      return res.status(403).json({ message: "Acceso denegado para actualizar esta tarea" })
    }

    await task.update(req.body)
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tarea", error: error.message })
  }
}

// Delete repair task
export const deleteRepairTask = async (req, res) => {
  try {
    const task = await RepairTask.findByPk(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" })
    }

    if (req.user.role_id !== 1 && req.user.rol !== "admin") {
      return res.status(403).json({ message: "Acceso denegado. Solo administradores pueden eliminar tareas" })
    }

    await task.destroy()
    res.json({ message: "Tarea eliminada correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea", error: error.message })
  }
}
