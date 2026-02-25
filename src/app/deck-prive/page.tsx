import { notFound } from "next/navigation";
import { Metadata } from "next";
import DeckClient from "./DeckClient";

export const metadata: Metadata = {
    title: "Présentation Confidentielle — Novelpix",
    robots: "noindex, nofollow",
};

interface Props {
    searchParams: Promise<{ t?: string }>;
}

export default async function DeckPrive({ searchParams }: Props) {
    const params = await searchParams;
    const token = params.t ?? "";

    const validToken = process.env.DECK_TOKEN;

    // Si pas de token configuré côté serveur, ou token invalide → 404
    if (!validToken || token !== validToken) {
        notFound();
    }

    return <DeckClient />;
}
