import express from "express";

import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: (req as any).user,
  });
});

export default router;
