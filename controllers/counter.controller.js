import {
  getCounter,
  increment,
  decrement,
  reset,
} from "../services/counter.service.js";

export const getCounterController = async (req, res, next) => {
  try {
    const count = await getCounter();
    res.json({ success: true, count , message: "Counter fetched successfully" });
  } catch (err) {
    next(err);
  }
};

export const incrementController = async (req, res, next) => {
  try {
    const count = await increment();
    res.json({ success: true, count , message: "Counter incremented successfully" });
  } catch (err) {
    next(err);
  }
};

export const decrementController = async (req, res, next) => {
  try {
    const count = await decrement();
    res.json({ success: true, count , message: "Counter decremented successfully" });
  } catch (err) {
    next(err);
  }
};

export const resetController = async (req, res, next) => {
  try {
    const count = await reset();
    res.json({ success: true, count , message: "Counter reset successfully" });
  } catch (err) {
    next(err);
  }
};
