import Database from "better-sqlite3";
import { NextRequest } from "next/server";

const db = new Database("./games.db")

export async function GET(req:NextRequest){
    const { searchParams } = req.nextUrl
    let query = "SELECT * FROM games"
    const params: string[] = []

    if (searchParams.has("publisher")) {
        query += params.length ? " AND" : " WHERE"
        query += " publisher = ?"
        params.push(searchParams.get("publisher")!)
    }
    if (searchParams.has("genre")) {
        query += params.length ? " AND" : " WHERE"
        query += " genre = ?"
        params.push(searchParams.get("genre")!)
    }
    // Optional: sorting
    if (searchParams.has("sortBy")) {
        const sortBy = searchParams.get("sortBy")
        query += ` ORDER BY ${sortBy}`
    }

    const games = db.prepare(query).all(...params)
    return Response.json(games)
}