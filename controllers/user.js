const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);


  res.render('user/home.ejs', {user});
})

router.get('/:id/songs/new', async (req, res) => {
  const userId = req.params.id;

  res.render('song/new.ejs', {userId});
})

router.get('/:id/songs/:songId', async (req, res) => {
  const userId = req.params.id;
  const songId = req.params.songId;
  

  const user = await User.findById(userId);
  const song = user.playlist.id(songId);

  res.render('song/show.ejs', {song, userId});
})

router.get('/:id/songs/:songId/edit', async (req, res) => {
  const userId = req.params.id;
  const songId = req.params.songId;

  const user = await User.findById(userId);
  const song = user.playlist.id(songId);

  res.render('song/edit.ejs', {song, userId, user});
})

router.post('/:id/songs', async (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  const artist = req.body.artist;
  const album = req.body.album;
  const durration = req.body.durration;


  const user = await User.findById(userId);
  user.playlist.push({name, artist, album, durration});

  await user.save();

  res.redirect(`/users/${userId}`)
})

router.put('/:id/songs/:songId', async (req, res) => {
  const userId = req.params.id;
  const songId = req.params.songId;
  const newName = req.body.name;
  const newArtist = req.body.artist;
  const newAlbum = req.body.album;
  const newDurration = req.body.durration;


  const user = await User.findById(userId);
  const song = user.playlist.id(songId);

  song.name = newName
  song.artist = newArtist;
  song.album = newAlbum;
  song.durration = newDurration;


  await user.save();

  res.redirect(`/users/${userId}/songs/${songId}`);
})

router.delete('/:id/songs/:songId', async (req, res) => {
  const userId = req.params.id;
  const songId = req.params.songId;
  
  const user = await User.findById(userId);

  user.playlist.pull({_id: songId})

  await user.save();

  res.redirect(`/users/${userId}`);
})

module.exports = router; 