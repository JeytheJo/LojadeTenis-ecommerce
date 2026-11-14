import { redirect } from "next/navigation";

// /produto abre o primeiro modelo; cada tênis tem a sua página em /produto/<slug>
export default function Produto() {
  redirect("/produto/chuck-taylor");
}
