import Database from "better-sqlite3";
const db =  new Database("./sqlite.db")

export async function GET () {
  const score = db.prepare("SELECT * FROM score").all()
  console.log(score)


  return Response.json(score);
}
export async function POST (request: Request) {
  const body = await request.json()
  const score = db.prepare("INSERT INTO score(clicks, userId) values(?, ?)").bind(body.clicks, body.sessionId).run()
  console.log("POST")
  console.log(body)

  return Response.json({message: "POST"});
}