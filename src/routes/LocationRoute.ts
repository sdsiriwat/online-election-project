import express from "express";
import * as service from "../services/LocationService";

const router = express.Router();

router.get("/locations/consituencies", async (req, res) => {
  const data = await service.listConsituencies(req.query);
  res.json(data);
});

router.get("/locations/consituencies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = await service.getConsituency(id);
  if (!data) return res.status(404).json({ message: "Consituency not found" });
  res.json(data);
});

router.get("/locations/provinces", async (_req, res) => {
  const data = await service.listProvinces();
  res.json(data);
});

export default router;
