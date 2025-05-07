import Database from "better-sqlite3"
const db = new Database("./sqlite.db")

export async function GET(request: Request) {
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')

  let score
  if (userId) {
    score = db.prepare("SELECT * FROM score WHERE userId = ?").all(userId)
  } else {
    score = db.prepare("SELECT * FROM score").all()
  }

  return new Response(JSON.stringify(score), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  db.prepare("INSERT INTO score(clicks, userId) VALUES(?, ?)").run(body.clicks, body.sessionId)
  return new Response(JSON.stringify({ message: "POST" }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function PUT(request: Request) {
  const body = await request.json()
  db.prepare("UPDATE score SET clicks = ? WHERE userId = ?").run(body.clicks, body.sessionId)
  return new Response(JSON.stringify({ message: "PUT" }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function DELETE(request: Request) {
  const body = await request.json()
  db.prepare("DELETE FROM score WHERE userId = ?").run(body.sessionId)
  return new Response(JSON.stringify({ message: "DELETE" }), {
    headers: { 'Content-Type': 'application/json' },
  })
}