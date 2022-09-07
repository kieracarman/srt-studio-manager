import Asset from '../models/Asset.js'

// @desc Get all assets
// @route GET /assets
// @access Private
const getAllAssets = async (req, res) => {
  const assets = await Asset.find().lean()

  if (!assets?.length) {
    return res.status(400).json({ message: 'No assets found.' })
  }

  res.json(assets)
}

// @desc Create a new asset
// @route POST /assets
// @access Private
const createAsset = async (req, res) => {
  const asset = await Asset.create(req.body)

  if (asset) {
    res.status(201).json({ message: 'New asset created.' })
  } else {
    res.status(400).json({ message: 'Invalid asset data received.' })
  }
}

// @desc Update an asset
// @route PATCH /assets
// @access Private
const updateAsset = async (req, res) => {
  const { id } = req.body

  // Make sure update data is not empty
  if (!req.body) {
    return res.status(400).json({ message: 'Data to update can not be empty!' })
  }

  // Make sure asset exists
  const asset = await Asset.findById(id).exec()

  if (!asset) {
    return res.status(400).json({ message: 'Asset not found.' })
  }

  const updatedAsset = await Asset.findByIdAndUpdate(
    id,
    { ...req.body, _id: id },
    { new: true }
  )

  res.json({ message: `Asset with id ${updatedAsset._id} updated.` })
}

// @desc Delete an asset
// @route DELETE /assets
// @access Private
const deleteAsset = async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Asset id required.' })
  }

  const asset = await Asset.findById(id).exec()

  if (!asset) {
    return res.status(400).json({ message: 'Asset not found.' })
  }

  const result = await asset.deleteOne()

  const reply = `Asset with id ${result._id} deleted.`

  res.json(reply)
}

export { getAllAssets, createAsset, updateAsset, deleteAsset }
