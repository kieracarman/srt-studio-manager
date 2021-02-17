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
        res.status(404).json({ message: 'Booking not found' });
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
  // Make sure update data is not empty
  if (!req.body) {
    return res.status(400).json({
      message: 'Data to update can not be empty!',
    });
  }

  Bookings.findByIdAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false })
    .then((item) => {
      if (!item) {
        res.status(404).json({
          message: `Cannot update item with id=${req.params.id}: not found.`,
        });
      } else {
        res.status(200).json({
          message: 'Item updated.',
          id: item._id,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next(err);
    });
};

// Handle incoming POST requests to create items
exports.create = (req, res, next) => {
  const newItem = new Bookings({
    name: req.body.name,
  });
  newItem.save()
    .then((item) => {
      res.status(201).json({
        message: 'Booking added.',
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
        res.status(400).json({ message: 'Booking does not exist.' });
      }
      res.status(200).json({ message: 'Booking deleted.' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next(err);
    });
};
