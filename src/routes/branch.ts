import { Router } from "express";
import BranchController from "../controller/branch";

const router = Router();
const branchController = new BranchController();

//Get all branches for a USER !
router.get("/", branchController.listAll);

router.get("/find-branches/:user_id", branchController.findBranches);

// Get one user
router.get("/:branch_id", branchController.getOneById);

//Create a new user
router.post("/:user_id", branchController.newBranch);

//Edit one user
router.patch("/:branch_id", branchController.editBranch);

//Delete one user
router.delete("/:branch_id", branchController.deleteBranch);

export default router;
