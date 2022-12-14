const Club = require("../../models/club.model");
const { roleTypes } = require("../../models/role.model");
const {
  generateResponse,
  generateResponseForArray,
} = require("../../utils/response");
const statusType = require("../../constants/statusType");
const { validateClubId, validateClubObject } = require("./validation");
const clubService = require("./service");
const { isEmptyArray } = require('../../utils/array');

const getAllClubs = async (req, res) => {
  const clubs = await clubService.findAllClubs();

  if (clubs || isEmptyArray(clubs)) {
    res.send(
      generateResponseForArray({
        type: statusType.SUCCESS,
        arrayData: clubs,
        message: "Thành công",
      })
    );
    return;
  }

  res.send(
    generateResponse({
      type: statusType.INTERNAL_SERVER_ERROR,
      message: "Failed",
    })
  );
};

const getClubInfo = async (req, res) => {
  const clubId = validateClubId(req, res);

  const club = await clubService.findClubById(clubId);

  if (!club) {
    res.send(
      generateResponse({
        type: statusType.NOT_FOUND,
        message: "Không tìm thấy club này",
      })
    );
    return;
  }

  res.send(
    generateResponse({
      type: statusType.SUCCESS,
      data: club,
      message: "Thành công",
    })
  );
};

const createNewClub = async (req, res) => {
  const newClub = validateClubObject(req, res);

  const createdClub = await clubService.createClub(newClub);

  if (!createdClub) {
    res.send(
      generateResponse({
        type: statusType.INTERNAL_SERVER_ERROR,
        message: "Không thể tạo club",
      })
    );
    return;
  }

  res.send(
    generateResponse({
      type: statusType.SUCCESS,
      data: createdClub,
      message: "Thành công",
    })
  );
};

const editClubInfo = async (req, res) => {
  const clubId = validateClubId(req, res);
  const needUpdateClub = validateClubObject(req, res);

  const updatedClub = await clubService.editClub(
    clubId,
    needUpdateClub
  );


  if (!updatedClub) {
    res.send(
      generateResponse({
        type: statusType.INTERNAL_SERVER_ERROR,
        message: "Cập nhật thông tin không thành công",
      })
    );
    return;
  }

  res.send(
    generateResponse({
      type: statusType.SUCCESS,
      data: updatedClub,
      message: "Thành công",
    })
  );
};

const deleteClub = async (req, res) => {
  const clubId = validateClubId(req, res);

  const deletedClub = await clubService.deleteClub(clubId);

  if (!deletedClub) {
    res.send(
      generateResponse({
        type: statusType.INTERNAL_SERVER_ERROR,
        message: "Xoá club không thành công",
      })
    );
    return;
  }

  res.send(
    generateResponse({
      type: statusType.SUCCESS,
      data: deletedClub,
      message: "Thành công",
    })
  );
};

module.exports = {
  getAllClubs,
  getClubInfo,
  createNewClub,
  editClubInfo,
  deleteClub,
};
