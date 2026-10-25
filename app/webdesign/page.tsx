import WebdesignContent from "./WebdesignContent";
import { getReferencePreviews } from "@/lib/references";

export default function WebdesignPage() {
  return <WebdesignContent projects={getReferencePreviews()} />;
}
