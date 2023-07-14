const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require("../models/User");

//inserir foto relacionada ao user
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  //console.log(req.file);

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  //criando a foto
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  //verificação se a foto foi criada
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um erro, tente novamente mais tarde."],
    });

    return;
  }

  res.status(201).json(newPhoto);
};

//Remove a photo from DB
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    //check if photo exists
    if (!photo) {
      res.status(404).json({
        errors: ["Foto não encontrada."],
      });

      return;
    }

    //verificar se a foto pertence ao usuário
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ["Houve um erro, tente novamente mais tarde."],
      });

      return;
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({
      errors: ["Foto não encontrada."],
    });
  }
};

//get all photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//get user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//get user photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;
  const photoId = new mongoose.Types.ObjectId(id);

  //console.log(photoId);

  //const photo = await Photo.find({ _id: id }).exec()

  const photo = await Photo.findById(photoId);

  //console.log(photo);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }

  return res.status(200).json(photo);
};

//update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photoId = new mongoose.Types.ObjectId(id);

  //console.log(reqUser)

  const photo = await Photo.findById(photoId);

  //check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }

  //check if photo belongs to user
  if (!photo.userId.equals(req.user._id)) {
    res.status(422).json({ errors: ["Ocorreu um erro, tente novamente."] });
    return;
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();

  return res
    .status(200)
    .json({ photo, message: ["Foto atualizada com sucesso."] });
};

//like
const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const photoId = new mongoose.Types.ObjectId(id);

  const photo = await Photo.findById(photoId);

  //check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }

  //check if user already liked the photo
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Você já curtiu a foto."] });
    return;
  }

  //put user id in likes array
  photo.likes.push(reqUser._id);

  await photo.save();

  return res
    .status(200)
    .json({ photoId, userId: reqUser._id, message: "A foto foi curtida" });
};

//comment
const commentPhoto = async (req, res) => {
  const { id } = req.params; //id da foto que o usuário irá comentar
  const { comment } = req.body;
  const reqUser = req.user; //usuario que irá comentar
  const photoId = new mongoose.Types.ObjectId(id);

  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(photoId);

  //check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }

  //Put comment in the array comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  //put user id in likes array
  photo.comments.push(userComment);

  await photo.save();

  return res
    .status(200)
    .json({
      comment: userComment,
      message: "Comentário adicionado com sucesso",
    });
};

//search photos by title
const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  return res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
