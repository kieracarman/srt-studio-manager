import mongoose from 'mongoose';

import Assets from '../models/Assets.js';

// Handle incoming GET requests to view all possible items
export const getAllAssets = async (req, res) => {
  try {
    const assets = await Assets.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// Handle incoming POST requests to create items
export const createAsset = async (req, res) => {
  const newAsset = new Assets(req.body);

  try {
    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(409).json({ error: error });
  }
};

// Handle incoming specified GET requests to view single item
export const getOneAsset = async (req, res) => {
  const { id } = req.params;

  try {
    const asset = await Assets.findById(id);
    res.status(200).json(asset);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// Handle incoming PUT requests to modify item
export const updateAsset = async (req, res) => {
  const { id } = req.params;

  // Make sure update data is not empty
  if (!req.body) return res.status(400).json({ message: 'Data to update can not be empty!' });

  // Make sure asset exists
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No asset with id: ${id}`);

  const updatedAsset = { ...req.body, _id: id };

  await Assets.findByIdAndUpdate(id, updatedAsset, { new: true });

  res.json(updatedAsset);
};

// Handle incoming DELETE requests to delete items
export const deleteAsset = async (req, res) => {
  const { id } = req.params;

  // Make sure asset exists
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No asset with id: ${id}`);

  await Assets.findByIdAndRemove(id);

  res.json({ message: 'Asset deleted.' });
};
