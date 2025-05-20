import Database from 'better-sqlite3';

const db = new Database('./sqlite.db');

export async function POST(request: Request) {
  const body = await request.json();

  // Validate the body
  if (typeof body.clicks !== 'number' || !body.sessionId) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Insert into the database
  db.prepare("INSERT INTO score(clicks, userId) VALUES(?, ?)").run(body.clicks, body.sessionId);

  return new Response(JSON.stringify({ message: 'POST' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request: Request) {
  const body = await request.json();

  // Update the database
  db.prepare("UPDATE score SET clicks = ? WHERE userId = ?").run(body.clicks, body.sessionId);

  return new Response(JSON.stringify({ message: 'PUT' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();

  // Delete from the database
  db.prepare("DELETE FROM score WHERE userId = ?").run(body.sessionId);

  return new Response(JSON.stringify({ message: 'DELETE' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}