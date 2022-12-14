const League = require("../../models/league.model");
const { roleTypes } = require("../../models/role.model");
const { generateResponse, generateResponseForArray } = require("../../utils/response");
const statusType = require("../../constants/statusType");
const { validateLeagueId, validateLeagueObject } = require("./validation");
const leagueService = require("./service");
const { isEmptyArray } = require('../../utils/array');

const getAllLeagues = async (req, res) => {
  const leagues = await leagueService.findAllLeagues();

  if (leagues || isEmptyArray(leagues)) {
    res.send(
      generateResponseForArray({
        type: statusType.SUCCESS,
        arrayData: leagues,
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

const getLeagueInfo = async (req, res) => {
  const leagueId = validateLeagueId(req, res);

  const league = await leagueService.findLeagueById(leagueId);

  if (!league) {
    res.send(
      generateResponse({
        type: statusType.NOT_FOUND,
        message: "Không tìm thấy caster này",
      })
    );
    return;
  }

  res.send(
    generateResponse({
      type: statusType.SUCCESS,
      data: league,
      message: "Thành công",
    })
  );
};

const createNewLeague = async (req, res) => {
  const newLeague = validateLeagueObject(req, res);

  const createdLeague = await leagueService.createLeague(newLeague);

  if (!createdLeague) {
    res.send(
      generateResponse({
        type: statusType.INTERNAL_SERVER_ERROR,
        message: "Không thể tạo caster",
      })
    );
    return;
  }

  res.send(
    generateResponse({
      type: statusType.SUCCESS,
      data: createdLeague,
      message: "Thành công",
    })
  );
};

const editLeagueInfo = async (req, res) => {
  const leagueId = validateLeagueId(req, res);
  const needUpdateLeague = validateLeagueObject(req, res);

  const updatedLeague = await leagueService.editLeague(leagueId, needUpdateLeague);

  if (!updatedLeague) {
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
      data: updatedLeague,
      message: "Thành công",
    })
  );
};

const deleteLeague = async (req, res) => {
  const leagueId = validateLeagueId(req, res);

  const deletedLeague = await leagueService.deleteLeague(leagueId);

  if (!deletedLeague) {
    res.send(
      generateResponse({
        type: statusType.INTERNAL_SERVER_ERROR,
        message: "Xoá league không thành công",
      })
    );
    return;
  }

  res.send(
    generateResponse({
      type: statusType.SUCCESS,
      data: deletedLeague,
      message: "Thành công",
    })
  );
};

module.exports = {
  getAllLeagues,
  getLeagueInfo,
  createNewLeague,
  editLeagueInfo,
  deleteLeague,
};
