module.exports = (data, res) => {
  if (!data) {
    res.status(404).send({ message: 'Object not found' });
    return;
  }

  res.send(data);
};
