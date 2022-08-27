import mongoose from 'mongoose'

import Assets from '../models/Assets.js'

// @desc Get all assets
// @route GET /assets
// @access Private
export const getAllAssets = async (req, res) => {
  try {
    const assets = await Assets.find()
    res.status(200).json(assets)
  } catch (error) {
    res.status(404).json({ error: error })
  }
}

// @desc Create a new asset
// @route POST /assets
// @access Private
export const createAsset = async (req, res) => {
  const newAsset = new Assets(req.body)

  try {
    await newAsset.save()
    res.status(201).json(newAsset)
  } catch (error) {
    res.status(409).json({ error: error })
  }
}

// @desc Get one asset
// @route GET /assets/:id
// @access Private
export const getOneAsset = async (req, res) => {
  const { id } = req.params

  try {
    const asset = await Assets.findById(id)
    res.status(200).json(asset)
  } catch (error) {
    res.status(404).json({ error: error })
  }
}

// @desc Update an asset
// @route PUT /assets/:id
// @access Private
export const updateAsset = async (req, res) => {
  const { id } = req.params

  // Make sure update data is not empty
  if (!req.body)
    return res.status(400).json({ message: 'Data to update can not be empty!' })

  // Make sure asset exists
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No asset with id: ${id}`)

  const updatedAsset = { ...req.body, _id: id }

  await Assets.findByIdAndUpdate(id, updatedAsset, { new: true })

  res.json(updatedAsset)
}

// @desc Delete an asset
// @route DELETE /assets/:id
// @access Private
export const deleteAsset = async (req, res) => {
  const { id } = req.params

  // Make sure asset exists
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No asset with id: ${id}`)

  await Assets.findByIdAndRemove(id)

  res.json({ message: 'Asset deleted.' })
}
