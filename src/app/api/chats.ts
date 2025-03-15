import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Chat {
  title: string;
  category: string;
  description: string;
}

const filePath = path.resolve(process.cwd(), 'data', 'chats.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newChat: Chat = req.body;

    // Read existing data
    const fileData = fs.readFileSync(filePath, 'utf8');
    const chats: Chat[] = JSON.parse(fileData);

    // Add new chat
    chats.push(newChat);

    // Write updated data
    fs.writeFileSync(filePath, JSON.stringify(chats, null, 2));

    res.status(201).json(newChat);
  } else if (req.method === 'GET') {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const chats: Chat[] = JSON.parse(fileData);
    res.status(200).json(chats);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
