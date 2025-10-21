const { RepairTask, User, RepairOrder } = require("../index")
const { repairTaskSchema } = require("../validators/order.validator")

// Get all repair tasks
exports.getAllRepairTasks = async (req, res) => {
  try {
    const { order_id, estado, assigned_to } = req.query

    const whereClause = {}
    if (order_id) whereClause.order_id = order_id
    if (estado) whereClause.estado = estado
    if (assigned_to) whereClause.assigned_to = assigned_to

    const tasks = await RepairTask.findAll({
      where: whereClause,
      include: [
        { model: RepairOrder, as: "order" },
        { model: User, as: "assigned_user" },
      ],
      order: [
        ["order_id", "ASC"],
        ["position", "ASC"],
      ],
    })

    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas", error: error.message })
  }
}

// Get repair task by ID
exports.getRepairTaskById = async (req, res) => {
  try {
    const task = await RepairTask.findByPk(req.params.id, {
      include: [
        { model: RepairOrder, as: "order" },
        { model: User, as: "assigned_user" },
      ],
    })

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tarea", error: error.message })
  }
}

// Create repair task
exports.createRepairTask = async (req, res) => {
  try {
    const validatedData = repairTaskSchema.parse(req.body)
    const task = await RepairTask.create(validatedData)
    res.status(201).json(task)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear tarea", error: error.message })
  }
}

// Update repair task
exports.updateRepairTask = async (req, res) => {
  try {
    const validatedData = repairTaskSchema.partial().parse(req.body)
    const task = await RepairTask.findByPk(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" })
    }

    await task.update(validatedData)
    res.json(task)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar tarea", error: error.message })
  }
}

// Delete repair task
exports.deleteRepairTask = async (req, res) => {
  try {
    const task = await RepairTask.findByPk(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" })
    }

    await task.destroy()
    res.json({ message: "Tarea eliminada correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea", error: error.message })
  }
}
