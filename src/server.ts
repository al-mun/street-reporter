import express, { Request, Response } from "express";
const app = express();
import path from "path";
const PORT = 3000;
import fs from "fs";

interface Issue {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  photo?: string;
  createdAt: string;
}

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/issues", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "issues.json"));
});

app.post("/api/issues", (req: Request, res: Response) => {
  const issuesPath = path.join(__dirname, "..", "issues.json");
  const dataFile = fs.readFileSync(issuesPath, "utf8");
  const issues = JSON.parse(dataFile);
  const lastIssue = issues[issues.length - 1];
  const newId = lastIssue ? lastIssue.id + 1 : 1;
  const newIssue: Issue = {
    id: newId,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    status: "Submitted",
    createdAt: new Date().toISOString(),
    photo: req.body.photo,
  };
  issues.push(newIssue);
  try {
    fs.writeFileSync(issuesPath, JSON.stringify(issues, null, 2));
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

app.get('/api/issues/:id', (req:Request,res:Response)=>{
  
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
