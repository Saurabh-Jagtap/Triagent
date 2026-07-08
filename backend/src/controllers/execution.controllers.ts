import type { Request, Response } from "express";
import { ExecuteActionSchema } from "../schemas/execute-action.schema.js";
import { executionService } from "../services/execution.services.js";

export const executeAction = async (req: Request, res: Response) => {
  try {

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
console.log(
  JSON.stringify(req.body, null, 2)
);
    const { action } = ExecuteActionSchema.parse(req.body);

    const response = await executionService.executeAction(
      req.user.id,
      action
    );

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