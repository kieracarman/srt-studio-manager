const Bookings = require('../models/Bookings');

// Handle incoming GET requests to view all possible items
exports.getAll = (req, res, next) => {
  Bookings.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next(err);
    });
};

// Handle incoming specified GET requests to view single item
exports.getOne = (req, res, next) => {
  Bookings.findById(req.params.id)
    .then((item) => {
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
      } else {
        res.status(200).json(item);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next(err);
    });
};

// Handle incoming PATCH requests to modify item
exports.updateOne = (req, res, next) => {
  // *insert update stuff here
};

// Handle incoming POST requests to create items
exports.create = (req, res, next) => {
  const newItem = new Bookings({
    name: req.body.name,
  });
  newItem.save()
    .then((item) => {
      res.status(201).json({
        message: 'Item added to assets.',
        id: item._id,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next(err);
    });
};

// Handle incoming DELETE requests to delete items
exports.delete = (req, res, next) => {
  Bookings.findByIdAndDelete(req.params.id)
    .then((item) => {
      if (!item) {
        res.status(400).json({ message: 'Item does not exist.' });
      }
      res.status(200).json({ message: 'Item deleted.' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next(err);
    });
};
