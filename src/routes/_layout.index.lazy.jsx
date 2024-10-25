import { createLazyFileRoute } from "@tanstack/react-router";
import { ContractExplorer } from "../pages/contractExplorer/ContractExplorer";

export const Route = createLazyFileRoute("/_layout/")({
  component: ContractExplorer,
});
