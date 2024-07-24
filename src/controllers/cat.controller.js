import { db } from "../db/db.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  insert,
  update,
  remove,
  selectByAgeRange,
  selectById,
  count,
  limitOffset,
} from "../db/queries.js";

export const getCats = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  try {
    db.all(count, [], (err, result) => {
      if (err) {
        throw new ApiError(500, "Unable to fetch data!");
      }
      const total = result[0].count;

      db.all(limitOffset, [Number(limit), Number(skip)], (err, result) => {
        if (err) {
          throw new ApiError(500, "Unable to fetch data!");
        }
        res.status(200).json({
          total,
          page: Number(page),
          limit: Number(limit),
          data: result,
        });
      });
    });
  } catch (error) {
    return res.send(error);
  }
};

export const getCatsByAgeRange = async (req, res) => {
  let { age_Ite, age_gte } = req.query;
  age_Ite = Number(age_Ite);
  age_gte = Number(age_gte);

  if (!age_Ite || !age_gte || age_gte <= age_Ite)
    res.status(402).json({ message: "Not a Valid Range!" });
  try {
    db.all(
      selectByAgeRange,
      [age_Ite, age_gte],
      (error, result) => {
        if (error) throw new ApiError(504, "Someting went wrong..", error);

        return res.status(200).json(result);
      }
    );
  } catch (error) {
    return res.send(error);
  }
};

export const createCat = async (req, res) => {
  const { name, age, breed } = req.body;

  if (!name || !age || !breed)
    return res.status(401).json({
      message: "All Fields is required!",
    });
  try {
    db.run(insert, [name, age, breed], function (error) {
      if (error) throw new ApiError(501, "Unable to Create Cat", error);

      return res.status(200).json({
        message: `Create Sucessfully with id ${this.lastID}`,
      });
    });
  } catch (error) {
    return res.send(error);
  }
};

export const getCatById = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(402, "User id is required");

  try {
    db.all(selectById, [id], (error, result) => {
      if (error) throw new ApiError(502, "Unable to fetch Cat", error);

      return res
        .status(200)
        .json(new ApiResponse(200, result, "Fetch Successfully"));
    });
  } catch (error) {
    return res.send(error);
  }
};

export const updatedCatById = async (req, res) => {
  const { id } = req.params;
  const { name, age, breed } = req.body;
  if (!id) throw new ApiError(402, "User id is required");
  if (!name || !age || !breed)
    throw new ApiError(402, "All Fields is required");
  try {
    db.all(update, [name, age, breed, id], (error, result) => {
      if (error) throw new ApiError(504, "Unable to Update Cat", error);

      return res
        .status(200)
        .json(new ApiResponse(200, result, "Update Successfully"));
    });
  } catch (error) {
    return res.send(error);
  }
};

export const deleteCatById = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(402, "User id is required");
  try {
    db.run(remove, [id], (error) => {
      if (error) throw new ApiError(504, "Unable to Delete Cat", error);
      return res.status(200).json({ message: "Deleted Successfully" });
    });
  } catch (error) {
    return res.send(error);
  }
};