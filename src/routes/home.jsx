import { createFileRoute } from "@tanstack/react-router";
import { ContractExplorer } from "../pages/contractExplorer/ContractExplorer";

export const Route = createFileRoute("/home")({
  component: ContractExplorer,
});
