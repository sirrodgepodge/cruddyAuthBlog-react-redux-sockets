module.exports = io => {
  io.on('connection', socket => {
    require('./crud')(io, socket);
    require('./edit')(io, socket);
  });
};
