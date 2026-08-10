import type { Request, Response } from "express";
import { ExecuteActionSchema } from "../schemas/executeAction.schema.js";
import { executionService } from "../services/execution.services.js";
import { responseBuilder } from "../services/responseBuilder.services.js";

export const executeAction = async (req: Request, res: Response) => {
  try {

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { plan } = ExecuteActionSchema.parse(req.body);

    const output = await executionService.executePlan(req.user.id, plan);

    const response = responseBuilder.build(output);

    return res.json({
      success: true,
      ...response,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Execution failed",
    });

  }
};